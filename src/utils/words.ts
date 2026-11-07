import { WordItem, CategoryInfo } from '../types/game';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', name: 'All Categories', description: 'Curated mix across all topics', iconName: 'Sparkles' },
  { id: 'animals', name: 'Animals & Wildlife', description: 'Creatures of land, sea, and sky', iconName: 'PawPrint' },
  { id: 'movies', name: 'Cinema & TV', description: 'Classic films, blockbusters, and directors', iconName: 'Film' },
  { id: 'geography', name: 'World Geography', description: 'Countries, capitals, and natural wonders', iconName: 'Globe' },
  { id: 'science', name: 'Science & Cosmos', description: 'Astronomy, physics, biology, and chemistry', iconName: 'Atom' },
  { id: 'food', name: 'Food & Culinary', description: 'Dishes, spices, and gastronomic delights', iconName: 'Utensils' },
  { id: 'tech', name: 'Tech & Inventions', description: 'Computers, gadgets, and historic breakthroughs', iconName: 'Cpu' },
  { id: 'mythology', name: 'Mythology & Legends', description: 'Gods, monsters, and ancient epics', iconName: 'Shield' },
];

export const WORD_BANK: WordItem[] = [
  // Animals
  {
    id: 'a1',
    word: 'CHAMELEON',
    category: 'animals',
    hint: 'A reptile famous for changing color and having independently moving eyes.',
    trivia: 'Chameleons change color primarily to regulate temperature and communicate mood, not just camouflage!',
    difficulty: 'MEDIUM',
  },
  {
    id: 'a2',
    word: 'PLATYPUS',
    category: 'animals',
    hint: 'Semi-aquatic egg-laying mammal native to eastern Australia.',
    trivia: 'The platypus produces venom in spurs on the male hind limbs and uses electrolocation to hunt prey underwater.',
    difficulty: 'EASY',
  },
  {
    id: 'a3',
    word: 'PANGOLIN',
    category: 'animals',
    hint: 'Solitary mammal covered in large, protective keratin scales.',
    trivia: 'Pangolins are the only known mammals with large, keratin scales covering their skin and roll into a tight ball when threatened.',
    difficulty: 'HARD',
  },
  {
    id: 'a4',
    word: 'HUMMINGBIRD',
    category: 'animals',
    hint: 'Tiny avian creature able to fly backwards and hover mid-air.',
    trivia: 'Hummingbirds have the highest metabolism of any homeothermic animal, with heart rates exceeding 1,200 bpm.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'a5',
    word: 'NARWHAL',
    category: 'animals',
    hint: 'Arctic whale known as the unicorn of the sea due to its long spiral tusk.',
    trivia: 'The narwhal tusk is actually an elongated canine tooth that can grow up to 10 feet long and contains millions of sensory nerve endings.',
    difficulty: 'EASY',
  },
  {
    id: 'a6',
    word: 'AXOLOTL',
    category: 'animals',
    hint: 'Mexican salamander that retains its aquatic larval features into adulthood.',
    trivia: 'Axolotls can regenerate entire limbs, lungs, heart tissue, and portions of their brain without scarring.',
    difficulty: 'HARD',
  },
  {
    id: 'a7',
    word: 'GIRAFFE',
    category: 'animals',
    hint: 'Tallest living terrestrial animal with an extraordinarily long neck.',
    trivia: 'Despite their towering neck, giraffes have only 7 cervical vertebrae, the exact same number as humans!',
    difficulty: 'EASY',
  },
  {
    id: 'a8',
    word: 'JELLYFISH',
    category: 'animals',
    hint: 'Gelatinous aquatic creature that has roamed the seas for over 500 million years.',
    trivia: 'Jellyfish have neither a brain, blood, nor heart; their bodies consist of over 95% water.',
    difficulty: 'MEDIUM',
  },

  // Cinema & Movies
  {
    id: 'm1',
    word: 'INCEPTION',
    category: 'movies',
    hint: 'Christopher Nolan sci-fi heist movie involving dream architecture.',
    trivia: 'The film’s famous rotating hallway fight scene was shot using a massive custom 360-degree rotating centrifuge set.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'm2',
    word: 'CASABLANCA',
    category: 'movies',
    hint: '1942 classic romance starring Humphrey Bogart set in Morocco.',
    trivia: 'The famous line "Play it again, Sam" is never actually spoken in the movie; the real line is "Play it once, Sam."',
    difficulty: 'MEDIUM',
  },
  {
    id: 'm3',
    word: 'INTERSTELLAR',
    category: 'movies',
    hint: 'Space epic exploring wormholes, black holes, and relativistic time dilation.',
    trivia: 'The mathematical equations developed for Gargantua the black hole led to two published peer-reviewed astrophysics papers.',
    difficulty: 'HARD',
  },
  {
    id: 'm4',
    word: 'JURASSIC PARK',
    category: 'movies',
    hint: 'Spielberg blockbuster about a theme park with cloned prehistoric giants.',
    trivia: 'The terrifying roar of the T-Rex was created by sound designers mixing recordings of an elephant calf, tiger, and alligator.',
    difficulty: 'EASY',
  },
  {
    id: 'm5',
    word: 'PARASITE',
    category: 'movies',
    hint: 'Bong Joon-ho thriller that made history as the first foreign-language Best Picture Oscar winner.',
    trivia: 'The opulent modern house in Parasite was not a real home, but four completely custom-constructed open-air sound stages.',
    difficulty: 'EASY',
  },
  {
    id: 'm6',
    word: 'METROPOLIS',
    category: 'movies',
    hint: '1927 German expressionist masterpiece directed by Fritz Lang.',
    trivia: 'Metropolis pioneered the Schüfftan process, using mirrors to combine actors with miniature set models.',
    difficulty: 'HARD',
  },

  // World Geography
  {
    id: 'g1',
    word: 'MADAGASCAR',
    category: 'geography',
    hint: 'Island nation off the southeastern coast of Africa with unique biodiversity.',
    trivia: 'Over 90% of all wildlife species found on Madagascar are endemic and found nowhere else on Earth.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'g2',
    word: 'KILIMANJARO',
    category: 'geography',
    hint: 'Dormant volcano in Tanzania, the highest peak on the African continent.',
    trivia: 'Kilimanjaro features almost every type of ecological biome on Earth, from tropical rainforest to arctic glacier at the summit.',
    difficulty: 'HARD',
  },
  {
    id: 'g3',
    word: 'AMSTERDAM',
    category: 'geography',
    hint: 'European capital famous for its UNESCO canals and more bicycles than residents.',
    trivia: 'Amsterdam rests on more than 11 million wooden support poles driven deep into the swampy clay ground.',
    difficulty: 'EASY',
  },
  {
    id: 'g4',
    word: 'REYKJAVIK',
    category: 'geography',
    hint: 'World’s northernmost sovereign capital city, located in Iceland.',
    trivia: 'Reykjavik translates in Old Norse to "Smoky Bay", named by the first settler for geothermal steam rising from hot springs.',
    difficulty: 'HARD',
  },
  {
    id: 'g5',
    word: 'GALAPAGOS',
    category: 'geography',
    hint: 'Pacific archipelago whose wildlife inspired Charles Darwin’s theory of natural selection.',
    trivia: 'The islands are located at the confluence of three major ocean currents, creating a unique microclimate right on the equator.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'g6',
    word: 'EVEREST',
    category: 'geography',
    hint: 'Earth’s highest mountain above sea level, located in the Himalayas.',
    trivia: 'Tectonic plate movement pushes Mount Everest approximately 4 millimeters higher into the sky each year.',
    difficulty: 'EASY',
  },

  // Science & Cosmos
  {
    id: 's1',
    word: 'SUPERNOVA',
    category: 'science',
    hint: 'A powerful and luminous stellar explosion marking the death of a massive star.',
    trivia: 'A single supernova can briefly outshine an entire galaxy composed of hundreds of billions of stars.',
    difficulty: 'EASY',
  },
  {
    id: 's2',
    word: 'QUANTUM',
    category: 'science',
    hint: 'Branch of physics dealing with atomic and subatomic particles and superposition.',
    trivia: 'In quantum entanglement, particles remain linked so that actions performed on one instantaneously affect the other regardless of distance.',
    difficulty: 'MEDIUM',
  },
  {
    id: 's3',
    word: 'MITOCHONDRIA',
    category: 'science',
    hint: 'Cellular organelle universally known as the powerhouse of the cell.',
    trivia: 'Mitochondria possess their own distinct circular DNA, inherited almost exclusively from the maternal lineage.',
    difficulty: 'HARD',
  },
  {
    id: 's4',
    word: 'PHOTOSYNTHESIS',
    category: 'science',
    hint: 'Biological process converting light energy into chemical sugars.',
    trivia: 'Almost all the oxygen in Earth’s atmosphere was created by photosynthetic organisms over billions of years.',
    difficulty: 'HARD',
  },
  {
    id: 's5',
    word: 'TELESCOPE',
    category: 'science',
    hint: 'Optical instrument that gathers radiation to inspect distant cosmic bodies.',
    trivia: 'The James Webb Space Telescope operates at an astonishing -388°F (-233°C) protected by a tennis court-sized sunshield.',
    difficulty: 'EASY',
  },
  {
    id: 's6',
    word: 'EXOPLANET',
    category: 'science',
    hint: 'Any planet orbiting a star outside our own solar system.',
    trivia: 'Astronomers have confirmed over 5,500 exoplanets, including worlds where it literally rains molten iron or liquid glass.',
    difficulty: 'MEDIUM',
  },

  // Food & Culinary
  {
    id: 'f1',
    word: 'CROISSANT',
    category: 'food',
    hint: 'Buttery, flaky, crescent-shaped laminated French pastry.',
    trivia: 'Though a symbol of France, the crescent pastry actually originated in Vienna, Austria as the Kipferl.',
    difficulty: 'EASY',
  },
  {
    id: 'f2',
    word: 'GUACAMOLE',
    category: 'food',
    hint: 'Creamy avocado-based dip originating from Aztec civilization in Mexico.',
    trivia: 'The word guacamole comes from the Classical Nahuatl word āhuacamolli, meaning literally "avocado sauce".',
    difficulty: 'EASY',
  },
  {
    id: 'f3',
    word: 'SAFFRON',
    category: 'food',
    hint: 'Most expensive spice in the world, harvested by hand from crocus flowers.',
    trivia: 'It takes roughly 75,000 crocus flowers to produce just one single pound of culinary saffron spice.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'f4',
    word: 'TIRAMISU',
    category: 'food',
    hint: 'Italian coffee-flavoured dessert layered with ladyfingers and mascarpone.',
    trivia: 'Tiramisu translates from Italian to "pick me up" or "cheer me up", referencing the caffeine and sugar rush.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'f5',
    word: 'SOURDOUGH',
    category: 'food',
    hint: 'Bread fermented naturally using wild lactic acid bacteria and yeasts.',
    trivia: 'Some artisanal sourdough starter cultures have been kept alive and active continuously for over 120 years!',
    difficulty: 'HARD',
  },
  {
    id: 'f6',
    word: 'WASABI',
    category: 'food',
    hint: 'Pungent green Japanese plant whose rhizome is grated with sushi.',
    trivia: 'Most commercial wasabi served globally is actually dyed horseradish and mustard, as real wasabi is difficult to cultivate.',
    difficulty: 'EASY',
  },

  // Technology & Inventions
  {
    id: 't1',
    word: 'ALGORITHM',
    category: 'tech',
    hint: 'Step-by-step set of mathematical rules to solve a computational problem.',
    trivia: 'The term derives from 9th-century Persian mathematician Muhammad ibn Musa al-Khwarizmi, pioneer of algebra.',
    difficulty: 'MEDIUM',
  },
  {
    id: 't2',
    word: 'MICROCHIP',
    category: 'tech',
    hint: 'Miniature semiconductor wafer containing billions of microscopic transistors.',
    trivia: 'Modern microchip lithography uses extreme ultraviolet light with mirrors polished to atomic-level smoothness.',
    difficulty: 'EASY',
  },
  {
    id: 't3',
    word: 'SATELLITE',
    category: 'tech',
    hint: 'Artificial object placed deliberately into orbit to transmit data or weather telemetry.',
    trivia: 'Sputnik 1 was launched in 1957; today, over 9,000 active satellites orbit the planet providing GPS and communications.',
    difficulty: 'EASY',
  },
  {
    id: 't4',
    word: 'CRYPTOGRAPHY',
    category: 'tech',
    hint: 'The practice and study of secure data transmission and encryption protocols.',
    trivia: 'The ancient Spartans used a scytale—a cylinder tool wrapped in parchment ribbon—for military transposition ciphers.',
    difficulty: 'HARD',
  },
  {
    id: 't5',
    word: 'FIBER OPTIC',
    category: 'tech',
    hint: 'Flexible glass or silica strands that transmit information as pulses of light.',
    trivia: 'Submarine fiber optic cables laid across oceans carry over 99% of all international internet data traffic.',
    difficulty: 'MEDIUM',
  },
  {
    id: 't6',
    word: 'CYBERSECURITY',
    category: 'tech',
    hint: 'Protection of computer systems and networks from digital intrusion.',
    trivia: 'The very first computer bug was an actual physical moth trapped in a relay of the Harvard Mark II computer in 1947.',
    difficulty: 'HARD',
  },

  // Mythology & Legends
  {
    id: 'my1',
    word: 'MINOTAUR',
    category: 'mythology',
    hint: 'Mythical creature with the head of a bull and the body of a man, kept in a labyrinth.',
    trivia: 'According to Greek myth, Athenian hero Theseus navigated the Cretan labyrinth using a spool of golden thread given by Ariadne.',
    difficulty: 'MEDIUM',
  },
  {
    id: 'my2',
    word: 'VALKYRIE',
    category: 'mythology',
    hint: 'Norse mythological maidens who choose those who die in battle and lead them to Valhalla.',
    trivia: 'In Old Norse poetry, Valkyries were depicted riding through clouds and aurora borealis, weaving the fate of warriors.',
    difficulty: 'HARD',
  },
  {
    id: 'my3',
    word: 'PROMETHEUS',
    category: 'mythology',
    hint: 'Titan who defied the gods by stealing fire and bestowing it to humanity.',
    trivia: 'As punishment, Zeus chained Prometheus to Mount Caucasus, where an eagle ate his regenerating liver every day.',
    difficulty: 'HARD',
  },
  {
    id: 'my4',
    word: 'PEGASUS',
    category: 'mythology',
    hint: 'Pure white winged divine stallion sired by Poseidon in Greek lore.',
    trivia: 'Every time Pegasus struck his hoof against Mount Helicon, sacred springs of poetic inspiration gushed forth.',
    difficulty: 'EASY',
  },
  {
    id: 'my5',
    word: 'EXCALIBUR',
    category: 'mythology',
    hint: 'Legendary sword of King Arthur attributed with magical powers and sovereignty.',
    trivia: 'In earlier Arthurian romances, the sword was called Caliburn, derived from the Old Welsh Caledfwlch meaning "hard breach".',
    difficulty: 'MEDIUM',
  },
];

export function getRandomWord(category: string = 'all', difficulty?: 'EASY' | 'MEDIUM' | 'HARD'): WordItem {
  let pool = WORD_BANK;
  if (category && category !== 'all') {
    pool = pool.filter((w) => w.category === category);
  }
  if (difficulty) {
    const diffPool = pool.filter((w) => w.difficulty === difficulty);
    if (diffPool.length > 0) {
      pool = diffPool;
    }
  }
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

export function cleanLetter(char: string): string {
  return char.toUpperCase();
}

export function isLetter(char: string): boolean {
  return /^[a-zA-Z]$/.test(char);
}
