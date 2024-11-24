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
  test("GET: /users позитивная проверка (200)", async () => {
    const response = await fetch(`${URL}/users`);
    expect(response.status).toBe(200);

    const data = await response.json();
    const validate = ajv.compile(schemaUsers);
    const valid = validate(data);
    expect(valid).toBe(true);
  });

  test("GET: /users/{id} позитивная проверка (200)", async () => {
    const response = await fetch(`${URL}/users/1`);
    expect(response.status).toBe(200);

    const data = await response.json();
    const validate = ajv.compile(schemaUser);
    const valid = validate(data);
    expect(valid).toBe(true);
  });

  test("GET: /users/{id} негативная проверка (404)", async () => {
    const response = await fetch(`${URL}/users/1123123`);
    expect(response.status).toBe(404);
  });

  //PUT /register не работает(
  //а PUT /users работает
  test("POST: /users позитивная проверка (201)", async () => {
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

  test("POST: /register негативная проверка (400)", async () => {
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

  test("PUT: /users/{id} позитивная проверка (200)", async () => {
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

  test("PATCH: /users/{id} позитивная проверка (200)", async () => {
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

  test("DELETE: /users/{id} позитивная проверка (200)", async () => {
    const response = await fetch(`${URL}/users/1`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    expect(response.status).toBe(204);
  });
});
