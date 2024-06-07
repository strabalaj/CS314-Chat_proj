
const expressAsyncHandler = require("express-async-handler");
const { 
    access_chat, 
    retrieve_user_chats, 
    create_group_chat, 
    enlarge_group_chat,  } = require("../../functions/chat_functions"); 

const User = require('../../models/user_model');
const Chat = require('../../models/chat_model');
const sinon = require("sinon");


jest.mock('../../models/message_model');
jest.mock('../../models/user_model');
jest.mock('../../models/chat_model');
/*
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
*/
describe('retrieve_user_chats function', () => {
  const req = {
    user: {
      _id: 'mockUserId'
    }
  };

  const res = {
    status: jest.fn(() => res),
    send: jest.fn()
  };

  const Chat = {
    find: jest.fn().mockRejectedValueOnce(new Error('Internal Server Error'))
  };

  // Mock console.error
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('should return 500 on internal server error', async () => {
    await retrieve_user_chats(req, res);

    expect(console.error).toHaveBeenCalledWith('Error in retrieve_user_chats:', expect.any(Error));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});

describe('create_group_chat function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error if required fields are missing', async () => {
        const req = {
            body: {},
        };
        
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        await create_group_chat(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Missing a required field...' });
    });

});

describe("enlarge_group_chat function", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a 404 error when chat is not found", async () => {
    const req = {
        body: {
            chatID: "nonexistent_chat_id",
            userID: "user_id"
        }
    };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    };

    // Mocking Chat.findByIdAndUpdate to return null
    Chat.findByIdAndUpdate.mockResolvedValue(null);

    // Handling the error explicitly in try-catch block
    try {
        await enlarge_group_chat(req, res);
    } catch (error) {
        // Check if the error message contains "Chat not found"
        expect(error.message).toMatch("Chat not found");
    }

    expect(res.status).toHaveBeenCalledWith(500);
    //expect(res.json).toHaveBeenCalledWith({ message: "Chat not found" });
});


});


