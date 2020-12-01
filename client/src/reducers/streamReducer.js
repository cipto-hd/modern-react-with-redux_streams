import types from "../actions/types";
import _ from "lodash";

const streamReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.CREATE_STREAM:
      return { ...state, [payload.id]: payload };
    case types.FETCH_STREAM:
      return { ...state, [payload.id]: payload };
    case types.EDIT_STREAM:
      return { ...state, [payload.id]: payload };
    case types.DELETE_STREAM:
      return _.omit(state, payload);
    case types.FETCH_STREAMS:
      return { ...state, ..._.mapKeys(payload, "id") };
    default:
      return state;
  }
};

export default streamReducer;
