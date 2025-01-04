const initialState = {
  show: false,
  BranchID: 0,
  RestaurantID: 0,
  update: false,
  name: "",
  description: "",
};

const SET_SHOW = "SET_SHOW";
const SET_BRANCH_ID = "SET_BRANCH_ID";
const SET_RESTARANT_ID = "SET_RESTARANT_ID";
const SET_UPDATE = "SET_UPDATE";
const SET_NAME = "SET_NAME";
const SET_DESCRIPTION = "SET_DESCRIPTION";

export const setShow = (value) => ({
  type: SET_SHOW,
  payload: value,
});
export const setBranchId = (value) => ({
  type: SET_BRANCH_ID,
  payload: value,
});
export const setRestaurantId = (value) => ({
  type: SET_RESTARANT_ID,
  payload: value,
});
export const setUpdate = (value) => ({
  type: SET_UPDATE,
  payload: value,
});
export const setName = (value) => ({
  type: SET_NAME,
  payload: value,
});
export const setDescription = (value) => ({
  type: SET_DESCRIPTION,
  payload: value,
});

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW:
      return { ...state, show: action.payload };
    case SET_BRANCH_ID:
      return { ...state, BranchID: action.payload };
    case SET_RESTARANT_ID:
      return { ...state, RestaurantID: action.payload };
    case SET_UPDATE:
      return { ...state, update: action.payload };
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };

    default:
      return state;
  }
};

export default SidebarReducer;
