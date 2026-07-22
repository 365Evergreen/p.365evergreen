import React from 'react';
import { ServiceCard } from './ServiceCard';
import type { ServiceCardProps } from './ServiceCard.types';
import styles from './ServiceGrid.module.css';

const mockServices: ServiceCardProps[] = [
    {
        title: 'Modernise your workplace',
        description: 'Create a modern, connected workplace that helps your teams work smarter, not harder',
        iconName: 'Home',
        thumbnailUrl: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/1072651-HeroBG-1600x616?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=770&qlt=100&fit=constrain',
        thumbnailAlt: 'Server room server rack array glowing neon blue infrastructure cables',
        ctaUrl: '/services/cloud',
        ctaText: 'Explore Cloud Solutions',
    },
    {
        title: 'Custom API Architecture',
        description: 'Production-ready backends delivering microservices engineered via high-performance scalable endpoints.',
        iconName: 'Cpu',
        thumbnailUrl: 'https://unsplash.com',
        thumbnailAlt: 'Close-up macroeconomic silicon computer motherboard processing unit chip',
        ctaUrl: '/services/api',
        ctaText: 'View API Services',
    },
    {
        title: 'Data & Analytics',
        description: 'Turn your data into actionable insights with our advanced analytics and business intelligence solutions.',
        iconName: 'BarChart2',
        thumbnailUrl: 'https://unsplash.com',
        thumbnailAlt: 'Data visualization dashboard with charts and graphs on a computer screen',
        ctaUrl: '/services/data-analytics',
        ctaText: 'Discover Data Solutions',
    },
    {
        title: 'Security & Compliance',
        description: 'Protect your business with our comprehensive security and compliance services, ensuring your data is safe and regulations are met.',
        iconName: 'Shield',
        thumbnailUrl: 'https://unsplash.com',
        thumbnailAlt: 'Digital security concept with a shield icon and binary code background',
        ctaUrl: '/services/security-compliance',
        ctaText: 'Learn About Security',
    },
    {
        title: 'Collaboration & Productivity',
        description: 'Enhance team collaboration and productivity with our tailored Microsoft 365 solutions.',
        iconName: 'Users',
        thumbnailUrl: 'https://unsplash.com',
        thumbnailAlt: 'Team collaborating in a modern office space with laptops and digital devices',
        ctaUrl: '/services/collaboration-productivity',
        ctaText: 'Boost Collaboration',
    },
    {
        title: 'Training & Support',
        description: 'Empower your team with our expert training and support services for Microsoft 365.',
        iconName: 'BookOpen',
        thumbnailUrl: 'https://unsplash.com',
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