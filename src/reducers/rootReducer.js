import { initialState } from "../redux/store";
import { VIEW_CHAT } from "../redux/constants";

// const onViewChat = (chatId) => {
//   const newState = setState(newState);
// };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_CHAT:
      console.log('reducer ', action)
      return {
        ...state,
        currentChatId: action.chatId,
      };
    default:
      return state;
  }
};

export default rootReducer;