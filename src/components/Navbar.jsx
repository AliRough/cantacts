import React from "react";
import { MdPermContactCalendar } from "react-icons/md";
import { Link } from "react-router-dom";
import { SearchCantact } from "./";

export default function Navbar() {
  return (
    <div className="bg-slate-700 shadow-lg font-Vazirmatn">
      <div className="w-screen mx-auto px-12">
        <div className="md:flex md:justify-evenly ">
          <Link to='/Contacts' className="flex text-white text-xl py-3 items-center text-center justify-center">
            <MdPermContactCalendar className="text-purple-400 ml-1 " />
            وب اپلیکیشن مدیریت{"  "}
            <span className="text-purple-400 mr-1 ">مخاطبین</span>
          </Link>
          <div className="flex justify-center">
            <SearchCantact
              className=" h-full py-2"
              placeholder="جستجوی مخاطب"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
