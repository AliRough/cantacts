import React, { useContext } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";

export default function Contact(c) {
  const { deleteContact } = useContext(ContactContext);
  return (
    <div className="md:w-1/2 max-w-sm xl:max-w-none ">
      <div className="flex flex-col xl:flex-row bg-slate-600 rounded my-2  mx-3 items-center justify-center ">
        <div className="mx-4">
          <img
            src={c.photo}
            alt={c.fullname}
            className="m-3 md:m-0 rounded max-h-40"
          />
        </div>
        <div className="m-3 md:mr-10 max-w-full p-1 ">
          <ul className="flex flex-col bg-[#d6d7d8] rounded h-full justify-between  overflow-hidden p-1 md:p-0">
            <li className="text-center border border-b-gray-800 md:py-3 md:px-5 ">
              نام و نام خانوداگی :{"  "}
              <span className="font-bold">{c.fullname} </span>
            </li>

            <li className="text-center border border-b-gray-800 md:py-3 md:px-5 ">
              شماره موبایل :{"  "}
              <span className="font-bold">{c.mobile}</span>
            </li>

            <li className="text-center  md:py-3 md:px-5 ">
              آدرس ایمیل :{"  "}
              <div className="font-bold">{c.email}</div>
            </li>
          </ul>
        </div>
        <div className="flex xl:flex-col  h-full md:pl-2">
          <Link
            to={`/contacts/${c.id}`}
            className="btn xl:my-1 m-1  bg-yellow-600 p-3 rounded"
          >
            <AiFillEye className=" text-xl" />
          </Link>

          <Link
            to={`/contacts/edit/${c.id}`}
            className="btn xl:my-1 m-1 bg-yellow-600 p-3 rounded"
          >
            <BsFillPencilFill className=" text-xl" />
          </Link>
          <button
            onClick={() => {
              deleteContact(c.id, c.fullname);
            }}
            className="btn xl:my-1 m-1 bg-yellow-600 p-3 rounded"
          >
            <FaTrash className=" text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
