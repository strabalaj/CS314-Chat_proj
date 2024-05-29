const expressAsyncHandler = require("express-async-handler");
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { access_chat, 
    retrieve_user_chats, 
    create_group_chat, 
    enlarge_group_chat, 
    remove_from_group_chat } = require('../../functions/chat_functions');
const Chat = require("../../models/chat_model");
const User = require("../../models/user_model");

jest.mock("../../models/chat_model");
jest.mock("../../models/user_model");

/* Testing access_chat  */

/* Testing retrieve_user_chats */

/* Testing create_group_chat */

/* Testing enlarge_group_chat */

/* Testing remove_from_group_chat */


