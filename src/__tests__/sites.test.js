const request = require('supertest');
const app = require("./../app");
const Site = require("./../models/siteModel");
const mongoose = require('mongoose');


describe("Site routes", () => {

  afterAll(async () => {
    await mongoose.connection.close();
  })

  afterEach(async () => {
    await Site.deleteMany()
  })

  describe("GET /api/v1/sites", () => {

    test("should fetch all sites", async () => {
      const site1 = await Site.create({
        "borough": "Manhattan",
        "neighborhood": "Chelsea",
        "location": "Skeleton Place",
        "address": "100 Spooky Creepy Ln",
        "org": "Hallow's House Inc",
        "day_schedule": [
          2, 4
        ],
        "month_schedule": [
          0, 1, 2, 3, 4
        ],
        "accepts_meat": true,
        "user_submitted": true
      })

      const site2 = await Site.create({
        "borough": "Brooklyn",
        "address": "200 Spooky Creepy Ln",
      })

      const response = await request(app).get("/api/v1/sites")
      expect(Array.isArray(response.body)).toBeTruthy()
      expect(response.body.length).toEqual(2)
      expect(response.body[0].borough).toBe(site1.borough)
      expect(response.body[0].neighborhood).toBe(site1.neighborhood)
      expect(response.body[0].location).toBe(site1.location)
      expect(response.body[0].address).toBe(site1.address)
      expect(response.body[0].day_schedule).toStrictEqual(site1.day_schedule)
      expect(response.body[0].month_schedule).toStrictEqual(site1.month_schedule)
      expect(response.body[0].neighborhood).toBe(site1.neighborhood)
      expect(response.body[0].org).toBe(site1.org)
      expect(response.body[0].accepts_meat).toBe(site1.accepts_meat)
      expect(response.body[0].user_submitted).toBe(true)
      expect(response.body[1].borough).toBe(site2.borough)
      expect(response.body[1].location).toBe(site2.location)
      expect(response.body[1].user_submitted).toBe(true)

    });
  });

  describe("GET /api/v1/sites/:id", () => {
    test("Should get a site by ID", async () => {
      const site = {
        "borough": "Brooklyn",
        "location": "Spooky Garden",
        "address": "200 Spooky Creepy Ln",
      }
      const initialResponse = await request(app).post("/api/v1/sites").send(site);
      const id = initialResponse.body['_id']
      const response = await request(app).get(`/api/v1/sites/${id}`)
      expect(response.statusCode).toBe(200);
      expect(response.body.borough).toBe(site.borough)
      expect(response.body.location).toBe(site.location)
      expect(response.body.address).toBe(site.address)
      expect(response.body.user_submitted).toBe(true)

    });
  });

  describe("POST /api/v1/sites", () => {
    test("should create a new site", async () => {
      const site = {
        "borough": "Queens",
        "neighborhood": "LIC",
        "location": "Queens Community Garden",
        "address": "200 Location Pl",
        "org": "Garden Collective",
        "day_schedule": [
          1
        ],
        "month_schedule": [
          0, 1
        ],
        "accepts_meat": true,
        "user_submitted": false
      }
      const response = await request(app).post("/api/v1/sites").send(site);
      expect(response.statusCode).toBe(201);
      expect(response.body.borough).toBe(site.borough)
      expect(response.body.neighborhood).toBe(site.neighborhood)
      expect(response.body.location).toBe(site.location)
      expect(response.body.address).toBe(site.address)
      expect(response.body.day_schedule).toStrictEqual(site.day_schedule)
      expect(response.body.month_schedule).toStrictEqual(site.month_schedule)
      expect(response.body.neighborhood).toBe(site.neighborhood)
      expect(response.body.org).toBe(site.org)
      expect(response.body.accepts_meat).toBe(site.accepts_meat)
      expect(response.body.user_submitted).toBe(true)
    });
  });

  describe("PUT /api/v1/sites/:id", () => {
    test("Should update a site", async () => {
      const site = {
        "borough": "Brooklyn",
        "location": "Spooky Garden",
        "address": "200 Spooky Creepy Ln",
      }
      const site2 = {
        "borough": "Queens",
        "location": "Spooky Garden",
        "address": "100 Spooky Creepy Ln",
      }
      const initialResponse = await request(app).post("/api/v1/sites").send(site);
      const id = initialResponse.body['_id']
      const response = await request(app).put(`/api/v1/sites/${id}`).send(site2);
      expect(response.statusCode).toBe(200);
      expect(response.body.borough).toBe(site2.borough)
      expect(response.body.address).toBe(site2.address)
      expect(response.body.user_submitted).toBe(true)

    });
  });

  describe("DELETE /api/v1/sites/:id", () => {
    test("Should delete a site", async () => {
      const site = {
        "borough": "Brooklyn",
        "location": "Spooky Garden",
        "address": "200 Spooky Creepy Ln",
      }
      const initialResponse = await request(app).post("/api/v1/sites").send(site);
      const id = initialResponse.body['_id']
      const response = await request(app).delete(`/api/v1/sites/${id}`);
      expect(response.statusCode).toBe(200);
    });
  });

});