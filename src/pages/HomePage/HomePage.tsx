import { useState } from 'react'
import styles from './HomePage.module.css'
import Drawer from '../../components/Drawer/Drawer'
import { ServiceGrid } from '../../components/ServiceCard/ServiceGrid'
import { HowWeDoIt } from '../../components/HowWeDoIt/HowWeDoIt'
import LatestPosts from './LatestUpdates/LatestUpdates'
import HomepageCta from '../../components/HomePageCta'
import { GetInTouch } from '../../components/GetInTouch';
import HeroSlideshow from '../../components/HeroSlideShow/HeroSlideShow';

import LandingLayout from '../../layouts/LandingLayout'

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <LandingLayout>
      <div className={styles.heroSlideshowContainer}>
        <HeroSlideshow />
      </div>
      <div className="page-shell">

        <div className="homeMainContent">
          <div className="homeMainContent__inner">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 bg-black-100">
              <ServiceGrid />
              <div className="max-w-7xl mx-auto px-6 lg:px-8 bg-black-100">
                <HowWeDoIt />
              </div>

            </div>


            <div className="max-w-7xl mx-auto px-6 lg:px-8 bg-black-100">
              {/* Six most recent published posts */}
              <LatestPosts />
            </div>


            <div className="max-w-7xl mx-auto px-6 lg:px-8 bg-black-100">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 bg-black-100">
          <HomepageCta
            heading="Start your Microsoft 365 journey with Evergreen"
            supportingText="We partner with organisations to optimise, automate, govern, and adopt Microsoft 365 — with measurable outcomes in weeks, not years."
            buttonLabel="Start your journey"
            onButtonClick={openDrawer}

          />

        </div>

      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Start a conversation"
        description="Tell us a bit about your organisation so we can suggest the next best step."
      />
    </LandingLayout>
  )
}
