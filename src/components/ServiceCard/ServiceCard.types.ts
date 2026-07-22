import * as LucideIcons from 'lucide-react';

export interface ServiceCardProps {
  /** Main heading */
  title: string;
  /** Explanatory paragraph */
  description: string;
  /** Dynamic string key name matching a Lucide icon */
  iconName: keyof typeof LucideIcons;
  /** Relative or absolute source URL path for the thumbnail asset */
  thumbnailUrl: string;
  /** Descriptive alt text for the card illustration */
  thumbnailAlt: string;
  /** Navigation target URL for the CTA button action link */
  ctaUrl: string;
  /** Custom text overriding the baseline primary action label */
  ctaText?: string;
}
