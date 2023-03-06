import { Navigate } from "react-router";
import { Contacts, EditeContact, ViewContact, AddContact } from "./components";

let routes = [
  {
    path: "/",
    element: <Navigate to="/contacts" />,
  },
  {
    path: "/Contacts",
    element: <Contacts />,
  },

  { path: "/Contacts/edit/:Cid", element: <EditeContact /> },
  { path: "/Contacts/:Cid", element: <ViewContact /> },
  { path: "/Contacts/Add", element: <AddContact /> },
];

export default routes;

// let routes = [
//     { path: '/courses', element: < Courses /> },
//     {path: '/course/:courseID', element: <MainCourse />},

//     {path: '/about/*', element: < About />, children: [
//             { path: "setting", element: < p style={{ textAlign: 'center' }}> Setting</p > },
//             { path: "dashboard", element: <p style={{ textAlign: 'center' }}>Dashboard</p> }
//         ]
//     }
// ]
