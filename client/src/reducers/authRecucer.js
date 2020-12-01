import types from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case types.SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default authReducer;
