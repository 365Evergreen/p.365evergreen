import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { ServiceCardProps } from './ServiceCard.types';
import styles from './ServiceCard.module.css';

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconName,
  thumbnailUrl,
  thumbnailAlt,
  ctaUrl,
  ctaText = 'Get Started',
}) => {
  // Extract icons from the Lucide mapping securely
  const IconComponent = LucideIcons[iconName] as React.ComponentType<{ size?: number | string }>;
  const ArrowIcon = LucideIcons.ArrowRight as React.ComponentType<{ size?: number | string; className?: string }>;

  return (
    <article className={styles.card}> <h3 className={styles.title}>{title}</h3>
      {/* Visual Header Zone */}
      <div className={styles.thumbnailWrapper}>
        <img 
          src={thumbnailUrl} 
          alt={thumbnailAlt} 
          className={styles.thumbnail} 
          loading="lazy"
        />
        <div className={styles.iconWrapper}>
          {IconComponent ? <IconComponent size={22} /> : <LucideIcons.HelpCircle size={22} />}
        </div>
      </div>

      {/* Main Copy Context Box */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        {/* Call to Action Anchor Link */}
        <a href={ctaUrl} className={styles.ctaButton}>
          {ctaText}
          {ArrowIcon && <ArrowIcon size={16} className={styles.ctaIcon} />}
        </a>
      </div>
    </article>
  );
};
