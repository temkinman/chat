export const initialState = {
  userProfile: {
    id: "1",
    nickName: "Alex",
    avatar: "img",
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
  currentChatId: null,
  newChatModal: false,
};

export default initialState;