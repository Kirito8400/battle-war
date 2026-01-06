import { Character, Arena } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'c1',
    name: 'Naruto Uzumaki',
    role: 'Hero',
    image: 'https://i.imgur.com/8Q1ZQYy.jpg',
    stats: { power: 90, speed: 85, defense: 70, technique: 80 },
    description:
      'A hyperactive ninja of the Hidden Leaf Village who dreams of becoming Hokage.',
    specialMove: 'Rasengan Barrage',
  },
  {
    id: 'c2',
    name: 'Sasuke Uchiha',
    role: 'Rival',
    image: 'https://i.imgur.com/2yAfGkS.jpg',
    stats: { power: 92, speed: 88, defense: 65, technique: 95 },
    description:
      'A prodigy of the Uchiha clan driven by revenge and the pursuit of power.',
    specialMove: 'Chidori',
  },
  {
    id: 'c3',
    name: 'Kakashi Hatake',
    role: 'Mentor',
    image: 'https://i.imgur.com/rN6dYqT.jpg',
    stats: { power: 85, speed: 80, defense: 75, technique: 98 },
    description:
      'The Copy Ninja of the Hidden Leaf, known for his Sharingan and calm demeanor.',
    specialMove: 'Lightning Blade',
  },
  {
    id: 'c4',
    name: 'Gojo Satoru',
    role: 'Hero',
    image: 'https://i.imgur.com/WcZkYjD.jpg',
    stats: { power: 99, speed: 95, defense: 90, technique: 100 },
    description:
      'A sorcerer with overwhelming strength and the wielder of the Limitless technique.',
    specialMove: 'Hollow Purple',
  },
  {
    id: 'c5',
    name: 'Itachi Uchiha',
    role: 'Anti-Hero',
    image: 'https://i.imgur.com/fL0X2zM.jpg',
    stats: { power: 93, speed: 85, defense: 70, technique: 99 },
    description:
      'A mysterious shinobi who sacrificed everything for peace in the shadows.',
    specialMove: 'Tsukuyomi',
  },
  {
    id: 'c6',
    name: 'Sukuna',
    role: 'Villain',
    image: 'https://i.imgur.com/6Hj1Z0y.jpg',
    stats: { power: 98, speed: 90, defense: 85, technique: 95 },
    description:
      'The King of Curses, an ancient and ruthless entity overflowing with malice.',
    specialMove: 'Malevolent Shrine',
  },
];

export const ARENAS: Arena[] = [
  {
    id: 'a1',
    name: 'Hidden Leaf Village',
    image: 'https://picsum.photos/1920/1080?random=21',
    description: 'The iconic ninja village surrounded by forests and mountains.',
  },
  {
    id: 'a2',
    name: 'Valley of the End',
    image: 'https://picsum.photos/1920/1080?random=22',
    description:
      'A legendary battlefield where fate-defining duels take place.',
  },
  {
    id: 'a3',
    name: 'Cursed Training Ground',
    image: 'https://picsum.photos/1920/1080?random=23',
    description:
      'An abandoned area overflowing with cursed energy and danger.',
  },
];
