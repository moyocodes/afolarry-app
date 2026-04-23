import Process from '../components/Process'
import WhyUs from '../components/WhyUs'
import PageHeader from '../components/PageHeader'

export default function HowItWorks() {
  return (
    <div style={{ fontFamily: "'Sora',sans-serif" }}>
      <PageHeader
        eyebrow="How It Works"
        title="Five steps from enquiry to your door."
        description="A simple, transparent process with one dedicated contact from start to finish."
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80&auto=format&fit=crop"
      />
      <Process />
      <WhyUs />
    </div>
  )
}
