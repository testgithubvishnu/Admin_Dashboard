import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Click = () => {
  const diffToast = () => {
    toast.success("Login success", {
      position: "top-center",
    });
  };
  return (
    <>
      <div>
        <h2>welcome to sign up page</h2>
        <button onClick={diffToast}>Login</button>
      </div>
      <ToastContainer />
    </>
  );
};
