import { useEffect, useRef } from "react";
import { signOut } from "firebase/auth";

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
const STORAGE_KEY = "afl_lastActivity";

// Call on every sign-in/sign-out so a stale timestamp from a previous
// session can't immediately trip the idle check on the next login.
export function clearIdleActivity() {
  localStorage.removeItem(STORAGE_KEY);
}

// Signs the user out after `timeoutMs` of no mouse/keyboard/scroll activity.
// Last-activity timestamp is stored in localStorage so idle time keeps counting
// across tabs and across a closed/reopened browser.
export function useIdleLogout(auth, timeoutMs) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!auth?.currentUser) return;

    const resetTimer = () => {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        signOut(auth).catch(() => {});
      }, timeoutMs);
    };

    const lastActivity = Number(localStorage.getItem(STORAGE_KEY));
    if (lastActivity && Date.now() - lastActivity >= timeoutMs) {
      signOut(auth).catch(() => {});
      return;
    }

    resetTimer();
    ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [auth, timeoutMs, auth?.currentUser]);
}
