// Simplified menu data for The Sem.
// Signature cocktails get full cards (image, description, taste tags).
// Classic cocktails are listed by name only — same flat price, customizable.
// Snacks are the fusion small-plates menu, now using real dish photos.

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

const snackImg = (filename) => `/images/snacks/${filename}`
const cocktailImg = (filename) => `/images/cocktails/${filename}`

export const COCKTAIL_PRICE = 419

export const SIGNATURE_COCKTAILS = [
  {
    id: 'zesty-ex',
    name: 'The Zesty Ex',
    image: cocktailImg('zesty-ex.png'),
    description:
      'Bourbon whiskey, citrus cordial, cinnamon tincture, and a Darjeeling tea foam.',
    tasteTags: ['Citrusy', 'Bold'],
  },
  {
    id: 'salty-sassy',
    name: 'Salty & Sassy',
    image: cocktailImg('salty-sassy.png'),
    description:
      'Tequila and mango, spiced salt, pickled mango, honey cordial, and clarified milk.',
    tasteTags: ['Spicy', 'Sweet'],
  },
  {
    id: 'bitter-truth',
    name: 'Bitter Truth',
    image: cocktailImg('bitter-truth.png'),
    description:
      'Gin, a citrus oil drop, spiced vermouth, bittergourd tincture, and stoneflower vermouth.',
    tasteTags: ['Bitter', 'Herbal'],
  },
  {
    id: 'sugar-rush',
    name: 'Sugar Rush',
    image: cocktailImg('sugar-rush.png'),
    description: 'Vodka, waffer, cold brew, cream, and chocolate syrup.',
    tasteTags: ['Sweet', 'Creamy'],
  },
  {
    id: 'secret-flavour',
    name: 'Secret Flavour',
    image: cocktailImg('secret-flavour.png'),
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
    id: 'chicken-wings',
    name: 'Chicken Wings',
    description:
      'Crispy fried chicken wings glazed in a rich, sticky chilli-soy sauce, topped with sesame seeds — bold, saucy, and impossible to stop at one.',
    image: snackImg('chicken-wings.png'),
  },
  {
    id: 'potato-wedges',
    name: 'Potato Wedges',
    description:
      'Thick-cut golden potato wedges seasoned with The Sem spice blend, served with a smoky chipotle dip.',
    image: img('1630384060520-56a98a31cb56'),
  },
  {
    id: 'dry-ramen-bowl',
    name: 'Dry Ramen Bowl',
    description:
      'Springy ramen noodles tossed in a bold chilli-garlic sauce, topped with two chicken lollipops and a sunny-side-up egg.',
    image: img('1569718212165-3a8278d5f624'),
  },
  {
    id: 'onion-saag-fritters',
    name: 'Onion & Saag Fritters',
    description:
      'Onion and saag fritter tossed with chaat masala, served with three different chutneys and a beet tuile.',
    image: snackImg('onion-saag-fritters.jpg'),
  },
  {
    id: 'soft-pocket',
    name: 'Soft Pocket',
    description:
      'House-made soft steamed bun, dalle spread, spiced potato wedges or spiced chicken, pickled cucumber and coleslaw.',
    image: snackImg('soft-pocket.jpg'),
  },
  {
    id: 'mirchi-paneer',
    name: 'Mirchi Paneer',
    description: 'Peanut and coriander marinated paneer, bell pepper, onion, and tamarind chutney.',
    image: snackImg('mirchi-paneer.jpg'),
  },
  {
    id: 'potato-poopers',
    name: 'Potato Poopers',
    description: 'Crispy potato cheeseball, tomato sauce, The Sem spice blend, mayo and ketchup.',
    image: snackImg('potato-poopers.jpg'),
  },
  {
    id: 'finger-chicken',
    name: 'Finger Chicken',
    description:
      'Crispy marinated chicken fried golden, dusted with in-house masala, served with beetroot radish and mayo dip.',
    image: snackImg('finger-chicken.jpg'),
  },
  {
    id: 'pickled-pork-trotters',
    name: 'Pickled Pork Trotters',
    description: 'Spiced pork trotters in Nepali-style pickle spices — spicy and soulful.',
    image: snackImg('pickled-pork-trotters.jpg'),
  },
  {
    id: 'pork-guma',
    name: 'Pork Guma',
    description: 'Stir-fried traditional pork sausage seasoned with Himalayan spice.',
    image: snackImg('pork-guma.jpg'),
  },
  {
    id: 'empanadas',
    name: 'Empanadas',
    description: 'Crispy rolls filled with juicy pork, sour cream, salsa, and fresh churpi.',
    image: snackImg('empanadas.jpg'),
  },
  {
    id: 'bhutuwa',
    name: 'Bhutuwa',
    description:
      'Offal cooked in a rich, authentic spice blend, served with a steamed bun on the side. Mutton or chicken.',
    image: snackImg('bhutuwa.jpg'),
  },
  {
    id: 'momo',
    name: 'Momo',
    description:
      'Juicy traditional steamed momo, tomato chutney, mula ko achar. Paneer, chicken, or pork.',
    image: snackImg('momo.jpg'),
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
    image: snackImg('jeera-rice.jpg'),
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    description: 'Rice tossed with veggies or chicken, topped with a sunny side up. Veg or chicken.',
    image: snackImg('fried-rice.jpg'),
  },
]
