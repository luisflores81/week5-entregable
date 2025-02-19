require('../models')

const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/actors'
let actorId

const actor = {
  firstName: "Jennifer",
  lastName: "López",
  nationality: "Estadounidense",
  image: "https://www.clarin.com/img/2022/10/27/rN3Uzy-l4_360x240__1.jpg",
  birthday: "1969-07-24"
}

test("POST -> 'BASE_URL', should return status code 201 and res.body.firstName === actor.firstName", async () => {

 const res = await request(app)
     .post(BASE_URL)
     .send(actor)

 actorId = res.body.id 

 expect(res.status).toBe(201)
 expect(res.body).toBeDefined()
 expect(res.body.firstName).toBe(actor.firstName)

})

test("GET -> 'BASE_URL', should status code 200, res.body[0].firstName === actor.firstName and res.body.length =1", async () => {

 const res = await request(app)
   .get(BASE_URL)

 expect(res.status).toBe(200)
 expect(res.body).toBeDefined()
 expect(res.body[0].firstName).toBe(actor.firstName)
 expect(res.body).toHaveLength(1)

})

test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.firstName ===  actor.firstName", async () => {

 const res = await request(app)
   .get(`${BASE_URL}/${actorId}`)

 expect(res.status).toBe(200)
 expect(res.body).toBeDefined()
 expect(res.body.firstName).toBe(actor.firstName)

})

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.firstName === actorUpdate.firstName", async () => {

  const actorUpdate = {
   	firstName: "JL"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)

})

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

  expect(res.status).toBe(204)

})