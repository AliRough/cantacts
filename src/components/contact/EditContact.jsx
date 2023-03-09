import React, { useContext, useEffect, useState } from "react";
import { Await, Link, useNavigate, useParams } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";
import { getContact, updateContact } from "../../services/contactService";
import Spiner from "../Spiner";
import Contacts from "./Contacts";

export default function EditContact() {
  const { Cid: contactId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    contact: {},
    group: {},
  });
  const {
    loading,
    setLoading,
    createContact,
    contacts,
    setContacts,
    contact,
    setContact,
    onContactChange,
    groups,
    setFilteredContacts,
    forceRender,
    setForceRender,
  } = useContext(ContactContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
        setState((perv) => ({
          ...perv,
          contact: contactData,
        }));
        setLoading(false);
      };
      fetchData();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);
  const submitForm = async (e) => {
    let allCantacts = [...contacts];

    try {
      e.preventDefault();

      setLoading(true);
      let { data, status } = await updateContact(contact, contactId);

      if (status === 200) {
        setLoading(false);
        const contactIndex = allCantacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allCantacts[contactIndex] = data;
        setContacts(allCantacts);
        setFilteredContacts(allCantacts);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setContacts(allCantacts);
      setFilteredContacts(allCantacts);
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="  w-screen py-1 mx-auto  text-center justify-center ">
        <section className="">
          <p className="text-2xl font-bold text-orange-300 my-3">
            ویرایش مخاطب
          </p>
        </section>

        <hr className="border-orange-900 mb-3" />
        {loading ? (
          <Spiner />
        ) : (
          <div className="md:px-20 px-12">
            <div className="flex flex-col md:flex-row bg-gray-600 w-full rounded-xl items-center overflow-hidden">
              <div className="md:w-2/3 justify-center w-full ">
                <form
                  className=" flex flex-col space-y-3 m-12  "
                  onSubmit={submitForm}
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
                      ویرایش مخاطب{" "}
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
              <div className="md:w-1/3">
                <img
                  className=" md:m-4 md:rounded-xl max-w-full"
                  src={state.contact.photo}
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
