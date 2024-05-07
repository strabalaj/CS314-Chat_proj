const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        username: "john@example.com",
      },
      {
        name: "Tony",
        username: "Tony.example",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        username: "guest@example.com",
      },
      {
        name: "Tony",
        username: "tony.example",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest User",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Anthony",
        username: "anthony@example.com",
      },
      {
        name: "Tony",
        username: "tony.example",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Anthony",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        username: "jon@example.com",
      },
      {
        name: "Tony",
        username: "tony.example",
      },
      {
        name: "Guest User",
        username: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      username: "guest.example",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        username: "jane.example",
      },
      {
        name: "Tony",
        username: "tony.example",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jane Doe",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        username: "jon.example",
      },
      {
        name: "Tony",
        username: "username2",
      },
      {
        name: "Guest User",
        username: "guest.example",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Guest User",
      username: "guest.example",
    },
  },
];

module.exports = { chats };
