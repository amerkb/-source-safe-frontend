const initialState = {
  ValueConfirm: "",
  ID: 0,
};

const SET_VALUE_CONFIRM = "SET_VALUE_CONFIRM";
const SET_ID_CONFIRM = "SET_ID_CONFIRM";

export const setValueConfirm = (value) => ({
  type: SET_VALUE_CONFIRM,
  payload: value,
});
export const setId = (value) => ({
  type: SET_ID_CONFIRM,
  payload: value,
});

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUE_CONFIRM:
      return { ...state, ValueConfirm: action.payload };
    case SET_ID_CONFIRM:
      return { ...state, ID: action.payload };

    default:
      return state;
  }
};

export default SidebarReducer;
