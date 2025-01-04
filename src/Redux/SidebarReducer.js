const initialState = {
  elementActive: "",
  toggle: true,
};

const SET_ElEMENT = "SET_ElEMENT";
const SET_TOGGLE = "TOGGLE";

export const setElement = (value) => ({ type: SET_ElEMENT, payload: value });

export const setTOGGLE = (value) => ({ type: SET_TOGGLE, payload: value });

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ElEMENT:
      return { toggle:state.toggle, elementActive: action.payload };
    case SET_TOGGLE:
      return {  elementActive: state.elementActive , toggle: action.payload };
    default:
      return state;
  }
};

export default SidebarReducer;
