export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  source: 'google' | 'tripadvisor';
  eventType?: 'dine-in' | 'banquet' | 'takeout';
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 5,
    text: 'Absolutely divine! The Lamb Rogan Josh transported me straight to Kashmir. The ambiance is stunning—warm, intimate, and incredibly elegant. Palki has become our family\'s go-to for every special occasion.',
    date: '2 weeks ago',
    source: 'google',
    eventType: 'dine-in',
  },
  {
    id: 't2',
    name: 'Michael Thompson',
    avatar: 'MT',
    rating: 5,
    text: 'We hosted our daughter\'s wedding reception in the banquet hall and it was flawless. The staff was attentive, the food was exceptional, and every detail was taken care of. Our 120 guests were raving about it for weeks.',
    date: '1 month ago',
    source: 'google',
    eventType: 'banquet',
  },
  {
    id: 't3',
    name: 'Sophie Tremblay',
    avatar: 'ST',
    rating: 5,
    text: 'The best Indian food in Ottawa, hands down. The Butter Chicken is unreal — so creamy and rich. The Mango Kulfi for dessert was the perfect ending. Service was warm and very knowledgeable about the menu.',
    date: '3 weeks ago',
    source: 'google',
    eventType: 'dine-in',
  },
  {
    id: 't4',
    name: 'Rajesh Patel',
    avatar: 'RP',
    rating: 5,
    text: 'As someone who grew up eating authentic Indian food, I was skeptical, but Palki exceeded every expectation. The spice balance, the freshness — it\'s as close to home cooking as you can get in a fine dining setting.',
    date: '1 week ago',
    source: 'google',
    eventType: 'dine-in',
  },
  {
    id: 't5',
    name: 'Jennifer & David Liu',
    avatar: 'JL',
    rating: 5,
    text: 'Our company\'s annual gala was hosted at Palki and it was a resounding success. The banquet team handled everything professionally. The food stations were incredible — guests loved the live tandoor experience.',
    date: '2 months ago',
    source: 'google',
    eventType: 'banquet',
  },
  {
    id: 't6',
    name: 'Fatima Al-Hassan',
    avatar: 'FA',
    rating: 5,
    text: 'I celebrated my birthday here last month and it was a magical evening. The décor, the candlelight, the staff who brought out a personalized dessert — I felt so special. Palki knows how to create moments.',
    date: '3 weeks ago',
    source: 'google',
    eventType: 'dine-in',
  },
  {
    id: 't7',
    name: 'Carlos Mendoza',
    avatar: 'CM',
    rating: 5,
    text: 'Never tried Indian food before and a colleague convinced me. The naan alone was worth the trip! The server patiently walked me through the menu and suggested a perfect tasting journey. Will be back very soon.',
    date: '5 days ago',
    source: 'google',
    eventType: 'dine-in',
  },
  {
    id: 't8',
    name: 'Anika Johansson',
    avatar: 'AJ',
    rating: 5,
    text: 'Palki set the bar impossibly high. From the moment you walk in, the warm lighting and the aroma of the spices sets the tone. The Chicken Biryani was a revelation — fragrant, tender, perfectly spiced.',
    date: '2 weeks ago',
    source: 'google',
    eventType: 'dine-in',
  },
];
