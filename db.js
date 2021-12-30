const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;


const db = new Sequelize(
    process.env.DATABASE_URL || 'random_movies',
     'postgres',
     'Ny1knicks23',{
    host: 'localhost',
    dialect: 'postgres'
  });

  const Movie = db.define('movie', {
      name: {
          type: STRING
      },
      stars: {
          type: INTEGER,
          defaultValue: 3,
          validate: {
              max: 5,
              min: 1
          }
      }
  })

  const syncAndSeed = async() => {
    await db.sync({force: true});
    const [spider, star, texas] = await Promise.all([
        Movie.create({name: 'Spider-man', stars: 5}),
        Movie.create({name: 'Star Wars', stars: 5}),
        Movie.create({name: 'Texas Chainsaw Massacre', stars: 4}),
    ])
}

module.exports = {
    syncAndSeed,
    db,
    Movie
}