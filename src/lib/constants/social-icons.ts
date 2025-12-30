import type { SocialIconType } from '@/types/portfolio.types';

export const SOCIAL_ICON_OPTIONS: Array<{ value: SocialIconType; label: string; description: string }> = [
  { value: 'github', label: 'GitHub', description: 'GitHub profile or repository' },
  { value: 'linkedin', label: 'LinkedIn', description: 'LinkedIn professional profile' },
  { value: 'twitter', label: 'Twitter/X', description: 'Twitter or X profile' },
  { value: 'facebook', label: 'Facebook', description: 'Facebook profile or page' },
  { value: 'instagram', label: 'Instagram', description: 'Instagram profile' },
  { value: 'youtube', label: 'YouTube', description: 'YouTube channel' },
  { value: 'discord', label: 'Discord', description: 'Discord server or profile' },
  { value: 'email', label: 'Email', description: 'Email address' },
  { value: 'website', label: 'Website', description: 'Personal or company website' },
  { value: 'medium', label: 'Medium', description: 'Medium blog or publication' },
  { value: 'dev', label: 'Dev.to', description: 'Dev.to developer blog' },
  { value: 'stackoverflow', label: 'Stack Overflow', description: 'Stack Overflow profile' },
  { value: 'behance', label: 'Behance', description: 'Behance design portfolio' },
  { value: 'dribbble', label: 'Dribbble', description: 'Dribbble design portfolio' },
  { value: 'figma', label: 'Figma', description: 'Figma design profile' },
  { value: 'tiktok', label: 'TikTok', description: 'TikTok profile' },
  { value: 'twitch', label: 'Twitch', description: 'Twitch channel' },
  { value: 'reddit', label: 'Reddit', description: 'Reddit profile' },
];

/**
 * Get the label for a given icon type
 */
export function getIconLabel(iconType: SocialIconType): string {
  const option = SOCIAL_ICON_OPTIONS.find(opt => opt.value === iconType);
  return option?.label || iconType;
}

/**
 * Get the description for a given icon type
 */
export function getIconDescription(iconType: SocialIconType): string {
  const option = SOCIAL_ICON_OPTIONS.find(opt => opt.value === iconType);
  return option?.description || '';
}

/**
 * Check if an icon type is valid
 */
export function isValidIconType(iconType: string): iconType is SocialIconType {
  return SOCIAL_ICON_OPTIONS.some(opt => opt.value === iconType);
}
