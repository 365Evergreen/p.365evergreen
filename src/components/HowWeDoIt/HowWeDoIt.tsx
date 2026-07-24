import React from 'react';
import TabsList, {type TabConfig } from '../TabsList/TabsList';
import { ServiceCard } from '../ServiceCard/ServiceCard';
import type {ServiceCardProps} from '../ServiceCard/ServiceCard.types';
import styles from './HowWeDoIt.module.css';

const services: ServiceCardProps[] = [
    {
        title: 'Modernise your workplace',
        description: 'Empower your team with modern workplace solutions that enhance productivity and collaboration.',
        iconName: 'Layout',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/modern-workplace.webp',
        thumbnailAlt: 'Modern office environment with digital screens',
        ctaUrl: '/services/modern-workplace',
        ctaText: 'Explore Modern Workplace',
    },
    {
        title: 'Improve your processes',
        description: 'Our Process Automation solution streamlines operations by centralising information and reduces manual data input.',
        iconName: 'BarChart2',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/power-automate.webp',
        thumbnailAlt: 'Data visualization dashboard with charts and graphs on a computer screen',
        ctaUrl: '/services/data-analytics',
        ctaText: 'Discover Data Solutions',
    },
    {
        title: 'Security & Compliance',
        description: 'Protect your business with our comprehensive security and compliance services, ensuring your data is safe.',
        iconName: 'Shield',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/security.webp',
        thumbnailAlt: 'Digital security concept with a shield icon',
        ctaUrl: '/services/security-compliance',
        ctaText: 'Learn About Security',
    },
    {
        title: 'Collaboration & Productivity',
        description: 'Enhance team collaboration and productivity with our tailored Microsoft 365 solutions.',
        iconName: 'Users',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/collaboration-productivity.webp',
        thumbnailAlt: 'Team collaborating in a modern office space',
        ctaUrl: '/services/collaboration-productivity',
        ctaText: 'Boost Collaboration',
    },
    {
        title: 'Training & Support',
        description: 'Empower your team with our expert training and support services for Microsoft 365.',
        iconName: 'BookOpen',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/training-support.webp',
        thumbnailAlt: 'Professional training session',
        ctaUrl: '/services/training-support',
        ctaText: 'Get Training Support',
    }
];

const tabs: TabConfig[] = services.map((service, index) => ({
    id: `tab-${index}`,
    label: service.title,
    content: <ServiceCard {...service} />
}));

export const HowWeDoIt: React.FC = () => {
    return (
        <section className={styles.gridSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>How we do it</h2>
                </div>
                <TabsList tabs={tabs} />
            </div>
        </section>
    );
};