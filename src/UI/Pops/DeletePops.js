import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteReducer, { setValueConfirm } from "../../Redux/DeleteReducer";
import axios from "axios";
import { setSuccessRestaurant } from "../../Redux/AlertReducer";
import ContainerPop from "./ContainerPop";
import ButtonClose from "./ButtonClose";

const DeletePops = () => {
  const value = useSelector((state) => state.Delete.ValueConfirm);
  const Id = useSelector((state) => state.Delete.ID);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(setValueConfirm(""));
    const token = localStorage.getItem("token");
    axios
      .delete(
        `${window.host}/superAdmin/${value}/${Id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(setSuccessRestaurant(true));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const show = (value === "restaurant"|| value === "branch");
  return (
    <div className={`${show ? "visible" : "hidden"}`}>
      <ContainerPop>
        <div
          aria-label="pop delete"
          className=" swals-show flex justify-center relative box-border flex-col  z-30
     w-[32em] max-w-full p-5 border-0 rounded-sm bg-white m-auto "
        >
          <div aria-label="= header" className="text-[1rem]">
            <div
              className=" flex  items-center box-content  justify-center w-[5em] h-[5em] mt-[1.25em] mx-auto mb-[1.875em]
       border-[.25em] border-[#facea8] text-[#facea8] rounded-full leading-[5em] cursor-default"
            >
              <div
                className=" text-[3.75rem] flex items-center"
                style={{ lineHeight: "5rem" }}
              >
                !
              </div>
            </div>
            <div class="relative flex max-w-full justify-center items-center m-0 mb-1 p-0 font-bold text-[#595959] text-3xl  text-center uppercase:normal break-words">
              Are you sure?
            </div>
            <div
              id="swal2-content"
              class="swal2-html-container"
              className="block  text-[#595959] font-semibold "
            >
              You won't be able to revert this!
            </div>
            <div
              aria-label="=actions"
              className="w-full mt-3 flex items-center justify-center"
            >
              <button
                type="button"
                class="swal2-confirm swal2-styled"
                aria-label=""
                onClick={handleSubmit}
                className=" bg-[#3085d6] inline-block  m-1 py-2 px-8 shadow-none font-medium border-l-[#3085d6] border-r-[#3085d6] text-[1.0625em] rounded-[0.25em] text-white"
              >
                Yes, delete it!
              </button>
              <div>
                <ButtonClose onClick={() => dispatch(setValueConfirm(""))} />
              </div>
            </div>
          </div>
        </div>
      </ContainerPop>
    </div>
  );
};

export default DeletePops;
