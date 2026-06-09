export interface EventItem {
  id: string;
  title: string;
  artist: string;
  venueId: string;
  venueName: string;
  date: string;
  time: string;
  description: string;
  priceGBP: number;
  priceSTEEL: number;
  nftId: string;
  image: string;
  genres: string[];
  capacity: number;
  sold: number;
  isSoldOut: boolean;
  isFeatured: boolean;
  tag?: string;
}

export interface VenueItem {
  id: string;
  name: string;
  area: "Kelham Island" | "West Street" | "Division Street" | "Castlegate" | "Leadmill Road" | "Hope Works Area";
  type: "Club" | "Industrial Space" | "Bar / Social" | "Traditional Pub" | "Live Music Venue";
  coordinates: { x: number; y: number }; // Relative percentage (0-100) on our interactive map canvas
  description: string;
  fullAddress: string;
  ratingWeb3: number; // Staking score
  capacity: number;
  soundSystem: string;
  image: string;
  isTrending: boolean;
  vulnerabilityScore?: string; // Steel resilience index
}

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  bpm: number;
  genre: string;
  waveData: number[];
  audioUrl?: string; // Will create a dynamic synth-based player
}

export interface PodcastEpisode {
  id: string;
  title: string;
  hosts: string[];
  episodeNum: number;
  date: string;
  summary: string;
  duration: string;
  cover: string;
  listenCount: number;
}

export interface ArticleItem {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: "Sound Culture" | "Industrial Heritage" | "Critique" | "Future Gaze";
  snippet: string;
  content: string[];
  cover: string;
  featured: boolean;
}

export interface UserWallet {
  connected: boolean;
  address: string | null;
  steelBalance: number;
  stakedSteel: number;
  avatar: string;
  username: string;
  loyaltyLevel: "Novice Raver" | "Iron Apprentice" | "Steel Ambassador" | "Sheffield Spectre";
  recentCheckins: string[]; // Venue IDs
  ownedNFTs: {
    id: string;
    eventId: string;
    ticketName: string;
    mintDate: string;
    rarity: "Standard" | "Vip" | "Legendary";
    metadataURI: string;
  }[];
}

export interface ActivityFeedItem {
  id: string;
  username: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  hash?: string; // Sim Web 3.0 hash
}
