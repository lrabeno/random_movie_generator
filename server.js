const express = require('express');
const { syncAndSeed, db, Movie} = require('./db')
const app = express();
const path = require('path');
const faker = require('faker')

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json());


app.get('/', (req, res)=> res.sendFile(path.join(__dirname, './public/index.html')));


app.get('/movies', async (req, res, next) => {
    try {
        res.send(await Movie.findAll())
    } catch (error) {
        next(error)
    }
})

app.get('/movies/:id', async (req, res, next) => {
    try {
        res.send(await Movie.findByPk(req.params.id))
    } catch (error) {
        next(error)
    }
})

app.post('/movies', async (req, res, next) => {
    try {
        const movie = await {...req.body}
        res.send(await Movie.create({
            name: faker.company.catchPhrase()
        }
    ))} 
    catch(error) {
        next (error)
    }
})

app.delete('/delete/:id', async (req, res, next) => {
    try {
        const movie = await Movie.findByPk(req.params.id)
        if (!movie) {
            res.sendStatus(404)
        } else {
        await movie.destroy()
        res.sendStatus(204)
        }
    } catch (error) {
        next (error)
    }
})


const init = async () => {
    try {
      await syncAndSeed()
      await db.authenticate()
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch(error) {
        console.log(error)
    }
  }
  
  init();