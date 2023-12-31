const request = require("supertest");
const app = require("../../app");

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/").expect(200, done);
  });

  it("should return a welcome message", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe("Welcome to credit card validator");
        done();
      });
  }, 10000);
});

describe("POST /credit/verify", () => {
  it("should return 401 if card number is invalid", (done) => {
    request(app)
      .post("/credit/verify")
      .set("Content-Type", "application/json")
      .send({ cname: "John Doe", cno: "1234567890123456", edate: "07/30" })
      .expect(401)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.errors[0].msg).toBe(
          "Invalid card number, https://stripe.com/docs/testing contains test card number"
        );
        done();
      });
  });

  it("should return 401 if end date is invalid format", (done) => {
    request(app)
      .post("/credit/verify")
      .set("Content-Type", "application/json")
      .send({ cname: "John Doe", cno: "4539692580891212", edate: "2023-06" })
      .expect(401)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.errors[0].msg).toBe(
          "Invalid end date. Format should be MM/YY"
        );
        done();
      });
  });

  it("should return 401 if end date is expired date", (done) => {
    request(app)
      .post("/credit/verify")
      .set("Content-Type", "application/json")
      .send({ cname: "John Doe", cno: "4539692580891212", edate: "07/21" })
      .expect(401)
      .then((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.errors[0].msg).toBe(
          "Invalid end date. Date should be in the future."
        );
        done();
      });
  });

  it("should return 200 if card number and end date are valid", (done) => {
    request(app)
      .post("/credit/verify")
      .set("Content-Type", "application/json")
      .send({ cname: "John Doe", cno: "4539692580891212", edate: "07/26" })
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Credit card verified successfully!");
        expect(res.body.cname).toBe("John Doe");
        expect(res.body.cno).toBe("4539692580891212");
        expect(res.body.edate).toBe("07/26");
        done();
      });
  });
});
