const initialState = {
  SuccessResturant: false,
  FiledLogin: false,
};

const SET_SUCCESS_RESTAURANT = "SET_SUCCESS_RESTAURANT";
const SET_FILED_LOGIN = "SET_FILED_LOGIN";

export const setSuccessRestaurant = (value) => ({
  type: SET_SUCCESS_RESTAURANT,
  payload: value,
});
export const setFiledLogin = (value) => ({
  type: SET_FILED_LOGIN,
  payload: value,
});

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUCCESS_RESTAURANT:
      return { ...state, SuccessResturant: action.payload };
    case SET_FILED_LOGIN:
      return { ...state, FiledLogin: action.payload };

    default:
      return state;
  }
};

export default SidebarReducer;
