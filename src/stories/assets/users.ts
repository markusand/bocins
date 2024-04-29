type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: number;
    lng: number;
  };
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  surname: string;
  avatar?: string;
  team?: string;
  area: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Leanne',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: -37.3159,
        lng: 81.1496,
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Graham',
    avatar: 'https://i.pravatar.cc/100?u=1',
    area: 'Development',
    team: 'frontend',
  },
  {
    id: 2,
    name: 'Ervin',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: -43.9509,
        lng: -34.4618,
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Howell',
    avatar: 'https://i.pravatar.cc/100?u=2',
    area: 'Development',
    team: 'frontend',
  },
  {
    id: 3,
    name: 'Clementine',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
      geo: {
        lat: -68.6102,
        lng: -47.0653,
      },
    },
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Bauch',
    avatar: 'https://i.pravatar.cc/100?u=3',
    area: 'Development',
    team: 'backend',
  },
  {
    id: 4,
    name: 'Patricia',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    address: {
      street: 'Hoeger Mall',
      suite: 'Apt. 692',
      city: 'South Elvis',
      zipcode: '53919-4257',
      geo: {
        lat: 29.4572,
        lng: -164.299,
      },
    },
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Lebsack',
    avatar: 'https://i.pravatar.cc/100?u=4',
    area: 'HR',
  },
  {
    id: 5,
    name: 'Chelsey',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    address: {
      street: 'Skiles Walks',
      suite: 'Suite 351',
      city: 'Roscoeview',
      zipcode: '33263',
      geo: {
        lat: -31.8129,
        lng: 62.5342,
      },
    },
    phone: '(254)954-1289',
    website: 'demarco.info',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Dietrich',
    avatar: 'https://i.pravatar.cc/100?u=5',
    area: 'HR',
  },
  {
    id: 6,
    name: 'Leopoldo',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    address: {
      street: 'Norberto Crossing',
      suite: 'Apt. 950',
      city: 'South Christy',
      zipcode: '23505-1337',
      geo: {
        lat: -71.4197,
        lng: 71.7478,
      },
    },
    phone: '1-477-935-8478 x6430',
    website: 'ola.org',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Dennis',
    avatar: 'https://i.pravatar.cc/100?u=6',
    area: 'Business',
  },
  {
    id: 7,
    name: 'Kurtis',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    address: {
      street: 'Rex Trail',
      suite: 'Suite 280',
      city: 'Howemouth',
      zipcode: '58804-1099',
      geo: {
        lat: 24.8918,
        lng: 21.8984,
      },
    },
    phone: '210.067.6132',
    website: 'elvis.io',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Weissnat',
    avatar: 'https://i.pravatar.cc/100?u=7',
    area: 'Business',
  },
  {
    id: 8,
    name: 'Nicholas',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    address: {
      street: 'Ellsworth Summit',
      suite: 'Suite 729',
      city: 'Aliyaview',
      zipcode: '45169',
      geo: {
        lat: -14.399,
        lng: -120.7677,
      },
    },
    phone: '586.493.6943 x140',
    website: 'jacynthe.com',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Runolfsdottir',
    avatar: 'https://i.pravatar.cc/100?u=8',
    area: 'Administration',
  },
  {
    id: 9,
    name: 'Glenna',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    address: {
      street: 'Dayna Park',
      suite: 'Suite 449',
      city: 'Bartholomebury',
      zipcode: '76495-3109',
      geo: {
        lat: 24.6463,
        lng: -168.8889,
      },
    },
    phone: '(775)976-6794 x41206',
    website: 'conrad.com',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'Reichert',
    area: 'Development',
    team: 'devops',
  },
  {
    id: 10,
    name: 'Clementina',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    address: {
      street: 'Kattie Turnpike',
      suite: 'Suite 198',
      city: 'Lebsackbury',
      zipcode: '31428-2261',
      geo: {
        lat: -38.2386,
        lng: 57.2232,
      },
    },
    phone: '024-648-3804',
    website: 'ambrose.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
    surname: 'DuBuque',
    avatar: 'https://i.pravatar.cc/100?u=10',
    area: 'Administration',
  },
];
