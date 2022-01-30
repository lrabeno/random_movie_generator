const express = require('express');
const { syncAndSeed, db, Movie} = require('./db')
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());


app.get('/', (req, res)=> res.sendFile(path.join(__dirname, './public/index.html')));


app.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.findAll({
            order: [
                ['stars', 'DESC'],
                ['name', 'ASC'],
              ],
        })
        res.send(movies)
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
        res.status(201).send(await Movie.create(movie))
    } 
    catch(error) {
        next (error)
    }
})

app.delete('/movies/:id', async (req, res, next) => {
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

app.put('/movies/:id',  async(req, res, next) => {
    try {
        // console.log('from the put route yooooo',req.body.stars)
        // console.log('REQQQQQ BODYYYYY', req.body)
        // console.log('REQ DOT PARAMSSSSS',req.params)
        const movie = await Movie.findByPk(req.params.id)
        await movie.update({stars: req.body.stars})
        res.send(movie)
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