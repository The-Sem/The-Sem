import Hero from '../components/Hero'
import OurStory from '../components/OurStory'
import CitrusDivider from '../components/CitrusDivider'
import QuickActions from '../components/QuickActions'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <CitrusDivider />
      <OurStory />
      <QuickActions />
      <CitrusDivider flip />
      <ContactSection />
    </>
  )
}
