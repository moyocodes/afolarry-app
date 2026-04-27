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

export default function Terms() {
  return (
    <div style={S}>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Please read these terms carefully before using our services."
        image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80&auto=format&fit=crop"
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

        <Section title="1. Acceptance of Terms">
          By engaging Afolaray Nigeria Limited for any freight, logistics, or vehicle
          procurement service, you agree to be bound by these Terms and Conditions. If you
          do not agree, please do not use our services.
        </Section>

        <Section title="2. Services">
          Afolaray Nigeria Limited provides sea freight forwarding, vehicle importation,
          customs clearance, and related logistics services. All services are subject to
          availability and applicable regulations in Nigeria and the country of origin.
        </Section>

        <Section title="3. Quotations & Pricing">
          All quotations provided are estimates based on the information supplied at the
          time of enquiry. Final pricing may vary due to exchange rate fluctuations,
          port charges, government levies, or changes in cargo details. We will notify
          you of any material changes before proceeding.
        </Section>

        <Section title="4. Payment">
          Payment terms are agreed upon per shipment or order. Full or partial advance
          payment may be required before services commence. We accept bank transfers and
          other agreed payment methods. All fees are non-refundable unless stated otherwise
          in a specific agreement.
        </Section>

        <Section title="5. Client Responsibilities">
          You are responsible for providing accurate cargo details, valid documentation,
          and timely responses to our communications. Afolaray Nigeria Limited shall not
          be liable for delays or losses arising from incorrect or incomplete information
          provided by the client.
        </Section>

        <Section title="6. Liability">
          Our liability is limited to the value of the freight charges paid for the
          affected shipment. We are not liable for indirect, consequential, or incidental
          damages, including loss of profit or business opportunity. Cargo insurance is
          strongly recommended and can be arranged on request.
        </Section>

        <Section title="7. Force Majeure">
          Afolaray Nigeria Limited shall not be held responsible for delays or failures
          caused by events beyond our reasonable control, including port strikes, natural
          disasters, government actions, or carrier delays.
        </Section>

        <Section title="8. Governing Law">
          These terms are governed by the laws of the Federal Republic of Nigeria. Any
          disputes shall be subject to the exclusive jurisdiction of Nigerian courts.
        </Section>

        <Section title="9. Amendments">
          We reserve the right to update these Terms at any time. Continued use of our
          services after changes are posted constitutes acceptance of the revised Terms.
        </Section>

        <Section title="10. Contact">
          For questions about these Terms, contact us at:{" "}
          <a
            href="mailto:Yusuffafolabi@gmail.com"
            style={{ color: "#1565c0", textDecoration: "none", fontWeight: 600 }}
          >
            Yusuffafolabi@gmail.com
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
