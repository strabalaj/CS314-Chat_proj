const User = require("../../models/user_model");
const generate_jwt = require("../../config/generate_jwt");
const { new_user, exsisting_user, delete_user, search_users } = require("../../functions/user_functions");


jest.mock("../../models/user_model");
jest.mock("../../config/generate_jwt");

/* Testing new user */
describe("new_user function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user and return token", async () => {
    const req = { body: { name: "Test", username: "testuser", password: "testpassword" } };
    const res = { json: jest.fn() };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: "mocked_id", name: "Test", username: "testuser" });
    generate_jwt.mockReturnValue('mocked_jwt_token');

    await new_user(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(User.create).toHaveBeenCalledWith({ name: "Test", username: "testuser", password: "testpassword" });
    expect(res.json).toHaveBeenCalledWith({
      _id: "mocked_id",
      name: "Test",
      username: "testuser",
      token: 'mocked_jwt_token',
    });
  });

  it("should throw an error if required fields are missing", async () => {
    const req = { body: { name: "Test" } };
    const res = { json: jest.fn() };

    await expect(new_user(req, res)).rejects.toThrow("Please enter all the fields");

    expect(User.findOne).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should throw an error if user already exists", async () => {
    const req = { body: { name: "Test", username: "testuser", password: "testpassword" } };
    const res = { json: jest.fn() };

    User.findOne.mockResolvedValue({});

    await expect(new_user(req, res)).rejects.toThrow("User already exists");

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(User.create).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should throw an error if failed to create user", async () => {
    const req = { body: { name: "Test", username: "testuser", password: "testpassword" } };
    const res = { json: jest.fn() };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(null);

    await expect(new_user(req, res)).rejects.toThrow("Failed to create user");

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(User.create).toHaveBeenCalledWith({ name: "Test", username: "testuser", password: "testpassword" });
    expect(res.json).not.toHaveBeenCalled();
  });
});

/* Testing exsisting user */
describe("exsisting_user function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user details and token if user exists and password is correct", async () => {
    const req = { body: { username: "testuser", password: "testpassword" } };
    const res = { json: jest.fn() };
    const mockUser = {
      _id: "mocked_id",
      name: "Test",
      username: "testuser",
      checkPassword: jest.fn().mockResolvedValue(true)
    };

    User.findOne.mockResolvedValue(mockUser);
    generate_jwt.mockReturnValue('mocked_jwt_token');

    await exsisting_user(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(mockUser.checkPassword).toHaveBeenCalledWith("testpassword");
    expect(res.json).toHaveBeenCalledWith({
      _id: "mocked_id",
      name: "Test",
      username: "testuser",
      token: 'mocked_jwt_token',
    });
  });

  it("should throw an error if user does not exist", async () => {
    const req = { body: { username: "testuser", password: "testpassword" } };
    const res = { json: jest.fn() };

    User.findOne.mockResolvedValue(null);

    await expect(exsisting_user(req, res)).rejects.toThrow("Invalid username or Password");

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should throw an error if password is incorrect", async () => {
    const req = { body: { username: "testuser", password: "testpassword" } };
    const res = { json: jest.fn() };
    const mockUser = {
      _id: "mocked_id",
      name: "Test",
      username: "testuser",
      checkPassword: jest.fn().mockResolvedValue(false)
    };

    User.findOne.mockResolvedValue(mockUser);

    await expect(exsisting_user(req, res)).rejects.toThrow("Invalid username or Password");

    expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(mockUser.checkPassword).toHaveBeenCalledWith("testpassword");
    expect(res.json).not.toHaveBeenCalled();
  });
});

/* Testing deleting a user */
describe("delete_user function", () => {
  it("should delete user if user exists", async () => {
    const req = { params: { userID: "mocked_id" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockUser = { remove: jest.fn() };
    User.findById.mockResolvedValue(mockUser);
    await delete_user(req, res);
    expect(User.findById).toHaveBeenCalledWith("mocked_id");
    expect(mockUser.remove).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully." });
  });

  it("should return 404 if user does not exist", async () => {
    const req = { params: { userID: "mocked_id" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    User.findById.mockResolvedValue(null);
    await delete_user(req, res);
    expect(User.findById).toHaveBeenCalledWith("mocked_id");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
  });

 it("should return 500 if error occurs", async () => {
    const req = { params: { userID: "mocked_id" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const errorMessage = "Test error";
    User.findById.mockRejectedValue(new Error(errorMessage));
    await delete_user(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error." });
  });
});

/* Testing searching a user, retest based off fuzzy search changes */
/*
describe("search_users function", () => {
  it("should return users if search term is provided and users found", async () => {
    const req = { query: { search: "test" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockUsers = [{ username: "testuser1" }, { username: "testuser2" }];

    User.find.mockResolvedValue(mockUsers);

    await search_users(req, res);

    expect(User.find).toHaveBeenCalledWith({ username: "test" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it("should return 404 if no users found with provided search term", async () => {
    const req = { query: { search: "test" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.find.mockResolvedValue([]);

    await search_users(req, res);

    expect(User.find).toHaveBeenCalledWith({ username: "test" });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No users found with the provided username." });
  });

  it("should return 500 if error occurs", async () => {
    const req = { query: { search: "test" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.find.mockRejectedValue(new Error("Test error"));

    await search_users(req, res);

    expect(User.find).toHaveBeenCalledWith({ username: "test" });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error." });
  });
});
*/
