import { LoveStoryConfig } from '../types';

export const defaultStory: LoveStoryConfig = {
  recipientName: 'Sophia',
  partnerName: 'Julian & Everyone Who Adores You',
  birthdayTitle: 'A Magical Birthday Celebration for Sophia',
  relationshipStartDate: '2001-08-15',
  birthdayDate: '2026-08-15',
  birthdayAge: 25,
  heroMessage: 'Today we celebrate the remarkable spirit, radiant laughter, and genuine warmth you bring into every room. Step into your interactive birthday journey!',
  loveLetterTitle: 'A Birthday Wish From the Heart',
  loveLetterContent: [
    "From the moment you step into any room, your gentle grace and infectious energy transform ordinary days into extraordinary memories. You possess that rare, magical gift of making everyone feel instantly cherished.",
    "On your special day, we celebrate all the quiet kindnesses, the spontaneous fits of giggles, your big courageous dreams, and the boundless light you radiate everywhere you go.",
    "May this new year around the sun bring you endless opportunities, vibrant health, starlit adventures, and laughter that echoes long into the night. Happy Birthday, Sophia!",
    "With unending love, admiration, and warmest wishes,"
  ],
  grandFinaleTitle: 'May All Your Birthday Dreams Come True!',
  grandFinaleMessage: 'Thank you for being the brightest light in our world. Here is to another chapter filled with golden horizons, boundless joy, and unforgettable celebrations!',
  photos: [
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
      caption: 'Sparklers & Celebration Glow',
      date: 'Midnight Birthday Countdown',
      location: 'Celebration Rooftop',
      rotation: -5,
      note: 'The sparklers lit up the night, but your bright smile shone brighter than any star.',
      tag: 'Sparkles & Joy'
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80',
      caption: 'Warm Laughter & Sweet Treats',
      date: 'Sunday Afternoon Tea',
      location: 'Garden Greenhouse',
      rotation: 4,
      note: 'When you laughed so hard over the strawberry cake that everyone couldn’t help but laugh along.',
      tag: 'Pure Laughter'
    },
    {
      id: 'p3',
      url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80',
      caption: 'Cake & Midnight Wishes',
      date: 'Golden Candle Light',
      location: 'Home Sweet Home',
      rotation: -3,
      note: 'Watching you close your eyes and make a wish with that soft, hopeful smile.',
      tag: 'Birthday Wish'
    },
    {
      id: 'p4',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Floating Balloons & Sunshine',
      date: 'Summer Garden Party',
      location: 'Botanical Sanctuary',
      rotation: 6,
      note: 'Surrounded by pastel balloons and blooming flowers—a day of pure magic.',
      tag: 'Celebration'
    },
    {
      id: 'p5',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
      caption: 'Starlit Fireworks Spectacle',
      date: 'Evening Festival',
      location: 'Coastal Pier',
      rotation: -4,
      note: 'Dancing under golden sparkler lights as music echoed across the water.',
      tag: 'Golden Night'
    },
    {
      id: 'p6',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80',
      caption: 'Golden Hour Adventures',
      date: 'Sunset Coastal Drive',
      location: 'Ocean Lookout',
      rotation: 3,
      note: 'Windows down, sea breeze in your hair, chasing the sunset with endless smiles.',
      tag: 'Wanderlust'
    }
  ],
  timeline: [
    {
      id: 't1',
      date: 'Chapter 01 • The Beginning',
      title: 'A Radiant Star Arrives',
      subtitle: 'Where Your Inspiring Journey Began',
      description: 'From your earliest days, you brought an undeniable spark of curiosity, warmth, and artistic wonder into the world.',
      photoUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
      location: 'The First Chapter',
      quote: '"Some people don’t just walk into a room—they illuminate it with their soul."',
      chapterNumber: 1
    },
    {
      id: 't2',
      date: 'Chapter 02 • Growth & Adventures',
      title: 'Chasing Big Dreams',
      subtitle: 'Unforgettable Journeys & Bold Triumphs',
      description: 'Taking on new challenges with fearless enthusiasm, traveling to new horizons, and inspiring everyone around you.',
      photoUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
      location: 'Exploring the World',
      quote: '"Your courage and enthusiasm make every obstacle turn into a beautiful stepping stone."',
      chapterNumber: 2
    },
    {
      id: 't3',
      date: 'Chapter 03 • Kindness & Magic',
      title: 'Spreading Light & Joy',
      subtitle: 'Precious Moments & Heartfelt Connections',
      description: 'Building lifelong friendships, sharing deep belly laughs over coffee, and always being a beacon of genuine empathy.',
      photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      location: 'Surrounded by Love',
      quote: '"The highest art is the art of giving joy to others—and you are a master of it."',
      chapterNumber: 3
    },
    {
      id: 't4',
      date: 'Chapter 04 • Today’s Milestone',
      title: 'The Grand Celebration',
      subtitle: 'Welcoming Another Golden Year',
      description: 'Today we pause to toast to your incredible past, honor who you are today, and cheer for all the brilliant tomorrows waiting for you.',
      photoUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80',
      location: 'Here & Now',
      quote: '"May your new year be overflowing with wonder, unbounded joy, and magic!"',
      chapterNumber: 4
    }
  ],
  reasons: [
    { id: 1, text: 'Your infectious laugh that instantly makes any bad day feel 100x lighter.', category: 'joy' },
    { id: 2, text: 'The way you notice and appreciate small beauty—like morning sunlight or blooming flowers.', category: 'sparkle' },
    { id: 3, text: 'Your genuine kindness and how you make every single person feel valued.', category: 'kindness' },
    { id: 4, text: 'Your big, bold dreams that inspire everyone around you to aim higher.', category: 'dreams' },
    { id: 5, text: 'The spontaneous dance moves you bust out when your favorite song plays.', category: 'joy' },
    { id: 6, text: 'Your calm wisdom when giving gentle advice to friends in need.', category: 'kindness' },
    { id: 7, text: 'How you put 100% of your heart into every creative project you touch.', category: 'sparkle' },
    { id: 8, text: 'Your unmatched talent for turning quiet Sunday afternoons into unforgettable fun.', category: 'moments' },
    { id: 9, text: 'The sparkling enthusiasm in your eyes when talking about something you love.', category: 'sparkle' },
    { id: 10, text: 'How you always remember people’s favorite treats and small details.', category: 'kindness' },
    { id: 11, text: 'Your fearless spirit when embarking on new road trips and adventures.', category: 'dreams' },
    { id: 12, text: 'Your hilarious sense of humor and quick-witted jokes.', category: 'joy' },
    { id: 13, text: 'How your positive energy can turn an ordinary room into a festive party.', category: 'sparkle' },
    { id: 14, text: 'Your loyalty and unwavering support as a best friend.', category: 'kindness' },
    { id: 15, text: 'The cozy, welcoming atmosphere you build wherever you go.', category: 'moments' },
    { id: 16, text: 'Because you are one of a kind, irreplaceable, and truly deserving of all the happiness in the universe!', category: 'dreams' }
  ]
};
