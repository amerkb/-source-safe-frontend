import React from "react";
import PanelHead from "../../UI/Panel/PanelHead";
import PanelBody from "../../UI/Panel/PanelBody";
import ContainerPop from "../../UI/Pops/ContainerPop";
import FormBranch from "../../UI/Branch/FormBranch";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "../../Redux/BranchReducer";
const AddBranch = () => {
  const show = useSelector((state) => state.Branch.show);
  const update = useSelector((state) => state.Branch.update);

  const dispatch = useDispatch();
  return (
    <div className={`${show ? "visible" : "hidden"}`}>
      <ContainerPop>
        <div className="swals-show w-[32em] max-w-full">
          <div className="flex justify-center items-center ">
            <PanelHead Class="flex-1" title={`${update?"Update":"Add"} Branch`} />

            <PanelHead
              onClick={() => dispatch(setShow(false))}
              title={<IoIosCloseCircleOutline className="text-[24px]" />}
            />
          </div>
          <PanelBody content={<FormBranch type='Add' />} />
        </div>
      </ContainerPop>
    </div>
  );
};

export default AddBranch;
