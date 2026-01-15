// TODO use same case format through out

export interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export interface Chef {
  id: number;
  chefName: string;
  chefDescription?: string;
  chefImage?: string;
  chefImageBanner?: string;
  chefPortrait?: string;
  chefQuote?: string;
  recipeCount?: number;
  createdAt: string;
  updatedAt: string;
  dangerLevel?: string;
}

export interface ChefResponse {
  chefs: Chef[];
  total: number;
  skip: number;
  limit: number;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  // Optional fields
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  servings?: number;
  subTitle?: string;
  mealType?: string[];
  cuisine?: string;
  caloriesPerServing?: number;
  heroImg?: string;
  productImg?: string;
  imageBanner?: string;
  imageLogo?: string;
  imageCover?: string;
  imagePopup?: string;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  price?: number;
  chefId?: number;
  dangerLevel?: string;
}

// Define the interface for Product
export interface Product {
  id: number;
  sku: number;
  name: string;
  brand?: string;
  type: string;
  weight: string;
  price: string | number;
  regular_price: string | number;
  sale_price: string | number;
  on_sale: boolean;
  stock_quantity: number | null;
  stock_status: number | null;
  stock: number | null;
  qty: number | null;
  categories: { id: string; name: string }[]; // Update categories to be an array of objects with id and name
  tags: { id: string; name: string }[]; // Update tags to be an array of objects with id and name
  description: string;
  short_description: string;
  images: ProductImage[];
  attributes?: ProductAttribute[];
  acf?: {
    // Images
    card_cover: string;
    card_title: string;
    card_popup: string;
    card_recipe: string;
    // Recipe fields
    prep_time?: string;
    cook_time?: string;
    difficulty?: string;
    serves?: string;
    calories?: string;
    cuisine_type?: string;
    instructions?: { ins1?: string };
    ingredients?: { ing1?: string };
    chef_comment?: string; // Add chef_comment property
  };
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
  name?: string;
  description?: string;
  caption?: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

// Define the interface for the response when adding an item to the cart
export interface CartResponse {
  success: boolean;
  cart_key: string;
  items: CartItem[];
  totals: CartTotals;
  total_price: number;
}

// Define the interface for CartItem
export interface CartItem {
  product_id: number;
  name: string;
  quantity: number | string;
  price: string | number;
  image?: string;
  totals: {
    subtotal: string | number;
    subtotal_tax: number;
    total: number;
    tax: number;
  };
}

export interface CartTotals {
  total: number | string;
}

export interface Error {
  statusCode: number;
  message?: string;
}
