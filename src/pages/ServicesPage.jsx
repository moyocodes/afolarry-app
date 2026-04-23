import Services from '../components/Services'
import PageHeader from '../components/PageHeader'

export default function ServicesPage() {
  return (
    <div style={{ fontFamily: "'Sora',sans-serif" }}>
      <PageHeader
        eyebrow="What We Offer"
        title="Complete sea freight services."
        description="From FCL ocean freight to Nigerian customs clearance, import documentation, warehousing, and live tracking, every service sits under one roof."
        image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80&auto=format&fit=crop"
      />
      <Services />
    </div>
  )
}
