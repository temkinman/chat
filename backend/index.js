const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/chats") {
    const chats = getChats(1);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify(chats));
  }
});
server.listen(3000);

let state = {
  users: {
    1: {
      id: "1",
      nickName: "Alex",
      avatar: "img",
      chatIds: ["111", "777"],
    },
    2: {
      id: "2",
      nickName: "Mikle",
      avatar: "img",
      chatIds: ["888", "777"],
    },
  },
  chats: {
    111: {
      title: "onliner",
      id: "111",
      messages: [
        {
          time: "2020-07-20T14:12",
          from: "onliner",
          text: "Hello Belarus",
          messageId: "-1",
        },
      ],
      draft: "",
    },
    777: {
      title: "nexta",
      id: "777",
      messages: [
        {
          time: "2020-09-30T20:00",
          from: "nexta",
          text: "Hello",
          messageId: "-2",
        },
      ],
      draft: "",
    },
    888: {
      title: "tutby",
      id: "888",
      messages: [
        {
          time: "2020-08-30T24:00",
          from: "tutBY",
          text: "Hi",
          messageId: "-3",
        },
      ],
      draft: "",
    },
  },
};

const getChats = (userId) => {
  const chatIds = state.users[userId].chatIds;
  return chatIds.map((chatId) => {
    return state.chats[chatId];
  });
};
