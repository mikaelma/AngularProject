import { Drink } from '../drink';

export const DRINKS: Drink[] = [
    {
        id: 1,
        name: 'Sloppy seconds',
        ingredients:[
          {quantity: 2, measure: 'cl', name: 'Moonshine'},
          {quantity: 2, measure: 'cl', name: 'Water'},
          {quantity: 1, measure: 'cl', name: 'Tampon'},
        ],
        author: 'Harvey Dent',
        description: 'Perfect for a late night cap',
        image: 'https://dutchbros.com/public/images/drinks/Rebel_Unicorn_Blood_Iced.png',
        glass: 'Large',
        recipe: 'Mix everything in your finest cup. Has to have coffee stains or taste will be dissappointing. Serve warm with a slap to the face.'
      },
      {
        id: 2,
        name: 'Mayhem Mohito',
        ingredients:[
          {quantity: 2, measure: 'cl', name: 'Leaves, any will do.'},
          {quantity: 2, measure: 'cl', name: 'Water'},
          {quantity: 5, measure: 'cl', name: 'Light beer'},
        ],
        author: 'Harvey Dent',
        description: 'Perfect for a late night cap',
        image: 'https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/drink_yellow.png',
        glass: 'Medium rare',
        recipe: 'Mix everything in your finest cup. Has to have coffee stains or taste will be dissappointing. Serve warm with a slap to the face.'
      },
      {
        id: 3,
        name: 'Neverendig Sleep',
        ingredients:[
          {quantity: 1, measure: 'cl', name: 'Moonshine'},
          {quantity: 1, measure: 'cl', name: 'Moonshine'},
          {quantity: 9, measure: 'dl', name: 'Chloroform'},
        ],
        author: 'Harvey Dent',
        description: 'Perfect for a late night cap',
        image: 'https://pbs.twimg.com/profile_images/719575860974460929/RbX6OcuM_400x400.jpg',
        glass: 'Smallest possible',
        recipe: 'Mix everything in your finest cup. Has to have coffee stains or taste will be dissappointing. Serve warm with a slap to the face.'
      },
]