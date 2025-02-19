require ('../models')

const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/directors'
let directorId

const director = {
  firstName: "Steven",
  lastName: "Spielberg",
  nationality: "Estadounidense", 
  image: "https://variety.com/wp-content/uploads/2019/02/steven-spielberg.jpg",
  birthday: "1946-12-18"
}

test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === director.firstName", async () => {

 const res = await request(app)
    .post(BASE_URL)
    .send(director)

 directorId = res.body.id 

 expect(res.status).toBe(201)
 expect(res.body).toBeDefined()
 expect(res.body.firstName).toBe(director.firstName)

})

test("GET -> 'BASE_URL', should status code 200, res.body[0].firstName === director.firstName and res.body.length =1", async () => {

 const res = await request(app)
    .get(BASE_URL)

 expect(res.status).toBe(200)
 expect(res.body).toBeDefined()
 expect(res.body[0].firstName).toBe(director.firstName)
 expect(res.body).toHaveLength(1)

})

test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === director.firstName", async () => {

 const res = await request(app)
    .get(`${BASE_URL}/${directorId}`)

 expect(res.status).toBe(200)
 expect(res.body).toBeDefined()
 expect(res.body.firstName).toBe(director.firstName)

})

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.firstName === directorUpdate.firstName", async () => {

  const directorUpdate = {
    firstName: "Steven"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(directorUpdate.firstName)

})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

  expect(res.status).toBe(204)
  
})