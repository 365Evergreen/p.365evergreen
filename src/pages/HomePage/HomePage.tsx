import { useState } from 'react'
//import contentClient from '../../services/content/contentClient'
//import Contact from '../../components/Contact'
import Drawer from '../../components/Drawer/Drawer'
//import EvergreenMoment from '../../components/EvergreenMoment'
import Hero from '../../components/Hero/Hero'
import { ServiceGrid } from '../../components/ServiceCard/ServiceGrid'
import { HowWeDoIt } from '../../components/HowWeDoIt/HowWeDoIt'
import LatestPosts from './LatestUpdates/LatestUpdates'
import HomepageCta from '../../components/HomePageCta'
//import HomePageCta1 from '../../components/HomePageCta1'
//import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
//import LatestPosts from '../../components/LatestPosts'
//import Outcome from '../../components/Outcome'
//import GetInTouch from '../../components/GetInTouch/GetInTouch'
//import { AdaptiveCardForm } from '../../components/GetInTouch/AdaptiveCardForm';
import { GetInTouch } from '../../components/GetInTouch';
import HeroSlideshow from '../../components/HeroSlideShow/HeroSlideShow';


export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  

  return (
    <><div className="home-page-hero">
      <Hero
        title="Helping Australian teams achieve more with Microsoft 365 and the Power Platform"
        subtitle="We partner with organisations to optimise, automate, govern, and adopt Microsoft 365"
        ctaLabel="Start your journey"
        onCtaClick={openDrawer}
        imageSrc="https://cdn.365evergreen.com/content/pages/00001/hero.svg"
        imageAlt="Green plant stems in a glass vase on a white surface" />
        <HeroSlideshow />
        </div>
      <div className="page-shell">

        <div className="homeMainContent">
          <div className="homeMainContent__inner">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 bg-black-100">
              <ServiceGrid />
              <HowWeDoIt />
                    
              <HomepageCta
                heading="Start your Microsoft 365 journey with Evergreen"
                supportingText="We partner with organisations to optimise, automate, govern, and adopt Microsoft 365 — with measurable outcomes in weeks, not years."
                buttonLabel="Start your journey"
                onButtonClick={openDrawer}
  
              />
</div>


            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* Six most recent published posts */}
              <LatestPosts />
            </div>

       
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <GetInTouch
                {...{
                  leftColumn: (
                    <div>
                    </div>
                  ),
                  rightColumn: (
                    <div>
                    </div>
                  ),
                }} />
            </div>
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
