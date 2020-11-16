const Router = require("koa-router");
const router = new Router();

let state = {
  users: {
    1: {
      id: 1,
      nickName: "Alex",
      avatar: "img",
      chatIds: [111, 777],
    },
    2: {
      id: 2,
      nickName: "Mikhail",
      avatar: "img",
      chatIds: [888, 777],
    },
  },
  chats: {
    111: {
      title: "onliner",
      id: 111,
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
      id: 777,
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
      id: 888,
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
  currentChatId: null,
  newChatModal: false,
  contextMenu: false,
  currentUser: 1,
};

const getChats = (userId) => {
  const chatIds = state.users[userId].chatIds;
  return chatIds.map((chatId) => {
    return state.chats[chatId];
  });
};

router.get("/chats", async (ctx) => {
  try {
      console.log("In router method get/chats")
   ctx.body = getChats(state.currentUser);
    console.log("ctx.body", ctx.body);
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

router.get("/:id", async (ctx) => {
  try {
    ctx.body = state.users[ctx.params.id];
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

const generateId = () => Math.floor(Math.random() * 100000);

const isExistChat = (state, title) => {
  let result = false;

  Object.values(state.chats).map((chat) => {
    if (chat.title === title) {
      result = true;
    }
  });
  return result;
};

const addChatToUserIds = (id) => {
  state.users[state.currentUser].userChats.push(id);
};

router.post("/", async (ctx) => {
  const type = ctx.request.body.type;
  const chatTitle = ctx.request.body.title;
  const chatId = ctx.request.body.id;

  switch (type) {
    case "ADD_CHAT":
      if (!isExistChat(state, chatTitle)) {
        const newChat = {
          id: generateId(),
          title: chatTitle,
          messages: [],
          draft: "",
        };

        state = { ...state, chats: { ...state.chats, [newChat.id]: newChat } };
        addChatToUserIds(newChat.id);
        ctx.body = state;
      } else {
        console.log(`Chat ${chatTitle} is exist`);
      }
      ctx.body = state;
      break;
    case "DELETE_CHAT":
      const userChats = state.users[state.currentUser].userChats;
      const ind = userChats.findIndex((item) => item === +chatId);

      if (ind > -1) {
        userChats.splice(ind, 1);
      }

      ctx.body = state;
      break;
    case "RENAME_CHAT":
      state.chats[chatId].title = chatTitle;
      ctx.body = state;
      break;
    default:
      ctx.body = state;
  }
});

module.exports = router;
