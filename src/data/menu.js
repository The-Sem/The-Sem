// Simplified menu data for The Sem.
// Signature cocktails get full cards (image, description, taste tags).
// Classic cocktails are listed by name only — same flat price, customizable.
// Snacks are the fusion small-plates menu.

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

export const COCKTAIL_PRICE = 419

export const SIGNATURE_COCKTAILS = [
  {
    id: 'zesty-ex',
    name: 'The Zesty Ex',
    image: img('1551538827-9c037cb4f32a'),
    description:
      'Bourbon whiskey, citrus cordial, cinnamon tincture, and a Darjeeling tea foam.',
    tasteTags: ['Citrusy', 'Bold'],
  },
  {
    id: 'salty-sassy',
    name: 'Salty & Sassy',
    image: img('1514362545857-3bc16c4c7d1b'),
    description:
      'Tequila and mango, spiced salt, pickled mango, honey cordial, and clarified milk.',
    tasteTags: ['Spicy', 'Sweet'],
  },
  {
    id: 'bitter-truth',
    name: 'Bitter Truth',
    image: img('1470337458703-46ad1756a187'),
    description:
      'Gin, a citrus oil drop, spiced vermouth, bittergourd tincture, and stoneflower vermouth.',
    tasteTags: ['Bitter', 'Herbal'],
  },
  {
    id: 'sugar-rush',
    name: 'Sugar Rush',
    image: img('1578664182399-5e88a5e1e8b1'),
    description: 'Vodka, waffer, cold brew, cream, and chocolate syrup.',
    tasteTags: ['Sweet', 'Creamy'],
  },
  {
    id: 'secret-flavour',
    name: 'Secret Flavour',
    image: img('1551024506-0bccd828d307'),
    description:
      'White rum, tomato & chilli, saline, citrus honey, and coriander, finished with a crunchy garnish.',
    tasteTags: ['Spicy', 'Umami', 'Citrusy'],
  },
]

export const CLASSIC_COCKTAILS = [
  'Old Fashioned',
  'Margarita',
  'Mojito',
  'Negroni',
  'Cosmopolitan',
  'Moscow Mule',
  'Espresso Martini',
  'Whisky Sour',
  "Dark 'n' Stormy",
  'Mai Tai',
  'Daiquiri',
  'Piña Colada',
  'Paloma',
  'Tequila Sunrise',
]

export const SNACKS = [
  {
    id: 'onion-saag-fritters',
    name: 'Onion & Saag Fritters',
    description:
      'Onion and saag fritter tossed with chaat masala, served with three different chutneys and a beet tuile.',
    image: img('1632778149955-e80f8ceca2e8'),
  },
  {
    id: 'soft-pocket',
    name: 'Soft Pocket',
    description:
      'House-made soft steamed bun, dalle spread, spiced potato wedges or spiced chicken, pickled cucumber and coleslaw.',
    image: img('1568901346375-23c9450c58cd'),
  },
  {
    id: 'mirchi-paneer',
    name: 'Mirchi Paneer',
    description: 'Peanut and coriander marinated paneer, bell pepper, onion, and tamarind chutney.',
    image: img('1631452180519-c014fe946bc7'),
  },
  {
    id: 'potato-poopers',
    name: 'Potato Poopers',
    description: 'Crispy potato cheeseball, tomato sauce, The Sem spice blend, mayo and ketchup.',
    image: img('1573080496219-bb080dd4f877'),
  },
  {
    id: 'finger-chicken',
    name: 'Finger Chicken',
    description:
      'Crispy marinated chicken fried golden, dusted with in-house masala, served with beetroot radish and mayo dip.',
    image: img('1562967914-608f82629710'),
  },
  {
    id: 'pickled-pork-trotters',
    name: 'Pickled Pork Trotters',
    description: 'Spiced pork trotters in Nepali-style pickle spices — spicy and soulful.',
    image: img('1544025162-d76694265947'),
  },
  {
    id: 'pork-guma',
    name: 'Pork Guma',
    description: 'Stir-fried traditional pork sausage seasoned with Himalayan spice.',
    image: img('1544025162-d76694265947'),
  },
  {
    id: 'empanadas',
    name: 'Empanadas',
    description: 'Crispy rolls filled with juicy pork, sour cream, salsa, and fresh churpi.',
    image: img('1551782450-a2132b4ba21d'),
  },
  {
    id: 'bhutuwa',
    name: 'Bhutuwa',
    description:
      'Offal cooked in a rich, authentic spice blend, served with a steamed bun on the side. Mutton or chicken.',
    image: img('1606728035253-49e8a23146de'),
  },
  {
    id: 'momo',
    name: 'Momo',
    description:
      'Juicy traditional steamed momo, tomato chutney, mula ko achar. Paneer, chicken, or pork.',
    image: img('1496116218417-1a781b1c416c'),
  },
  {
    id: 'pasta',
    name: 'Pasta',
    description: 'Red sauce, pink sauce, or white sauce.',
    image: img('1551183053-bf91a1d81141'),
  },
  {
    id: 'sems-thentuk',
    name: "Sem's Thentuk",
    description:
      'Handmade beetroot noodles in a warm broth with saag, carrot, radish, chicken chunks, and chilli-garlic.',
    image: img('1569718212165-3a8278d5f624'),
  },
  {
    id: 'jeera-rice',
    name: 'Jeera Rice',
    description: 'Aromatic basmati rice with toasted cumin seeds and fresh cilantro.',
    image: img('1596797038530-2c107229654b'),
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    description: 'Rice tossed with veggies or chicken, topped with a sunny side up. Veg or chicken.',
    image: img('1603133872878-684f208fb84b'),
  },
]
