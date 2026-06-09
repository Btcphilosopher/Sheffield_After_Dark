import { EventItem, VenueItem, TrackItem, PodcastEpisode, ArticleItem, ActivityFeedItem } from "./types";

export const VENUES: VenueItem[] = [
  {
    id: "forge",
    name: "FORGE Sheffield",
    area: "Hope Works Area",
    type: "Industrial Space",
    coordinates: { x: 70, y: 72 }, // Canal basin district
    description: "A colossal, repurposed steel-work Victorian machine warehouse on the waterfront, featuring a state-of-the-art Pioneer sound array. The architectural cathedral of steel skeleton structure and raw concrete.",
    fullAddress: "148 Effingham St, Sheffield, S4 7YT",
    ratingWeb3: 289100, // Total staked $STEEL for tier
    capacity: 1200,
    soundSystem: "Pioneer Pro Audio XY Series (Quadraphonic Stack)",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    isTrending: true,
    vulnerabilityScore: "98% (Secure / Industrial Protected)"
  },
  {
    id: "hope-works",
    name: "Hope Works",
    area: "Hope Works Area",
    type: "Club",
    coordinates: { x: 74, y: 58 }, // Industrial Sussex St
    description: "An authentic DIY beacon of avant-garde synthetic music, hope, and rave culture in a moody 19th-century metal-casting works. Home to legendary multi-room selector festivals.",
    fullAddress: "Sussex St, Sheffield, S4 7YQ",
    ratingWeb3: 412500,
    capacity: 800,
    soundSystem: "Custom Opus Audio & Funktion-One Custom Arrays",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600",
    isTrending: true,
    vulnerabilityScore: "100% (Iconic / Sovereign)"
  },
  {
    id: "leadmill",
    name: "The Leadmill",
    area: "Leadmill Road",
    type: "Live Music Venue",
    coordinates: { x: 45, y: 88 }, // Cultural industries quarter
    description: "Operating since 1980, this former flour mill is Sheffield's longest running live music institution. Launchpad for Pulp, Arctic Monkeys, and generations of British guitar culture.",
    fullAddress: "6 Leadmill Rd, Sheffield, S1 4SE",
    ratingWeb3: 567000,
    capacity: 900,
    soundSystem: "L-Acoustics Kara II Modular Line Source",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
    isTrending: false,
    vulnerabilityScore: "95% (Community Preserved)"
  },
  {
    id: "plot22",
    name: "PLOT 22",
    area: "Castlegate",
    type: "Club",
    coordinates: { x: 55, y: 48 }, // Creative quarter
    description: "An intimate, raw, community-oriented social enclave on former castle land. A vital space for grassroots bassline, footwork, and underground experimental music residencies.",
    fullAddress: "22 Exchange St, Sheffield, S2 5TS",
    ratingWeb3: 143000,
    capacity: 150,
    soundSystem: "Custom Turbosound Hybrid / Valve Sound System",
    image: "https://images.unsplash.com/photo-1543791187-df796fa11835?auto=format&fit=crop&q=80&w=600",
    isTrending: true,
    vulnerabilityScore: "89% (Regeneration Risk Level: Moderate)"
  },
  {
    id: "harley",
    name: "The Harley",
    area: "West Street",
    type: "Bar / Social",
    coordinates: { x: 18, y: 45 }, // West street node
    description: "An eclectic, vibrant pub-club hybrid on the edge of the campus. Famous for pioneering bassline nights, late-night high-energy burgers, and legendary warm indie pre-game slots.",
    fullAddress: "334 Glossop Rd, Sheffield, S10 2HW",
    ratingWeb3: 204500,
    capacity: 250,
    soundSystem: "Void Acoustics Air Motion Array",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
    isTrending: false,
    vulnerabilityScore: "92% (Secure)"
  },
  {
    id: "kelham-island-tavern",
    name: "Kelham Island Tavern",
    area: "Kelham Island",
    type: "Traditional Pub",
    coordinates: { x: 28, y: 18 }, // Waterfront ale belt
    description: "An multi-award-winning oasis of local real ale and historic brass castings. Features a beautiful slate walled beer garden resting beside former steel smelting mills.",
    fullAddress: "62 Russell St, Sheffield, S3 8RW",
    ratingWeb3: 198000,
    capacity: 180,
    soundSystem: "Acoustics of Victorian Stonework and local Chatter",
    image: "https://images.unsplash.com/photo-1572111504021-40afd4d6519d?auto=format&fit=crop&q=80&w=600",
    isTrending: false,
    vulnerabilityScore: "100% (Historic Monument Status)"
  },
  {
    id: "forum-bars",
    name: "Forum Kitchen + Bar",
    area: "Division Street",
    type: "Bar / Social",
    coordinates: { x: 30, y: 55 }, // Devonshire green belt
    description: "A sleek, industrial-styled massive glasshouse overlooking Devonshire Green park. Serving artisanal gin cocktails, woodfired pizzas, and hosting outdoor vinyl sunset sessions.",
    fullAddress: "127-129 Devonshire St, Sheffield, S3 7SB",
    ratingWeb3: 254000,
    capacity: 500,
    soundSystem: "Martin Audio Ceiling Suspended Systems",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600",
    isTrending: true,
    vulnerabilityScore: "97% (Core Commercial Node)"
  }
];

export const EVENTS: EventItem[] = [
  {
    id: "ev1",
    title: "Crucible Synth-Pop Revival: 2026 Edition",
    artist: "Cabaret Voltaire (Classic Set) + Warp-Pioneers Live",
    venueId: "hope-works",
    venueName: "Hope Works",
    date: "Tonight - June 9, 2026",
    time: "22:00 - 05:00",
    description: "An audio-visual exploration celebrating the birth of industrial modular synthesiser music in the dark mills of South Yorkshire. Live dynamic analogue patching and hypnotic film reels.",
    priceGBP: 18.50,
    priceSTEEL: 45,
    nftId: "SAD-CBRT-VLT-042",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    genres: ["Synth Wave", "Industrial", "EBM", "Acid House"],
    capacity: 800,
    sold: 724,
    isSoldOut: false,
    isFeatured: true,
    tag: "HIGH DEMAND"
  },
  {
    id: "ev2",
    title: "Sheffield 140bpm Syndicate: Warehouse Summit",
    artist: "Toddla T b2b Special Guest + Speed Garage Pioneers",
    venueId: "forge",
    venueName: "FORGE Sheffield",
    date: "This Friday - June 12, 2026",
    time: "23:00 - 06:00",
    description: "Experience the ultimate, heavy bassline sub-bass chest pressure in a massive Victorian foundry room. Steel-grid projection layouts and bespoke quad sub-woofer deployment.",
    priceGBP: 22.00,
    priceSTEEL: 55,
    nftId: "SAD-140S-FRG-109",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600",
    genres: ["Bassline", "UK Garage", "Dubstep", "Grime"],
    capacity: 1200,
    sold: 1198,
    isSoldOut: false,
    isFeatured: true,
    tag: "99% SOLD"
  },
  {
    id: "ev3",
    title: "Nocturnal DIY Footwork & Valve Rituals",
    artist: "Dryad (Live Eurorack) b2b Castlegate Sound Collective",
    venueId: "plot22",
    venueName: "PLOT 22",
    date: "Saturday - June 13, 2026",
    time: "21:00 - 03:00",
    description: "Low-capacity, high-heat sonic experimentation inside Castlegate's raw brick vault. Expect jagged bass rhythms, juke, and distorted 808 subs on the custom valve rig.",
    priceGBP: 8.00,
    priceSTEEL: 20,
    nftId: "SAD-DYD22-PT-001",
    image: "https://images.unsplash.com/photo-1543791187-df796fa11835?auto=format&fit=crop&q=80&w=600",
    genres: ["Footwork", "IDM", "Gqom", "Breaks"],
    capacity: 150,
    sold: 150,
    isSoldOut: true,
    isFeatured: false,
    tag: "SOLD OUT"
  },
  {
    id: "ev4",
    title: "Devonshire Sunken Garden Patio Session",
    artist: "Steel City Dub Syndicate & Vinyl Merchants",
    venueId: "forum-bars",
    venueName: "Forum Kitchen + Bar",
    date: "Sunday Sunset - June 14, 2026",
    time: "15:00 - 22:00",
    description: "A relaxed, sun-bleached (and rainy-refracted) evening spinning roots reggae, classic house, and organic deep grooves. Free entry for SAD-NFT holding members.",
    priceGBP: 0.00, // Web 3 priority
    priceSTEEL: 0,
    nftId: "SAD-SUNS-FOR-082",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
    genres: ["Dub", "Deep House", "Roots", "Lo-Fi"],
    capacity: 500,
    sold: 180,
    isSoldOut: false,
    isFeatured: false,
    tag: "FREE FOR MEMBERS"
  },
  {
    id: "ev5",
    title: "Post-Punk & Foundry Echoes",
    artist: "Crucible Iron Giants + Special Guests Live",
    venueId: "leadmill",
    venueName: "The Leadmill",
    date: "Thursday - June 18, 2026",
    time: "19:30 - 23:00",
    description: "Celebrating Sheff legacy of industrial guitar noise. High contrast vocals, angular basslines, and mechanical percussive patterns.",
    priceGBP: 14.00,
    priceSTEEL: 32,
    nftId: "SAD-LEAD-GIANTS",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
    genres: ["Post-Punk", "Darkwave", "Indie Rock"],
    capacity: 900,
    sold: 643,
    isSoldOut: false,
    isFeatured: false,
    tag: "LIVE SHOW"
  }
];

export const TRACKS: TrackItem[] = [
  {
    id: "tr1",
    title: "Foundry Resonance (128 Patches)",
    artist: "Dryad",
    duration: "6:24",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=100",
    bpm: 128,
    genre: "Techno",
    waveData: [10, 40, 25, 60, 48, 80, 75, 90, 85, 95, 45, 12, 60, 68, 85, 80, 30, 45, 90, 70, 80, 95, 10, 20, 40, 70, 75, 40, 80, 20, 50, 90, 85, 30, 40, 60, 50, 10],
    audioUrl: "https://actions.google.com/sounds/v1/ambient/synth_pass.ogg" // generic stable URL
  },
  {
    id: "tr2",
    title: "Kelham Island Fog Loop",
    artist: "Warp Pioneers",
    duration: "5:42",
    cover: "https://images.unsplash.com/photo-1543791187-df796fa11835?auto=format&fit=crop&q=80&w=100",
    bpm: 112,
    genre: "IDM / Ambient",
    waveData: [15, 20, 28, 35, 42, 50, 58, 62, 70, 75, 70, 65, 50, 40, 32, 28, 35, 45, 55, 62, 70, 78, 80, 85, 78, 70, 55, 45, 32, 25, 15, 10, 8, 12, 18, 24, 30, 20],
    audioUrl: "https://actions.google.com/sounds/v1/ambient/slow_motion.ogg"
  },
  {
    id: "tr3",
    title: "Sheffield Bassline Renaissance (140-VIP Mix)",
    artist: "Sheffield Bassline Syndicate",
    duration: "4:15",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=100",
    bpm: 140,
    genre: "Bassline",
    waveData: [8, 15, 35, 75, 90, 98, 92, 95, 85, 95, 99, 12, 85, 90, 95, 99, 15, 65, 98, 92, 95, 99, 10, 40, 85, 92, 98, 95, 99, 15, 55, 92, 98, 95, 99, 12, 80, 10],
    audioUrl: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
  },
  {
    id: "tr4",
    title: "Division Street Neon Shadows",
    artist: "Steel City Dub Syndicate",
    duration: "7:08",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=100",
    bpm: 124,
    genre: "Deep Dub Techno",
    waveData: [20, 25, 35, 45, 50, 55, 60, 62, 58, 65, 68, 60, 50, 45, 48, 52, 58, 65, 70, 75, 78, 80, 75, 68, 60, 55, 48, 42, 38, 32, 28, 25, 22, 18, 15, 12, 10, 5],
    audioUrl: "https://actions.google.com/sounds/v1/ambient/water_droplets.ogg"
  }
];

export const PODCASTS: PodcastEpisode[] = [
  {
    id: "pod1",
    title: "Basslines, Speed Garage & Brickwork Walls: The 140bpm Legacy",
    hosts: ["Tilly Attercliffe", "Marcus Kelham"],
    episodeNum: 38,
    date: "June 04, 2026",
    summary: "Host Tilly chats with Sheffield speed garage veterans about the secret, heavy sub-bass lines that shook clubs like Niche, and how PLOT 22 and FORGE are preserving the deep organic chest vibration today.",
    duration: "48 mins",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=300",
    listenCount: 1420
  },
  {
    id: "pod2",
    title: "Echoes of the Foundry: Birthed on Synths in the 1970s",
    hosts: ["Prof. Neil Sheffield", "Esme Attercliffe"],
    episodeNum: 37,
    date: "May 28, 2026",
    summary: "A deep archival dive into how Cabaret Voltaire, Human League, and ABC repurposed their iron-smelting family heritage to buy low-cost Japanese analogue synthesizers, writing the future pop playbook.",
    duration: "54 mins",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=300",
    listenCount: 2180
  },
  {
    id: "pod3",
    title: "Sovereign Spaces: The Battle for Creative Slabs",
    hosts: ["John Forge", "Sienna Castlegate"],
    episodeNum: 36,
    date: "May 15, 2026",
    summary: "Talking to DIY activists and curators about gentrification, lease extensions of legendary venues like The Leadmill, and how Web 3.0 fractional crowd-ownership is fighting back.",
    duration: "36 mins",
    cover: "https://images.unsplash.com/photo-1543791187-df796fa11835?auto=format&fit=crop&q=80&w=300",
    listenCount: 980
  }
];

export const ARTICLES: ArticleItem[] = [
  {
    id: "art1",
    title: "Echoes from the Crucible: How Industrial Ruins Birthed Synth Pop",
    author: "Richard Wood",
    date: "June 07, 2026",
    readTime: "6 min read",
    category: "Industrial Heritage",
    snippet: "In the late 1970s, as the cooling towers of Sheffield's steel works cast dark silhouettes, local visionaries abandoned guitars for transistors. This is the origin story of how heavy iron structures became synthesized waves.",
    content: [
      "Walk down the River Don today, and the persistent metallic clanging is mostly gone. But in 1978, the sound of the foundry wasn't just physical noise; it was an emotional context. For a generation of youths growing up in South Yorkshire, industrial decline was highly visceral.",
      "While London was fighting punk rock wars, Richard H. Kirk and Stephen Mallinder of Cabaret Voltaire were nesting inside Western Works, a drafty attic space, splicing magnetic tape loop and feeding synthetic oscillations into homemade tape players.",
      "The aesthetic was unyielding. They didn't have gold records, they had steel plates. When the Human League recorded 'Being Boiled' in a derelict building using basic synthesizers, they formulated a sound that combined heavy industrial vibration with high-gloss pop sheen. It was high-contrast pop music made by kids who smelled of oil and heavy slag.",
      "Today, platforms like Sheffield After Dark translate that identical ethos. By using Web 3.0-backed independent contracts, a new wave of local electronic artists are reclaiming their sovereign creative power. Synthetic history isn't dead; it's simply migrated online."
    ],
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    featured: true
  },
  {
    id: "art2",
    title: "Occupy the Void: Plot 22, Hope Works & the Struggle for Footprint",
    author: "Esme Ward",
    date: "May 29, 2026",
    readTime: "8 min read",
    category: "Sound Culture",
    snippet: "Underground communities are fighting real estate pressures with decentralized systems. How crowdsourcing and Web 3.0 fractionalized crowd staking are helping venues buy their brickwork.",
    content: [
      "In the modern city, creative spaces are often treated as temporary place-holders. A collective moves into an abandoned cutlery house, brings it to life, and three years later, is served an eviction notice to make way for high-rise steel-girded flats.",
      "But Plot 22 in Castlegate has established a separate model. By pairing closely with local councils and creating Web 3.0 independent community nodes, they have gathered over 150 staked memberships that directly back their venue licensing fees.",
      "Rather than relying on generic government funding, they run on $STEEL community tokens. Members stake tokens to vote on booking budgets, creating a highly symbiotic financial loop where the ravers own the creative destination. It represents physical spaces guarded by decentralized digital frameworks."
    ],
    cover: "https://images.unsplash.com/photo-1543791187-df796fa11835?auto=format&fit=crop&q=80&w=800",
    featured: false
  },
  {
    id: "art3",
    title: "140bpm Heavyweight Resonance: The Speed Garage Renaissance",
    author: "Devon Division",
    date: "April 18, 2026",
    readTime: "5 min read",
    category: "Future Gaze",
    snippet: "Sheffield bassline was born from the raw rib-cage rattle of Niche Club. Now, a new crop of young producers are matching original analogue bass lines with modern synthetic speeds.",
    content: [
      "No sound belongs to Sheffield more purely than Bassline. Born out of the legendary Niche nightclub on Sidney Street in the 1990s, the sound mutated London Speed Garage by amplifying the sub-bass frequencies until they warped the car doors of parking lots outside.",
      "Its legacy is aggressive, raw, and incredibly direct. It didn't find validation in magazine cover stories; it was pushed on pirate cassettes through the windows of Sheffield’s black cabs.",
      "Today, young clubs like FORGE are carrying the torch. Armed with massive quad-speaker systems, they're launching bassline festivals that fuse historic Yorkshire weight with digital NFT access passes. Sheffield doesn't just dance; it shakes."
    ],
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800",
    featured: false
  }
];

export const INITIAL_ACTIVITY: ActivityFeedItem[] = [
  {
    id: "act1",
    username: "steelmancer.eth",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80",
    action: "Minted VIP NFT Pass for",
    target: "Crucible Synth-Pop Revival",
    time: "4 mins ago",
    hash: "0x8fa...c91"
  },
  {
    id: "act2",
    username: "division_dancer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80",
    action: "Checked-in at",
    target: "FORGE Sheffield",
    time: "12 mins ago",
    hash: "0x3bc...221"
  },
  {
    id: "act3",
    username: "warp_loop_88",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=80",
    action: "Staked 500 $STEEL on",
    target: "PLOT 22 Resilience Pool",
    time: "25 mins ago",
    hash: "0xe4d...fb3"
  },
  {
    id: "act4",
    username: "niche_veteran",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80",
    action: "Unlocked Digital Membership Level:",
    target: "Iron Apprentice",
    time: "1 hr ago",
    hash: "0x112...dd4"
  }
];
