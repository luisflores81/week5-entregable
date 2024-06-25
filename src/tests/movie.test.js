require('../models')

const request = require("supertest")
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const BASE_URL = '/api/v1/movies'
let movieId

const movie = {
  name: "Bodas de Plomo",
  image: "https//media.filmelier.com/noticias/mx/2022/10/bodas-de-plomo-trailer-449x449.jpeg",
  synopsis: "Lorem Ipsum is simply dummy text of the printing and typesetting",
  releaseYear: 2023
  
}

afterAll(async () => {
  await actor.destroy()
  await director.destroy()
  await genre.destroy()
})

test("POST -> 'BASE_URL', should return status code 201 and res.body.name === movie.name", 
 async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(movie)

  movieId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)

})

test("GET -> 'BASE_URL', should return status code 200, res.body[0].name === movie.name",
 async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].name).toBe(movie.name)
  expect(res.body[0].actors).toBeDefined()
  expect(res.body[0].actors).toHaveLength(0)
  expect(res.body[0].directors).toBeDefined()
  expect(res.body[0].directors).toHaveLength(0)
  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)

})  

test("GET -> 'BASE_URL/movieId', should return status code 200 and res.body.name === movie.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
  expect(res.body.actors).toBeDefined()
  expect(res.body.actors).toHaveLength(0)
  expect(res.body.directors).toBeDefined()
  expect(res.body.directors).toHaveLength(0)
  expect(res.body.genres).toBeDefined()
  expect(res.body.genres).toHaveLength(0)

})

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.name === movieUpdate.name", async () => {

  const movieUpdate = {
    name: 'Boda Explosiva'
  }

  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)

})

test("POST -> 'BASE_URL/:id/actors', should return status code 200 and res.body.length = 1", 
  async () => {

  actor = await Actor.create({  
      firstName: "Jennifer",
      lastName: "López",
      nationality: "Estadounidense", 
	  image: "https://www.clarin.com/img/2022/10/27/rN3Uzy-l4_360x240__1.jpg",
      birthday: '1969-07-24'
  })

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`) 
    .send([actor.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].moviesActors.actorId).toBeDefined()
  expect(res.body[0].moviesActors.actorId).toBe(actor.id)
  expect(res.body[0].moviesActors.movieId).toBeDefined()
  expect(res.body[0].moviesActors.movieId).toBe(movieId)

})

test("POST -> 'BASE_URL/:id/directors', should return status code 200 and res.body.length = 1", async () => {

  director = await Director.create({  
    firstName: "Steven",
    lastName: "Spielberg",
    nationality: "Estadounidense",
	  image: "https://variety.com/wp-content/uploads/2019/02/steven-spielberg.jpg",
    birthday: '1946-12-18'
  })

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`) 
    .send([director.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].moviesDirectors.directorId).toBeDefined()
  expect(res.body[0].moviesDirectors.directorId).toBe(director.id)
  expect(res.body[0].moviesDirectors.movieId).toBeDefined()
  expect(res.body[0].moviesDirectors.movieId).toBe(movieId)
})

test("POST -> 'BASE_URL/:id/genres', should return status code 200 and res.body.length = 1",
  async () => {

  genre = await Genre.create({  
      name: "Comedia"
  })

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`) 
    .send([genre.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].moviesGenres.genreId).toBeDefined()
  expect(res.body[0].moviesGenres.genreId).toBe(genre.id)
  expect(res.body[0].moviesGenres.movieId).toBeDefined()
  expect(res.body[0].moviesGenres.movieId).toBe(movieId)

})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

  expect(res.status).toBe(204)

})