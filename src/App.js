import { useState, useEffect } from "react";

import { useNavigate, useRoutes } from "react-router";
import routes from "./routes";

import { confirmAlert } from "react-confirm-alert";

import { ContactContext } from "./context/contactContext";
import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
} from "./services/contactService";
import Navbar from "./components/Navbar";

export default function App() {
  let router = useRoutes(routes);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  const [contactQuery, setContactQuery] = useState({ text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(contact);

      /*
       * NOTE
       * 1- Rerender -> forceRender, setForceRender
       * 2- setContact(data)
       */

      if (status === 201) {
        const allContacts = [...contacts, data];

        setContacts(allContacts);
        setFilteredContacts(allContacts);

        setContact({});
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir="rtl" className="p-4 bg-gray-700 rounded-2xl text-white">
            <h1 className="text-3xl text-yellow-300 font-medium">
              پاک کردن مخاطب
            </h1>
            <p className="my-5">
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="bg-purple-400 p-2 rounded ml-2"
            >
              مطمئن هستم
            </button>
            <button onClick={onClose} className=" bg-[#6272A4] p-2 rounded">
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    /*
     * NOTE
     * 1- forceRender -> setForceRender
     * 2- Server Request
     * 3- Delete Local State
     * 4- Delete State Before Server Request
     */

    // Contacts Copy
    const allContacts = [...contacts];
    try {
      const updatedContact = contacts.filter((c) => c.id !== contactId);
      setContacts(updatedContact);
      setFilteredContacts(updatedContact);

      // Sending delete request to server
      const { status } = await deleteContact(contactId);

      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  const contactSearch = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value });
    const allContacts = contacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredContacts(allContacts);
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContact,
        filteredContacts,
        setFilteredContacts,
        contactQuery,
        contacts,
        setContacts,
        groups,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
        forceRender,
        setForceRender,
      }}
    >
      <div className="font-Vazirmatn overflow-hidden">
        <Navbar />
        {router}
      </div>
    </ContactContext.Provider>
  );
}
