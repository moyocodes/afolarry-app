import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function NotFound() {
  return (
    <div style={{ fontFamily: "'Sora',sans-serif" }}>
      <PageHeader
        eyebrow="404"
        title="Page not found"
        description="The page you are looking for doesn't exist or has been moved. Use the links below to continue browsing."
        image="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80&auto=format&fit=crop"
        maxWidth="900px"
      />
      <section style={{ padding: "3rem", textAlign: "center" }}>
        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.75)",
            maxWidth: "720px",
            margin: "0 auto 2rem",
          }}
        >
          If you typed the address manually, double-check the spelling.
          Otherwise, use one of the links below to return to the site.
        </p>
        <div
          style={{
            display: "inline-flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              background: "#1e88e5",
              color: "#fff",
              padding: "14px 22px",
              borderRadius: "10px",
              fontWeight: 700,
            }}
          >
            Back to home
          </Link>
          <Link
            to="/contact"
            style={{
              textDecoration: "none",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              padding: "14px 22px",
              borderRadius: "10px",
              fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            Contact support
          </Link>
        </div>
      </section>
    </div>
  );
}
