import React, { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

export default function SearchCantact(props) {
  const { contactQuery, contactSearch } = useContext(ContactContext);
  
  return (
    <form className={props.className}>
      <div className="md:flex h-full ">
        <div className="relative md:w-96 ">
          <input
            onChange={contactSearch}
            value={contactQuery.text}
            type="search"
            className="block h-full w-full px-2 z-20 md:text-lg placeholder-white bg-transparent border-2 border-purple-400 bg-slate-500 rounded outline-0  overflow-hidden"
            placeholder={props.placeholder}
            required
          />
          <svg
            aria-hidden="true"
            className=" absolute top-0 left-0 h-full  bg-purple-400 p-2 rounded-l"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </form>
  );
}
