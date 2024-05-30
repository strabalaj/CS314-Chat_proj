const expressAsyncHandler = require("express-async-handler");
const { 
    access_chat, 
    retrieve_user_chats, 
    create_group_chat, 
    enlarge_group_chat, 
    remove_from_group_chat } = require("../../functions/chat_functions"); 

const User = require('../../models/user_model');
const Chat = require('../../models/chat_model');
const sinon = require("sinon");

jest.mock('../../models/message_model');
jest.mock('../../models/user_model');
jest.mock('../../models/chat_model');


describe("access_chat", () => {
    it("should return a chat object when userId is provided", async () => {
        // Mock request and response objects
        const req = { body: { userId: "userId" }, user: { _id: "loggedInUserId" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the access_chat function
        await access_chat(req, res);

        // Expectations
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
        // You can add more expectations based on the response
    });

    it("should return a 400 error when userId is not provided", async () => {
        // Mock request and response objects
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the access_chat function
        await access_chat(req, res);

        // Expectations
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "UserId parameter not included with request" });
    });

    // Add more test cases as needed for different scenarios
});


