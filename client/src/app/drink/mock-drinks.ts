import { Drink } from '../drink';

export const DRINKS: Drink[] = [
    {
        name: 'Sloppy seconds',
        ingredients:[
          {measure: 2, name: 'Moonshine'},
          {measure: 2, name: 'Water'},
          {measure: 1, name: 'Tampon'},
        ],
        author: 'Harvey Dent',
        description: 'Perfect for a late night cap',
        image: 'https://dutchbros.com/public/images/drinks/Rebel_Unicorn_Blood_Iced.png',
        glass: 'Large',
        recipie: 'Mix everything in your finest cup. Has to have coffee stains or taste will be dissappointing. Serve warm with a slap to the face.'
      },
      {
        name: 'Mayhem Mohito',
        ingredients:[
          {measure: 2, name: 'Leaves, any will do.'},
          {measure: 2, name: 'Water'},
          {measure: 5, name: 'Light beer'},
        ],
        author: 'Harvey Dent',
        description: 'Perfect for a late night cap',
        image: 'https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/drink_yellow.png',
        glass: 'Medium rare',
        recipie: 'Mix everything in your finest cup. Has to have coffee stains or taste will be dissappointing. Serve warm with a slap to the face.'
      },
      {
        name: 'Neverendig Sleep',
        ingredients:[
          {measure: 1, name: 'Moonshine'},
          {measure: 1, name: 'Moonshine'},
          {measure: 9, name: 'Chloroform'},
        ],
        author: 'Harvey Dent',
        description: 'Perfect for a late night cap',
        image: 'https://pbs.twimg.com/profile_images/719575860974460929/RbX6OcuM_400x400.jpg',
        glass: 'Smallest possible',
        recipie: 'Mix everything in your finest cup. Has to have coffee stains or taste will be dissappointing. Serve warm with a slap to the face.'
      },
]