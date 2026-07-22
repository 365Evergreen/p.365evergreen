import { useState } from 'react'
//import Contact from '../../components/Contact'
import Drawer from '../../components/Drawer/Drawer'
//import EvergreenMoment from '../../components/EvergreenMoment'
import Hero from '../../components/Hero/Hero'
import { ServiceGrid } from '../../components/ServiceCard/ServiceGrid'
//import HomepageCta from '../../components/HomepageCta'
//import LatestPosts from '../../components/LatestPosts'
//import Outcome from '../../components/Outcome'
import GetInTouch from '../../components/GetInTouch/GetInTouch'

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <><div className="home-page-hero">
      <Hero
        title="We are Microsoft specialists"
        subtitle="Track change, reduce surprises, and communicate with confidence through a practical, searchable knowledge hub."
        ctaLabel="See how it works"
        onCtaClick={openDrawer}
        imageSrc="https://cdn.365evergreen.com/media/plant-cover-1440-900.webp"
        imageAlt="Green plant stems in a glass vase on a white surface" /></div>
      <div className="page-shell">

        <div className="homeMainContent">
          <div className="homeMainContent__inner">
            <ServiceGrid />
            <GetInTouch
            blobStorageUrl="https://cdn.365evergreen.com/content/forms/00001.json" />
          </div>
        </div>
        




      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Start a conversation"
        description="Tell us a bit about your organisation so we can suggest the next best step."
      />
    </>

  )
}
