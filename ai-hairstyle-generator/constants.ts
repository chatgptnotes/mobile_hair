import type { Hairstyle } from './types';

const avatarColors = "64748b,94a3b8,cbd5e1,475569,1e293b";
const getAvatarUrl = (name: string) => `https://source.boringavatars.com/bauhaus/120/${encodeURIComponent(name)}?colors=${avatarColors}`;


export const HAIRSTYLES: Hairstyle[] = [
  { id: 'classic-side-part', name: 'Classic Side Part', imageUrl: getAvatarUrl('Classic Side Part'), categories: ['short', 'modern'] },
  { id: 'pompadour', name: 'Pompadour / Quiff', imageUrl: getAvatarUrl('Pompadour'), categories: ['short', 'modern'] },
  { id: 'undercut', name: 'Undercut', imageUrl: getAvatarUrl('Undercut'), categories: ['short', 'modern'] },
  { id: 'messy-quiff', name: 'Messy Quiff', imageUrl: getAvatarUrl('Messy Quiff'), categories: ['short'] },
  { id: 'long-and-layered', name: 'Long & Layered', imageUrl: getAvatarUrl('Long & Layered'), categories: ['long'] },
  { id: 'buzz-cut', name: 'Buzz Cut', imageUrl: getAvatarUrl('Buzz Cut'), categories: ['short'] },
  { id: 'slick-back', name: 'Slick Back', imageUrl: getAvatarUrl('Slick Back'), categories: ['short', 'modern'] },
  { id: 'curly-bob', name: 'Curly Bob', imageUrl: getAvatarUrl('Curly Bob'), categories: ['long'] },
  { id: 'afro', name: 'Afro', imageUrl: getAvatarUrl('Afro'), categories: ['long', 'modern'] },
  { id: 'faux-hawk', name: 'Faux Hawk', imageUrl: getAvatarUrl('Faux Hawk'), categories: ['short'] },
  { id: 'man-bun', name: 'Man Bun', imageUrl: getAvatarUrl('Man Bun'), categories: ['long'] },
  { id: 'curtains', name: 'Curtains', imageUrl: getAvatarUrl('Curtains'), categories: ['long'] },
  { id: 'top-knot', name: 'Top Knot', imageUrl: getAvatarUrl('Top Knot'), categories: ['long', 'modern'] },
  { id: 'short-spiky', name: 'Short & Spiky', imageUrl: getAvatarUrl('Short & Spiky'), categories: ['short'] },
];