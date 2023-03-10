import { Route, Routes } from "react-router-dom";
import DashLayout from "./components/DashLayout";
import Layout from "./components/Layout";
import Public from "./components/Public";
import { ROLES } from "./config/roles";
import Login from "./features/Auth/Login";
import PersistLogin from "./features/Auth/PersistLogin";
import Prefetch from "./features/Auth/Prefetch";
import RequireAuth from "./features/Auth/RequireAuth";
import Welcome from "./features/Auth/Welcome";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import NoteList from "./features/notes/NoteList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import UsersList from "./features/users/UsersList";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />

        {/* protected route  */}
        <Route element={<PersistLogin />}>
          {/* persistance check  */}
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              {/* dashlayout starts */}
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                {/* user Route */}
                <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                {/* route for notes */}
                <Route path="notes">
                  <Route index element={<NoteList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
              {/* dash ends */}
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
