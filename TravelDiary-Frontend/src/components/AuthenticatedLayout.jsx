import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function AuthenticatedLayout() {
  return(
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AuthenticatedLayout;