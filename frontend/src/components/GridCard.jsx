import React, { useState } from "react";
import codeImg from "../images/code.png";
import deleteImg from "../images/delete.png";
import { useNavigate } from "react-router-dom";

const GridCard = ({ item }) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="gridcard shadow-lg bg-[#141414] rounded-lg p-[10px] h-[200px] w-[270px] cursor-pointer shadow-black mb-3">
        <div
          onClick={() => {
            navigate(`/editor/${item._id}`);
          }}
        >
          <img className="w-[80px]" src={codeImg} alt="" />
          <h3 className=" text-white text-[20px] w-[90%] line-clamp-1">
            {item.title}
          </h3>
        </div>

        <div className="">
          <p className="text-[gray]">
            Created in {new Date(item.date).toDateString()}
          </p>
          <img
            onClick={() => setIsDeleteModelShow(true)}
            className="w-[20px]"
            src={deleteImg}
            alt=""
          />
        </div>
      </div>
      {isDeleteModelShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
          <div className="bg-[#1e1e1e] w-[90%] max-w-md p-6 rounded-2xl shadow-lg shadow-black/50 text-white animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Do you want to delete <br /> this project?
            </h3>

            <div className="flex gap-4 justify-center">
              <button className="w-1/2 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModelShow(false)}
                className="w-1/2 py-2 bg-gray-700 hover:bg-gray-800 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GridCard;
