import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";
import { getContact, getGroup } from "../../services/contactService";
import Spiner from "../Spiner";

export default function ViewContact() {
  const { Cid: contactId } = useParams();
  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  const { loading, setLoading } = useContext(ContactContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        const { data: gruoptData } = await getGroup(contactId);
        setState((perv) => ({
          ...perv,
          group: gruoptData,
          contact: contactData,
        }));
        setLoading(false);
      };
      fetchData();
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }, []);
  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="  w-screen py-1 mx-auto  text-center justify-center ">
        <section className="">
          <p className="text-2xl font-bold text-cyan-300 my-3">اطلاعات مخاطب</p>
        </section>

        <hr className="border-cyan-800 mb-3" />
        {loading ? (
          <Spiner />
        ) : (
          <div className="md:px-20 px-12">
            <div className="flex flex-col md:flex-row bg-gray-600 w-full rounded-xl items-center overflow-hidden">
              <div className="md:w-1/3">
                <img
                  className=" md:m-4 md:rounded-xl max-w-full"
                  src={state.contact.photo}
                  alt=""
                />
              </div>
              <div className="md:w-2/3 justify-center w-full ">
                <ul className="bg-[#d6d7d8] md:rounded-xl md:mx-20 md:my-5">
                  <li className="flex py-2 justify-center border-b border-gray-400">
                    نام و نام خانوادگی:
                    <p className="mr-2">{state.contact.fullname}</p>
                  </li>
                  <li className="flex py-2 justify-center border-b border-gray-400">
                    شماره موبایل:
                    <p className="mr-2">{state.contact.mobile}</p>
                  </li>
                  <li className="flex py-2 justify-center border-b border-gray-400">
                    ایمیل:
                    <p className="mr-2">{state.contact.email}</p>
                  </li>
                  <li className="flex py-2 justify-center border-b border-gray-400">
                    شغل:
                    <p className="mr-2">{state.contact.job}</p>
                  </li>
                  <li className="flex py-2 justify-center ">
                    گروه:
                    <p className="mr-2">{state.group.name}</p>
                  </li>
                </ul>
                <div className="bg-purple-400 md:p-2 rounded w-full md:w-auto md:mx-32 md:my-5 py-5  ">

                <Link to="/" > بازگشت به صفحه اصلی</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
