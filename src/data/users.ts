export type User = {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  photos: string[];
  gender: 'male' | 'female' | 'non-binary' | 'other';
  lookingFor: ('male' | 'female' | 'non-binary' | 'other')[];
  sexualPreference?: 'straight' | 'gay' | 'lesbian' | 'bisexual' | 'pansexual' | 'asexual' | 'other';
  lastActive: Date;
  email?: string;
};

export const currentUser: User = {
  id: 'current-user',
  name: 'Alex Morgan',
  age: 28,
  location: 'New York, NY',
  bio: 'Software developer by day, amateur chef by night. Love hiking, photography, and trying new restaurants.',
  interests: ['hiking', 'cooking', 'photography', 'travel', 'technology'],
  photos: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  ],
  gender: 'female',
  lookingFor: ['male', 'non-binary'],
  sexualPreference: 'straight',
  lastActive: new Date(),
  email: 'alex@example.com',
};

export const users: User[] = [
  {
    id: 'user1',
    name: 'Jordan Smith',
    age: 30,
    location: 'Brooklyn, NY',
    bio: 'Music producer and coffee enthusiast. Looking for someone to explore the city with.',
    interests: ['music', 'coffee', 'art', 'fitness', 'travel'],
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    ],
    gender: 'male',
    lookingFor: ['female', 'non-binary'],
    sexualPreference: 'straight',
    lastActive: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: 'user2',
    name: 'Taylor Reed',
    age: 26,
    location: 'Manhattan, NY',
    bio: 'Marketing specialist who loves dogs, wine, and good conversation.',
    interests: ['dogs', 'wine', 'reading', 'yoga', 'cooking'],
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    ],
    gender: 'female',
    lookingFor: ['male'],
    sexualPreference: 'straight',
    lastActive: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 'user3',
    name: 'Casey Johnson',
    age: 32,
    location: 'Queens, NY',
    bio: 'Architect and weekend hiker. Looking for someone to share adventures with.',
    interests: ['architecture', 'hiking', 'photography', 'craft beer', 'movies'],
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    ],
    gender: 'non-binary',
    lookingFor: ['female', 'male', 'non-binary'],
    sexualPreference: 'pansexual',
    lastActive: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: 'user4',
    name: 'Riley Parker',
    age: 29,
    location: 'Hoboken, NJ',
    bio: 'Tech startup founder who loves rock climbing and trying new restaurants.',
    interests: ['technology', 'rock climbing', 'food', 'travel', 'entrepreneurship'],
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    ],
    gender: 'male',
    lookingFor: ['female'],
    sexualPreference: 'straight',
    lastActive: new Date(Date.now() - 43200000), // 12 hours ago
  },
  {
    id: 'user5',
    name: 'Morgan Lee',
    age: 27,
    location: 'Jersey City, NJ',
    bio: 'Yoga instructor and plant enthusiast. Looking for genuine connections.',
    interests: ['yoga', 'plants', 'meditation', 'vegan cooking', 'sustainability'],
    photos: [
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    ],
    gender: 'female',
    lookingFor: ['male', 'non-binary'],
    sexualPreference: 'bisexual',
    lastActive: new Date(Date.now() - 7200000), // 2 hours ago
  },
];

export const getUserById = (id: string): User | undefined => {
  if (id === 'current-user') return currentUser;
  return users.find(user => user.id === id);
};
