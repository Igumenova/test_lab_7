module.exports.schemaUsers = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 0 },
    per_page: { type: "integer", minimum: 0 },
    total: { type: "integer", minimum: 0 },
    total_pages: { type: "integer", minimum: 0 },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer", minimum: 0 },
          email: { type: "string", minLength: 1 },
          first_name: { type: "string", minLength: 1 },
          last_name: { type: "string", minLength: 1 },
          avatar: { type: "string", minLength: 1 },
        },
        required: ["id", "email", "first_name", "last_name"],
      },
    },
  },
  required: ["page", "per_page", "total", "total_pages", "data"],
};

module.exports.schemaUser = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "integer", minimum: 0 },
        email: { type: "string", minLength: 1 },
        first_name: { type: "string", minLength: 1 },
        last_name: { type: "string", minLength: 1 },
        avatar: { type: "string", minLength: 1 },
      },
      required: ["id", "email", "first_name", "last_name", "avatar"],
    },
  },
  required: ["data"],
};

module.exports.schemaRegisterResponce = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 1 },
    email: { type: "string", minLength: 1 },
    password: { type: "string", minLength: 1 },
    id: { type: "string", minLength: 1 },
    createdAt: { type: "string", minLength: 1 },
  },
  required: ["username", "email", "password", "createdAt", "id"],
};

module.exports.schemaRegisterResponceError = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
  required: ["error"],
};
