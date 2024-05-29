const { send_message, message_history } = require('../../functions/message_functions'); 
const Message = require('../../models/message_model');
const User = require('../../models/user_model');
const Chat = require('../../models/chat_model');

jest.mock('../../models/message_model');
jest.mock('../../models/user_model');
jest.mock('../../models/chat_model');

describe('send_message function', () => {
    it('should return status 400 if message_content or chatID is missing', async () => {
        const req = {
            body: {}
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await send_message(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Both message_content and chatID are required." });
    });

});

describe('message_history function', () => {
    it('should return status 404 if chat not found or user is not a participant', async () => {
        const req = {
            params: {
                chatID: 'invalid_chat_id'
            },
            user: {
                _id: 'user_id'
            }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        // Mock Chat.findOne to return null
        Chat.findOne.mockResolvedValue(null);

        await message_history(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Chat not found or user is not a participant." });
    });

});
