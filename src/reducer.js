export const initialState = {
    user: null,
  };
  
  export const actionType = {
    SET_USER: "SET_USER",
  };
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case actionType.SET_USER:
        return {
          ...state, // Fix the typo from "Satellite" to "state"
          user: action.user,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  