import React from 'react';
import { ServiceCard } from './ServiceCard';
import type { ServiceCardProps } from './ServiceCard.types';
import styles from './ServiceGrid.module.css';

const mockServices: ServiceCardProps[] = [
    {
        title: 'Modernise your workplace',
        description: 'Improve productivity and employee satisfaction whilst maintaining security and data integrity. SOCO’s modern workplace solutions provide seamless collaboration and communication across locations, languages and platforms.',
        iconName: 'Home',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/modern-workplace.webp',
        thumbnailAlt: 'Server room server rack array glowing neon blue infrastructure cables',
        ctaUrl: '/services/cloud',
        ctaText: 'Explore Cloud Solutions',
    },
    {
        title: 'Apps you love',
        description: 'Integrated, purpose built apps to manage every business function. From sales and marketing, through customer service, to business optimisation and process automation, SOCO’s business applications solutions help organisations improve operational efficiency.',
        iconName: 'Cpu',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/power-apps.webp',
        thumbnailAlt: 'Close-up macroeconomic silicon computer motherboard processing unit chip',
        ctaUrl: '/services/api',
        ctaText: 'View API Services',
    },
    {
        title: 'Improve your processes',
        description: 'Our Process Automation solution, streamlines operations by centralising information and reduces manual data input. It enhances transparency, inter-departmental communication and processing speed.',
        iconName: 'BarChart2',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/power-automate.webp',
        thumbnailAlt: 'Data visualization dashboard with charts and graphs on a computer screen',
        ctaUrl: '/services/data-analytics',
        ctaText: 'Discover Data Solutions',
    },
    {
        title: 'Security & Compliance',
        description: 'Protect your business with our comprehensive security and compliance services, ensuring your data is safe and regulations are met.',
        iconName: 'Shield',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/security.webp',
        thumbnailAlt: 'Digital security concept with a shield icon and binary code background',
        ctaUrl: '/services/security-compliance',
        ctaText: 'Learn About Security',
    },
    {
        title: 'Collaboration & Productivity',
        description: 'Enhance team collaboration and productivity with our tailored Microsoft 365 solutions.',
        iconName: 'Users',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/collaboration-productivity.webp',
        thumbnailAlt: 'Team collaborating in a modern office space with laptops and digital devices',
        ctaUrl: '/services/collaboration-productivity',
        ctaText: 'Boost Collaboration',
    },
    {
        title: 'Training & Support',
        description: 'Empower your team with our expert training and support services for Microsoft 365.',
        iconName: 'BookOpen',
        thumbnailUrl: 'https://cdn.365evergreen.com/content/media/training-support.webp',
        thumbnailAlt: 'Professional training session with a presenter and attentive audience',
        ctaUrl: '/services/training-support',
        ctaText: 'Get Training Support',
    }
];

export const ServiceGrid: React.FC = () => {
    return (
        <section className={styles.gridSection}>
            <div className={styles.container}>

                {/* Top Text Content Area */}
                <div className={styles.header}>
                    <h2 className={styles.title}>What we do</h2>
                </div>

                {/* 3-Column Responsive Layout Grid */}
                <div className={styles.grid}>
                    {mockServices.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>

            </div>
        </section>
    );
};