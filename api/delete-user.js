import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialise Admin SDK once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId:     "afolaray-53fc5",
      clientEmail:   process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:    process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const adminAuth = getAuth();
const adminDb   = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { uid } = req.body;
  if (!uid)
    return res.status(400).json({ error: "uid is required" });

  const errors = [];

  // 1 — Revoke all active sessions immediately
  try {
    await adminAuth.revokeRefreshTokens(uid);
  } catch (err) {
    errors.push({ step: "revoke", message: err.message });
  }

  // 2 — Delete Firebase Auth account
  try {
    await adminAuth.deleteUser(uid);
  } catch (err) {
    errors.push({ step: "auth", message: err.message });
  }

  // 3 — Delete Firestore profile doc
  try {
    await adminDb.collection("adminUsers").doc(uid).delete();
  } catch (err) {
    errors.push({ step: "adminUsers", message: err.message });
  }

  const authDeleted = !errors.some((e) => e.step === "auth");
  return res.status(200).json({ success: true, authDeleted, errors });
}