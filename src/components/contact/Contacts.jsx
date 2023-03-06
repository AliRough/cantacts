import React, { useContext, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { Spiner, Contact } from "../";
import { ContactContext } from "../../context/contactContext";



export default function Contacts() {
  const { filteredContacts, loading, deleteContact } =
    useContext(ContactContext);
    const {setContact}=useContext(ContactContext)
 useEffect(()=>{
  setContact({})
 },[])
  return (
    <div className="bg-gray-800 min-h-screen">
      <div className=" flex w-screen py-1 mx-auto md:px-12 text-center justify-center">
        <Link
          to="/Contacts/add"
          className="flex items-center px-4  py-2 bg-pink-400 rounded text-lg font-bold "
        >
          ساخت مخاطب جدید
          <AiFillPlusCircle className="mx-2 text-2xl" />
        </Link>
      </div>
      {loading ? (
        <Spiner />
      ) : (
        <div className="w-screen mx-auto px-12 ">
          <div className="flex flex-wrap justify-center ">
            {/* <Contact  />; */}
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => <Contact key={c.id} deleteContact={() => deleteContact(c.id, c.fullname)} {...c}  />)
            ) : (
              <div className="flex flex-col w-1/2 bg-white rounded-2xl my-2  mx-3 items-center  justify-center overflow-hidden">
                <p className="text-2xl font-bold pt-12">مخاطبی یافت نشد ... </p>
                <img src="images/notFound.gif" alt="notFond" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
