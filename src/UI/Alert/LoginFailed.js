import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiledLogin } from "../../Redux/AlertReducer";

export default function LoginFailed() {
  const toggle = useSelector((state) => state.FiledLogin);
  const dispatch = useDispatch();

  const handleToastClose = () => {
    console.log(toggle);
    dispatch(setFiledLogin(false));
  };
  return (
    <div
      className={`bg-red-100 border border-red-400 text-red-700 duration-300 px-4 py-3 flex justify-center items-center gap-x-3 rounded absolute top-10  ${
        toggle ? "left-[50px]" : "-left-[600px]"
      }`}
      role="alert"
    >
      <div>
        <strong class="font-bold"> Login failed!</strong>
        <span class="block sm:inline ml-1"> Please try again.</span>
      </div>
      <span class="  " onClick={() => handleToastClose()}>
        <svg
          class="fill-current h-6 w-6  text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
}
