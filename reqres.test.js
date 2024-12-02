const {
  schemaUsers,
  schemaUser,
  schemaRegisterResponce,
  schemaRegisterResponceError,
} = require("./schemas");
const Ajv = require("ajv");
const ajv = new Ajv();

const URL = "https://reqres.in/api";

describe("тестирование API reqres.in", () => {
  describe("GET", () => {
    test("1.1 /users получение пользователей", async () => {
      const response = await fetch(`${URL}/users`);
      expect(response.status).toBe(200);

      const data = await response.json();
      const validate = ajv.compile(schemaUsers);
      const valid = validate(data);
      expect(valid).toBe(true);
    });

    test("1.2 /users/{id} получение пользователя по id", async () => {
      const response = await fetch(`${URL}/users/1`);
      expect(response.status).toBe(200);

      const data = await response.json();
      const validate = ajv.compile(schemaUser);
      const valid = validate(data);
      expect(valid).toBe(true);
    });

    test("1.3 /users/{id} получение несуществующего пользователя по id", async () => {
      const response = await fetch(`${URL}/users/1123123`);
      expect(response.status).toBe(404);
    });
  });

  describe("POST", () => {
    //PUT /register не работает(
    //а PUT /users работает
    test("2.1 /users регистрация нового пользователя", async () => {
      const response = await fetch(`${URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "yulya",
          email: "ms1@1.com",
          password: "asdasdasd",
        }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      const validate = ajv.compile(schemaRegisterResponce);
      const valid = validate(data);
      expect(valid).toBe(true);
    });

    test("2.2 /register регистрация нового пользователя", async () => {
      const response = await fetch(`${URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "yulya",
          email: "ms1@1.com",
        }),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      const validate = ajv.compile(schemaRegisterResponceError);
      const valid = validate(data);
      expect(valid).toBe(true);
    });
  });

  describe("PUT", () => {
    test("3.1 /users/{id} обновление информации пользователя", async () => {
      const response = await fetch(`${URL}/users/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "yulya",
          email: "ms1@1.com",
        }),
      });

      expect(response.status).toBe(200);
    });
  });

  describe("PATCH", () => {
    test("4.1 /users/{id} изменение информации пользователя", async () => {
      const response = await fetch(`${URL}/users/1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "yulya",
          email: "ms1@1.com",
        }),
      });

      expect(response.status).toBe(200);
    });
  });

  describe("DELETE", () => {
    test("5.1 /users/{id} удаление информации о пользователе", async () => {
      const response = await fetch(`${URL}/users/1`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      expect(response.status).toBe(204);
    });
  });
});
