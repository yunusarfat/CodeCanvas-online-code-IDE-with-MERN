import React, { useState } from "react";
import img from "../images/code.png";
import deleteImg from "../images/delete.png";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
const ListCard = ({ item }) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate=useNavigate();

  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        progId:id,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Project deleted successfully");
          setIsDeleteModelShow(false);
          window.location.reload();
        } else {
          alert("Something went wrong");
          setIsDeleteModelShow(false);
        }
      });
  };

  return (
    <div onClick={()=>{navigate(`/editor/${item._id}`)}} className="bg-[#141414] mb-2 flex items-center w-full cursor-pointer justify-between rounded-lg">
      <div onClick={()=>{navigate(`/editor/${item._id}`)}} className="flex items-center gap-2">
        <img className="w-[80px]" src={img} />
        <div>
          <h1 className="text-[20px] text-white">{item.title}</h1>
          <p className="text-[gray] text-[14px]">
            Created in {new Date(item.date).toDateString()}
          </p>
        </div>
      </div>
      <div>
        <img
          onClick={() => setIsDeleteModelShow(true)}
          className="cursor-pointer w-[30px] mr-4"
          src={deleteImg}
          alt=""
        />
      </div>
      {isDeleteModelShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[#1e1e1e] w-[90%] max-w-md p-6 rounded-2xl shadow-lg shadow-black/50 text-white animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Do you want to delete <br /> this project?
            </h3>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  deleteProj(item._id);
                }}
                className="w-1/2 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
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
    </div>
  );
};

export default ListCard;
