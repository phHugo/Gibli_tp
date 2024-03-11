import { Resolvers } from "./types"

export const resolvers: Resolvers = {
  Query: {

    add: (parent, args, context, info) => {
      console.log(args)
      return args.number1 + args.number2
    },
    substract: (parent, args, context, info) => {
      console.log(args)
      return args.number1 - args.number2
    },
    multiply: (parent, args, context, info) => {
      console.log(args)
      return args.number1 * args.number2
    },
    divide: (parent, args, context, info) => {
      console.log(args)
      return args.number1 / args.number2
    },

    closestColor: (parent, args, context, info) => {
      let minDistance = Number.MAX_VALUE;
      let closestColor = '';
      const targetColor = args.color;

      colorsData.forEach(colorData => {
        const distance = getColorDistance(targetColor, colorData);
        if (distance < minDistance) {
          minDistance = distance;
          closestColor = colorData;
        }
      });

      return closestColor;
    },

    getTracks: (_, __, {dataSources}, ___) => {
      return dataSources.trackAPI.getTracksForHome()
    },

    getFilms: (_, __, {dataSources}, ___) => {
      return dataSources.ghibliAPI.getFilms(); 
    },
    getPeople: (_, __, {dataSources}, ___) => {
      return dataSources.ghibliAPI.getPeoples(); 
    }
  },

  Track: {
    author: (parent, _, {dataSources}) => {
      return dataSources.trackAPI.getAuthor(parent.authorId)  
    }
  },

  Film: {
    people: async (parent,__ , {dataSources}) => {
      const peopleData = await dataSources.ghibliAPI.getFilmPeoples(parent.people);
      return peopleData;
    }
  },
  People: {
    films: async (parent,__ , {dataSources}) => {
      const filmsData = await dataSources.ghibliAPI.getPeopleFilms(parent.films);
      return filmsData;
    }
  }
};

function getColorDistance(color1: string, color2: string): number {
  const hexToRgb = (color: string) =>
    color.match(/\w\w/g).map(x => parseInt(x, 16));

  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
};
   
  const colorsData = ["#FF5733", "#33FF57", "#3357FF"];