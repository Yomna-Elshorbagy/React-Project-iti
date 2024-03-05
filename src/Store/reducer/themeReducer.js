const INITIAL_VALUE = {
    theme: "light",
  };
  
  export default function themeReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
      case "CHANGE_THEME":
        return {
          ...state,
          theme: action.payload,
        };
      default:
        return state;
    }
  }