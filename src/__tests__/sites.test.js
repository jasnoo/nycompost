const request = require('supertest');
const app = require("./../app");
const Site = require("./../models/siteModel");
const mongoose = require('mongoose');


describe("Site routes", () => {
  // // beforeEach(async () => {
  // //   await mongoose.connect('mongodb://localhost:27017/NYCompost');
  // // });

  // /* Closing database connection after each test. */


  afterAll(async () => {
    await Site.deleteMany()
    await mongoose.connection.close();
  })



  // beforeAll(async () => {
  //   // await mongoose.connection.close();
  //   const url = `mongodb://127.0.0.1/NYCompostTest`
  //   await mongoose.connect(url, { useNewUrlParser: true })
  // })

  // afterEach(async () => {
  //   await User.deleteMany()
  // })


  describe("GET /api/v1/sites", () => {



    test("should get all sites", async () => {
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



      await request(app)
        .get("/api/v1/sites")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy()
          expect(response.body.length).toEqual(2)
          expect(response.body[0]).toEqual(site1)
          expect(response.body[0].borough).toBe(site1.borough)
          expect(response.body[0].neighborhood).toBe(site1.neighborhood)
          expect(response.body[0].location).toBe(site1.location)
          expect(response.body[0].address).toBe(site1.address)
          expect(response.body[0].neighborhood).toBe(site1.neighborhood)
          expect(response.body[0].org).toBe(site1.org)
          expect(response.body[0].accepts_meat).toBe(site1.accepts_meat)
          expect(response.body[0].user_submitted).toBe(true)
          expect(response.body[1].borough).toBe(site2.borough)
          expect(response.body[1].location).toBe(site2.location)


        })
    });
  });

  // });



  //     // beforeAll(async (done) => {
  //     //     await mongoose.connect('mongodb://localhost:27017/NYCompost');
  //     //     server = app.listen(4000, () => {
  //     //         global.agent = request.agent(server);
  //     //         done();
  //     //     });
  //     // });


  //     // afterAll(async () => {
  //     //     await server.close()
  //     //     await app.close()
  //     //     // Close the server instance after each test
  //     //     await mongoose.disconnect();
  //     //     await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  //     // });

  //     // test("It should response the GET method", async () => {
  //     //     const response = await request(app).get("/api/v1/sites")
  //     //     expect(response.statusCode).toBe(200)
  //     //         .end(done)

  //     // });


});