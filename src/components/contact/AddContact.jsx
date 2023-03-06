import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";
import Spiner from "../Spiner";

export default function AddContact() {
  const { loading, contact, onContactChange, groups, createContact } =
    useContext(ContactContext);

  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <div className="bg-gray-800 min-h-screen">
          <div className=" flex w-screen py-1 mx-auto px-20 text-center justify-center ">
            <img
              src="../images/man-taking-note.png"
              alt="man taking note"
              className="absolute left-16 top-36 opacity-50  "
            />
            <div className=" z-10 w-full ">
              <h2 className=" text-2xl text-green-400 font-bold my-3 ">
                ساخت مخاطب جدید
              </h2>
              <hr className=" border-green-700 " />

              <form
                className="w-1/3 flex flex-col space-y-3 mt-12 "
                onSubmit={createContact}
              >
                <input
                  type="text"
                  value={contact.fullname}
                  onChange={onContactChange}
                  className=" text-white block w-full bg-gray-600 border border-purple-400 rounded p-2 placeholder-white "
                  name="fullname"
                  id=""
                  placeholder="نام و نام خانوادگی"
                />
                <input
                  type="text"
                  value={contact.photo}
                  onChange={onContactChange}
                  className=" text-white block w-full bg-gray-600 border border-purple-400 rounded p-2 placeholder-white "
                  name="photo"
                  id=""
                  placeholder="آدرس تصویر"
                />
                <input
                  type="number"
                  value={contact.mobile}
                  onChange={onContactChange}
                  className=" text-white block w-full bg-gray-600 border border-purple-400 rounded p-2 placeholder-white "
                  name="mobile"
                  id=""
                  placeholder="شماره موبایل"
                />
                <input
                  type="email"
                  value={contact.email}
                  onChange={onContactChange}
                  className=" text-white block w-full bg-gray-600 border border-purple-400 rounded p-2 placeholder-white "
                  name="email"
                  id=""
                  placeholder="آدرس ایمیل"
                />
                <input
                  type="text"
                  value={contact.job}
                  onChange={onContactChange}
                  className=" text-white block w-full bg-gray-600 border border-purple-400 rounded p-2 placeholder-white "
                  name="job"
                  id=""
                  placeholder="شغل"
                />

                <select
                  name="group"
                  value={contact.group}
                  onChange={onContactChange}
                  required={true}
                  className="  block w-full bg-gray-600 border border-purple-400 rounded p-2 text-white "
                >
                  <option value="">انتخاب گروه</option>
                  {groups.length > 0 &&
                    groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                </select>

                <div>
                  <button
                    className="bg-purple-400 p-2 rounded ml-2"
                    type="submit"
                  >
                    ساخت مخاطب{" "}
                  </button>
                  <Link
                    to={"/contacts"}
                    className=" bg-[#6272A4] p-2 rounded"
                    type="submit"
                  >
                    انصراف
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
