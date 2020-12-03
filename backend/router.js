const Router = require("koa-router");
const router = new Router();

let state = {
  users: {
    1: {
      id: 1,
      nickName: "admin",
      password: "admin",
      avatar: "img",
      chatIds: [111, 777],
    },
    2: {
      id: 2,
      nickName: "user",
      password: "12345",
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
  // currentChatId: null,
  // newChatModal: false,
  // contextMenu: false,
  currentUser: 1,
};

const getChats = (userId) => {
  const chatIds = state.users[userId].chatIds;
  return chatIds.map((chatId) => {
    return state.chats[chatId];
  });
};

const getUsers = () => state.users;

const getUserId = (userName, userPassword) => {
  const users = getUsers();
  for (let user in users) {
    const { nickName, password } = users[user];
    if (nickName === userName && password === userPassword) {
      return users[user].id;
    }
  }
  return -1;
};

const isFreeUserName = (name) => {
  const users = getUsers();
  for (let user in users) {
    const { nickName } = users[user];
    if (nickName === name) {
      return false;
    }
  }
  return true;
};

const createNewUser = (name, password) => {
  return {
    id: generateId(),
    nickName: name,
    password: password,
    avatar: "img",
    chatIds: [],
  };
};

router.post("/login", async (ctx) => {
  try {
    const userName = ctx.request.body.userName;
    const userPassword = ctx.request.body.userPassword;
    const currentUserId = getUserId(userName, userPassword);
    let result;

    if (currentUserId > 0) {
      state.currentUser = currentUserId;
      result = {
        message: "Login succeed",
        success: true,
      };
      ctx.body = result;
    } else {
      result = {
        message: "Login failed",
        success: false,
      };
      ctx.body = result;
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

router.post("/signup", async (ctx) => {
  try {
    const userName = ctx.request.body.userName;
    const userPassword = ctx.request.body.userPassword;
    let result;

    if (isFreeUserName(userName)) {
      const newUser = createNewUser(userName, userPassword);
      state.users[newUser.id] = newUser;
      result = {
        message: "registration completed successfully",
        success: true,
      };
      ctx.body = result;
    } else {
      result = {
        message: "registration failed",
        success: false,
      };
      ctx.body = result;
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

router.get("/chats", async (ctx) => {
  try {
    const currentUserId = state.currentUser;

    if (currentUserId > 0) {
      ctx.body = getChats(currentUserId);
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

router.delete("/chats/:chatId", async (ctx) => {
  try {
    const currentUserId = state.currentUser;
    const chatId = +ctx.request.params["chatId"];

    const userChats = state.users[currentUserId].chatIds;
    const chatInd = userChats.findIndex((item) => item === chatId);

    if (chatInd > -1) {
      userChats.splice(chatInd, 1);
    }

    ctx.body = chatId;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

router.delete("/chat/history/:chatId", async (ctx) => {
  try {
    const chatId = ctx.request.params.chatId;
    const currentUserId = state.currentUser;
    if (chatId in state.chats) {
      state.chats[chatId].messages = [];
      ctx.body = getChats(currentUserId);
    }

    if (chatId in state.chats) {
      let currentChats = state.users[currentUserId].chatIds;
      const indChat = currentChats.findIndex((item) => item === chatId);
      currentChats.splice(indChat, 1);
      ctx.body = getChats(currentUserId);
    }
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

const createNewChat = (chatTitle) => {
  return {
    id: generateId(),
    title: chatTitle,
    messages: [],
    draft: "",
  };
};

/*rename chat*/
router.patch("/chats/:chatId", async (ctx) => {
  const chatId = ctx.request.params["chatId"];
  const chatTitle = ctx.request.body.title;

  state.chats[chatId].title = chatTitle;
  ctx.body = state.chats[chatId];
});

/*send message*/
router.put("/chats/:chatId", async (ctx) => {
  /*const currentChat = state[action.currentChatId];
      if (currentChat.draft === "") return;

      const newMessage = {
        time: new Date(),
        from: currentChat.title,
        text: currentChat.draft,
        messageId: action.messageId,
      };

      return produce(state, (draftState) => {
        draftState[action.currentChatId].messages.unshift(newMessage);
        draftState[action.currentChatId].draft = "";
      });*/
  const type = ctx.request.body.type;
  const currentChatId = ctx.request.params["chatId"];

  switch (type) {
    case "SEND_MESSAGE":
      console.log("sending message to ", currentChatId);
      const userName = state.users[state.currentUser].title;

      const newMessage = {
        time: new Date(),
        from: userName,
        text: state.chats[currentChatId].draft,
        messageId: generateId(),
      };
      state.chats[currentChatId].messages.push(newMessage);
      state.chats[currentChatId].draft = "";
      ctx.body = newMessage;
      break;
    case "DRAFT_CHANGE":
      const newText = ctx.request.body.text;
      state.chats[currentChatId].draft = newText;
      break;
    default:
      ctx.body = null;
  }
});

router.post("/chats", async (ctx) => {
  const type = ctx.request.body.type;
  const chatTitle = ctx.request.body.title;

  switch (type) {
    case "ADD_CHAT":
      if (!isExistChat(state, chatTitle)) {
        const newChat = createNewChat(chatTitle);

        state = { ...state, chats: { ...state.chats, [newChat.id]: newChat } };
        state.users[state.currentUser].chatIds.push(newChat.id);

        ctx.body = newChat;
      } else {
        console.log(`Chat ${chatTitle} is exist`);
      }
      break;
    default:
      ctx.body = state;
  }
});

module.exports = router;
