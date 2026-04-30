import PageHeader from "../components/PageHeader";

const S = { fontFamily: "'Sora',sans-serif" };

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "2rem" }}>
    <h2
      style={{
        fontSize: "15px",
        fontWeight: 700,
        color: "#0d1b2e",
        marginBottom: "0.6rem",
      }}
    >
      {title}
    </h2>
    <div style={{ fontSize: "13px", color: "#5a7599", lineHeight: 1.85, fontWeight: 300 }}>
      {children}
    </div>
  </div>
);

export default function Privacy() {
  return (
    <div style={S}>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80&auto=format&fit=crop"
      />

      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "3.5rem clamp(1.2rem, 4vw, 2.5rem)",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#9ab2cc",
            marginBottom: "2.5rem",
            fontWeight: 300,
          }}
        >
          Last updated: April 2025
        </p>

        <Section title="1. Information We Collect">
          When you use our website or contact us, we may collect the following information:
          <ul style={{ margin: "0.75rem 0 0 1.2rem", listStyle: "disc" }}>
            <li style={{ marginBottom: "0.4rem" }}>
              <strong style={{ color: "#0d1b2e", fontWeight: 600 }}>Contact details</strong> — name, email address, phone number, and city.
            </li>
            <li style={{ marginBottom: "0.4rem" }}>
              <strong style={{ color: "#0d1b2e", fontWeight: 600 }}>Order information</strong> — details of vehicles or freight you enquire about.
            </li>
            <li>
              <strong style={{ color: "#0d1b2e", fontWeight: 600 }}>Usage data</strong> — pages visited, browser type, and device information collected automatically.
            </li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          We use your information to:
          <ul style={{ margin: "0.75rem 0 0 1.2rem", listStyle: "disc" }}>
            <li style={{ marginBottom: "0.4rem" }}>Process and respond to your enquiries and orders.</li>
            <li style={{ marginBottom: "0.4rem" }}>Send confirmation emails and service updates.</li>
            <li style={{ marginBottom: "0.4rem" }}>Improve our website and services.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </ul>
          We do not use your data for automated decision-making or profiling.
        </Section>

        <Section title="3. Data Sharing">
          We do not sell or rent your personal information to third parties. We may share
          your data with:
          <ul style={{ margin: "0.75rem 0 0 1.2rem", listStyle: "disc" }}>
            <li style={{ marginBottom: "0.4rem" }}>
              Service providers such as email delivery platforms (Resend) used solely to
              deliver your messages.
            </li>
            <li>
              Government or regulatory authorities where required by law.
            </li>
          </ul>
        </Section>

        <Section title="4. Data Retention">
          We retain your personal information only as long as necessary to fulfil the
          purpose for which it was collected, or as required by law. Order and enquiry
          records are kept for up to 3 years for business and legal compliance purposes.
        </Section>

        <Section title="5. Security">
          We take reasonable steps to protect your personal information from unauthorised
          access, disclosure, or loss. Our systems use industry-standard security
          measures. However, no method of internet transmission is 100% secure.
        </Section>

        <Section title="6. Cookies">
          Our website may use essential cookies to ensure basic functionality. We do not
          use tracking or advertising cookies. You can disable cookies in your browser
          settings at any time.
        </Section>

        <Section title="7. Your Rights">
          You have the right to:
          <ul style={{ margin: "0.75rem 0 0 1.2rem", listStyle: "disc" }}>
            <li style={{ marginBottom: "0.4rem" }}>Request access to the personal data we hold about you.</li>
            <li style={{ marginBottom: "0.4rem" }}>Request correction or deletion of your data.</li>
            <li>Opt out of any marketing communications.</li>
          </ul>
          To exercise any of these rights, contact us at the details below.
        </Section>

        <Section title="8. Third-Party Links">
          Our website may contain links to external sites. We are not responsible for the
          privacy practices of those sites and encourage you to review their policies.
        </Section>

        <Section title="9. Changes to This Policy">
          We may update this Privacy Policy from time to time. The date at the top of this
          page reflects the most recent revision. Continued use of our services after
          changes are posted constitutes acceptance of the updated policy.
        </Section>

        <Section title="10. Contact">
          For any privacy-related questions or requests, contact us at:{" "}
          <a
            href="mailto:contact@afolaray.com"
            style={{ color: "#1565c0", textDecoration: "none", fontWeight: 600 }}
          >
          contact@afolaray.com
          </a>{" "}
          or call{" "}
          <a
            href="tel:+2347033576017"
            style={{ color: "#1565c0", textDecoration: "none", fontWeight: 600 }}
          >
            +234 703 357 6017
          </a>
          .
        </Section>
      </div>
    </div>
  );
}
