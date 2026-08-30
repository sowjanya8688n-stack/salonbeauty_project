// 
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRoutes from "./AllRoutes";

function App() {
  return (
    <>
      <Navbar />

      <AllRoutes />

      <Footer />
    </>
  );
}

export default App;