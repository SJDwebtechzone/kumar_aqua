// Centralized species data — used by both the homepage catalog
// and the individual species detail pages.

export const speciesList = [
  {
    slug: "shrimp",
    name: "Cherry Shrimp (Red/Yellow)",
    scientific: "Neocaridina davidi",
    tag: "INVERTEBRATE",
    desc: "Stunning active dwarf shrimp selectively bred for deep cherry red and lemon yellow opaque coloring. Excellent cleaning crew that feeds on algae.",
    longDesc:
      "Cherry shrimp are among the most popular freshwater invertebrates in the hobby, prized for their vivid coloration and peaceful nature. Selectively bred over generations from the wild Neocaridina davidi, they now come in striking solid red and yellow color grades. Beyond their beauty, they serve as diligent tank cleaners — grazing on algae, biofilm, and leftover food, helping keep planted aquariums pristine. They're hardy, easy to breed, and ideal for beginners building a nano or planted tank.",
    temp: "18°C - 27°C",
    ph: "6.5 - 8.0",
    tank: "18L (5 Gallons) min",
    difficulty: "Beginner Friendly",
    diet: "Omnivore — algae, biofilm, blanched vegetables, shrimp-specific pellets",
    lifespan: "1 - 2 years",
    tankMates: "Peaceful community fish, snails, other dwarf shrimp. Avoid larger fish that may prey on them.",
    breeding: "Prolific breeders in stable, mature tanks. Females carry eggs (\"berried\") for about 30 days before releasing free-swimming young.",
    idealFor: ["Beginners", "Planted Tanks", "Nano Tanks", "Algae Control"],
    funFact: "A female cherry shrimp can release up to 30 fully-formed young at once — no larval stage, unlike most other shrimp species.",
    setupTips: [
      "Provide dense moss or plant cover for shrimp to graze and hide in.",
      "Avoid copper-based medications — even trace amounts are toxic to shrimp.",
      "Use a sponge filter intake guard to prevent shrimp being pulled in.",
      "Stable, mature water parameters matter more than exact numbers.",
    ],
    compatibleWith: ["Neon Tetras", "Corydoras", "Nerite Snails", "Other Neocaridina Shrimp"],
    avoid: ["Bettas", "Larger Cichlids", "Goldfish"],
    image: "/images/shrimp.jpg",
    gallery: [
      "/images/shrimp.jpg",
      "/images/shrimp-2.jpg",
      "/images/shrimp-3.jpg",
    ],
  },
  {
    slug: "gold-angelfish",
    name: "Gold Angelfish",
    scientific: "Pterophyllum scalare",
    tag: "CICHLID",
    desc: "Graceful triangular shape with striking solid metallic-gold luster. High, tall fins. Highly interactive, displays responsive personality to keepers.",
    longDesc:
      "Gold Angelfish are a captivating color variant of the classic freshwater angelfish, prized for their brilliant metallic-gold body and tall, flowing fins. As cichlids, they display more personality and intelligence than many community fish — often recognizing their keeper and responding to feeding routines. They do best in taller aquariums that accommodate their vertical fin growth, and can be kept in pairs or small groups once compatible pairs are established.",
    temp: "24°C - 30°C",
    ph: "6.0 - 7.4",
    tank: "110L (30 Gallons) min",
    difficulty: "Intermediate",
    diet: "Omnivore — high-quality flakes, pellets, live or frozen bloodworms and brine shrimp",
    lifespan: "8 - 10 years",
    tankMates: "Larger peaceful community fish (tetras, corydoras, gouramis). Avoid fin-nippers and very small fish that may be seen as prey.",
    breeding: "Form monogamous pairs and lay eggs on flat surfaces or broad leaves. Both parents guard and fan the eggs.",
    idealFor: ["Intermediate Keepers", "Tall Aquariums", "Community Tanks", "Show Tanks"],
    funFact: "Angelfish are actually cichlids, not tetras or barbs — their name comes from their graceful, angelic fin shape rather than their family.",
    setupTips: [
      "Choose a tank at least 45cm (18in) tall to suit their vertical fin growth.",
      "Provide broad-leafed plants or slate for potential egg-laying surfaces.",
      "Keep water changes consistent — angelfish are sensitive to sudden shifts.",
      "Avoid keeping with nippy fin-nipping species like tiger barbs.",
    ],
    compatibleWith: ["Corydoras Catfish", "Gouramis", "Larger Tetras", "Bristlenose Pleco"],
    avoid: ["Tiger Barbs", "Fancy Guppies", "Dwarf Shrimp"],
    image: "/images/gold-angelfish.jpg",
    gallery: [
      "/images/gold-angelfish.jpg",
      "/images/gold-angelfish-2.jpg",
      "/images/gold-angelfish-3.jpg",
    ],
  },
  {
    slug: "balloon-molly",
    name: "Balloon Molly",
    scientific: "Poecilia latipinna var.",
    tag: "LIVEBEARER",
    desc: "Distinctive round pot-belly shape with vibrant patterns. Highly active and playful swimmers that thrive in community aquariums.",
    longDesc:
      "Balloon Mollies are a highly popular selectively bred variety of mollies, known for their unique, short, and rounded bellies. They display a playful, active personality and come in many gorgeous colors. They are peaceful livebearers, excellent for community aquariums, and help keep algae in check.",
    temp: "22°C - 28°C",
    ph: "7.0 - 8.5",
    tank: "75L (20 Gallons) min",
    difficulty: "Beginner Friendly",
    diet: "Omnivore — flakes, algae wafers, occasional live or frozen foods, appreciates some vegetable matter",
    lifespan: "3 - 5 years",
    tankMates: "Other livebearers (guppies, platies), peaceful community fish. Keep more females than males to reduce mating stress.",
    breeding: "Livebearers — females give birth to free-swimming fry roughly every 4-6 weeks in a well-established tank.",
    idealFor: ["Beginners", "Community Tanks", "Livebearer Enthusiasts", "Playful Swimmers"],
    funFact: "Balloon mollies owe their round shape to a genetic trait that shortens their spine, giving them their characteristic balloon-like body.",
    setupTips: [
      "Keep at least a 3:1 female-to-male ratio to reduce mating stress on females.",
      "Add a pinch of aquarium salt for extra health support (optional, not required).",
      "Provide open swimming space alongside planted areas.",
      "Feed some vegetable matter (algae wafers, blanched veggies) regularly.",
    ],
    compatibleWith: ["Guppies", "Platies", "Swordtails", "Corydoras"],
    avoid: ["Bettas", "Fin-Nipping Barbs", "Aggressive Cichlids"],
    image: "/images/balloon-molly.jpg",
    gallery: [
      "/images/balloon-molly.jpg",
      "/images/moon-tail-molly-3.jpg",
      "/images/moon-tail-molly.webp",
    ],
  },
];

export function getSpeciesBySlug(slug) {
  return speciesList.find((s) => s.slug === slug);
}
export function buildDbSpecies(fish) {
  return {
    slug: `db-${fish.id}`,
    name: fish.name,
    scientific: fish.cycle || "",
    tag: fish.category?.toUpperCase() || "FISH",
    desc: fish.note || "",
    longDesc: fish.note || "",
    temp:      fish.temp      || "Contact us",
    ph:        fish.ph        || "Contact us",
    tank:      fish.tank      || "Contact us",
    difficulty: "Ask Us",
    diet:      fish.diet      || "Contact us",
    lifespan:  fish.lifespan  || "Contact us",
    tankMates: fish.tankMates || "Contact us",
    breeding: "", idealFor: [], funFact: "",
    setupTips: [], compatibleWith: [], avoid: [],
    image: fish.imageUrl,
    gallery: [fish.imageUrl],
  };
}