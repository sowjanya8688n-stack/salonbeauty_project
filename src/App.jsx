// 
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRoutes from "./AllRoutes";

function App() {
  const location = useLocation();

  // Check whether current page is an admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Navbar only for user pages */}
      {!isAdminPage && <Navbar />}

      {/* All user and admin routes */}
      <AllRoutes />

      {/* Show Footer only for user pages */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;