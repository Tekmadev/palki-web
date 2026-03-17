export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra-hot';
export type DietTag = 'veg' | 'non-veg' | 'vegan' | 'gf';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  tags: DietTag[];
  spiceLevel?: SpiceLevel;
  featured?: boolean;
  allergens?: string[];
}

export type MenuCategory =
  | 'appetizers'
  | 'mains'
  | 'breads'
  | 'rice-biryani'
  | 'desserts'
  | 'drinks';

export interface MenuCategoryMeta {
  id: MenuCategory;
  label: string;
  icon: string;
}

export const menuCategories: MenuCategoryMeta[] = [
  { id: 'appetizers', label: 'Appetizers', icon: '🌿' },
  { id: 'mains', label: 'Mains', icon: '🍛' },
  { id: 'breads', label: 'Breads', icon: '🫓' },
  { id: 'rice-biryani', label: 'Rice & Biryani', icon: '🍚' },
  { id: 'desserts', label: 'Desserts', icon: '🍮' },
  { id: 'drinks', label: 'Drinks', icon: '🥤' },
];

export const menuItems: MenuItem[] = [
  // APPETIZERS
  {
    id: 'a1',
    name: 'Samosa (2 pcs)',
    description: 'Crispy golden pastry filled with spiced potatoes and peas, served with mint chutney and tamarind sauce.',
    price: 8.95,
    category: 'appetizers',
    tags: ['veg', 'vegan'],
    spiceLevel: 'mild',
    featured: true,
  },
  {
    id: 'a2',
    name: 'Chicken Tikka',
    description: 'Tender chicken marinated in yogurt and aromatic spices, char-grilled to perfection in our tandoor oven.',
    price: 17.95,
    category: 'appetizers',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'medium',
    featured: true,
  },
  {
    id: 'a3',
    name: 'Paneer Tikka',
    description: 'Cubes of cottage cheese marinated in vibrant spices and grilled with bell peppers and onions.',
    price: 15.95,
    category: 'appetizers',
    tags: ['veg', 'gf'],
    spiceLevel: 'medium',
  },
  {
    id: 'a4',
    name: 'Seekh Kebab',
    description: 'Minced lamb blended with herbs and spices, skewered and cooked in the tandoor. Served with raita.',
    price: 18.95,
    category: 'appetizers',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'medium',
  },
  {
    id: 'a5',
    name: 'Aloo Tikki Chaat',
    description: 'Spiced potato patties topped with chickpeas, yogurt, tamarind chutney, and fresh coriander.',
    price: 12.95,
    category: 'appetizers',
    tags: ['veg'],
    spiceLevel: 'mild',
  },
  {
    id: 'a6',
    name: 'Papadums & Chutneys',
    description: 'Crispy lentil wafers served with our house-made trio of chutneys — mint, tamarind, and mango.',
    price: 5.95,
    category: 'appetizers',
    tags: ['veg', 'vegan', 'gf'],
    spiceLevel: 'mild',
  },

  // MAINS
  {
    id: 'm1',
    name: 'Butter Chicken',
    description: 'Our signature dish. Tender chicken in a velvety tomato-cream sauce, slow-cooked with butter and aromatic spices.',
    price: 22.95,
    category: 'mains',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'mild',
    featured: true,
  },
  {
    id: 'm2',
    name: 'Lamb Rogan Josh',
    description: 'Slow-braised Kashmiri lamb in a deeply aromatic sauce of whole spices, saffron, and dried chillies.',
    price: 26.95,
    category: 'mains',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'medium',
    featured: true,
  },
  {
    id: 'm3',
    name: 'Palak Paneer',
    description: 'Fresh cottage cheese nestled in a silky, spiced spinach gravy. A timeless vegetarian classic.',
    price: 19.95,
    category: 'mains',
    tags: ['veg', 'gf'],
    spiceLevel: 'mild',
  },
  {
    id: 'm4',
    name: 'Chicken Vindaloo',
    description: 'A fiery Goan classic — chicken in a bold, tangy sauce of vinegar, garlic, and hot chillies. Not for the faint-hearted.',
    price: 23.95,
    category: 'mains',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'extra-hot',
  },
  {
    id: 'm5',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked overnight with butter, cream, and tomatoes. The ultimate comfort dish.',
    price: 18.95,
    category: 'mains',
    tags: ['veg', 'gf'],
    spiceLevel: 'mild',
  },
  {
    id: 'm6',
    name: 'Prawn Masala',
    description: 'Jumbo prawns cooked in a robust, aromatic masala of tomatoes, onions, and coastal spices.',
    price: 27.95,
    category: 'mains',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'hot',
  },
  {
    id: 'm7',
    name: 'Chana Masala',
    description: 'Hearty chickpeas in a bold, tangy sauce of tomatoes, chillies, and an aromatic blend of whole spices.',
    price: 17.95,
    category: 'mains',
    tags: ['veg', 'vegan', 'gf'],
    spiceLevel: 'medium',
  },
  {
    id: 'm8',
    name: 'Chicken Tikka Masala',
    description: 'Char-grilled chicken tikka simmered in a rich, creamy tomato masala. A Canadian favourite reimagined.',
    price: 23.95,
    category: 'mains',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'medium',
    featured: true,
  },

  // BREADS
  {
    id: 'b1',
    name: 'Garlic Naan',
    description: 'Tandoor-baked leavened bread brushed with garlic-infused butter and fresh coriander.',
    price: 4.95,
    category: 'breads',
    tags: ['veg'],
    spiceLevel: 'mild',
  },
  {
    id: 'b2',
    name: 'Butter Naan',
    description: 'Classic tandoor-baked naan brushed with golden butter. Light, fluffy, and irresistible.',
    price: 3.95,
    category: 'breads',
    tags: ['veg'],
  },
  {
    id: 'b3',
    name: 'Peshwari Naan',
    description: 'Sweet naan stuffed with coconut, almonds, and raisins. A delightful contrast to spiced curries.',
    price: 5.95,
    category: 'breads',
    tags: ['veg'],
  },
  {
    id: 'b4',
    name: 'Paratha',
    description: 'Whole wheat flatbread layered with butter, cooked on a griddle to golden perfection.',
    price: 4.50,
    category: 'breads',
    tags: ['veg'],
  },
  {
    id: 'b5',
    name: 'Keema Naan',
    description: 'Naan stuffed with spiced minced lamb, baked in the tandoor. A meal in itself.',
    price: 7.95,
    category: 'breads',
    tags: ['non-veg'],
    spiceLevel: 'medium',
  },

  // RICE & BIRYANI
  {
    id: 'r1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice layered with saffron-marinated chicken and fried onions, slow-cooked dum style.',
    price: 24.95,
    category: 'rice-biryani',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'medium',
    featured: true,
  },
  {
    id: 'r2',
    name: 'Lamb Biryani',
    description: 'Tender lamb pieces slow-cooked with aged basmati rice, saffron, and royal whole spices.',
    price: 27.95,
    category: 'rice-biryani',
    tags: ['non-veg', 'gf'],
    spiceLevel: 'medium',
  },
  {
    id: 'r3',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with seasonal vegetables, nuts, and exotic spices.',
    price: 19.95,
    category: 'rice-biryani',
    tags: ['veg', 'vegan', 'gf'],
    spiceLevel: 'mild',
  },
  {
    id: 'r4',
    name: 'Steamed Basmati Rice',
    description: 'Perfectly cooked long-grain basmati rice. Light, fragrant, and the ideal accompaniment.',
    price: 4.95,
    category: 'rice-biryani',
    tags: ['veg', 'vegan', 'gf'],
  },

  // DESSERTS
  {
    id: 'd1',
    name: 'Gulab Jamun',
    description: 'Soft milk-solid dumplings soaked in rose and cardamom-scented sugar syrup. Served warm.',
    price: 7.95,
    category: 'desserts',
    tags: ['veg'],
  },
  {
    id: 'd2',
    name: 'Mango Kulfi',
    description: 'Traditional Indian ice cream infused with ripe Alphonso mangoes. Dense, creamy, and intensely flavoured.',
    price: 8.95,
    category: 'desserts',
    tags: ['veg', 'gf'],
    featured: true,
  },
  {
    id: 'd3',
    name: 'Kheer',
    description: 'Slow-cooked rice pudding with whole milk, cardamom, saffron, and toasted pistachios.',
    price: 8.95,
    category: 'desserts',
    tags: ['veg', 'gf'],
  },
  {
    id: 'd4',
    name: 'Ras Malai',
    description: 'Delicate cottage cheese dumplings floating in chilled cardamom-and-saffron-scented cream.',
    price: 9.95,
    category: 'desserts',
    tags: ['veg', 'gf'],
  },

  // DRINKS
  {
    id: 'dr1',
    name: 'Mango Lassi',
    description: 'Chilled blend of fresh Alphonso mango, yogurt, and a hint of cardamom. Refreshing and vibrant.',
    price: 6.95,
    category: 'drinks',
    tags: ['veg', 'gf'],
  },
  {
    id: 'dr2',
    name: 'Rose Lassi',
    description: 'Creamy yogurt drink with rose water, topped with crushed pistachios. Floral and cooling.',
    price: 6.95,
    category: 'drinks',
    tags: ['veg', 'gf'],
  },
  {
    id: 'dr3',
    name: 'Masala Chai',
    description: 'Hand-brewed spiced tea with ginger, cardamom, cinnamon, and whole milk. A classic ritual.',
    price: 4.50,
    category: 'drinks',
    tags: ['veg', 'gf'],
  },
  {
    id: 'dr4',
    name: 'Fresh Lime Soda',
    description: 'Freshly squeezed lime with sparkling water, served sweet, salty, or mixed.',
    price: 4.95,
    category: 'drinks',
    tags: ['veg', 'vegan', 'gf'],
  },
];
