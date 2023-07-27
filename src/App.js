import Router from "./router";
import ThemeConfig from "theme";
import { ToastContainer } from "react-toastify";

export default function App() {

  return (
    <ThemeConfig> 
      <ToastContainer position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{fontSize:"14px"}}
        />
      <Router />
    </ThemeConfig>
  );
}
