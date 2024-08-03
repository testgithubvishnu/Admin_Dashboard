import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "http://localhost:5000/api/auth/login";
export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);
      const res_data = await response.json();

      if (response.ok) {
        alert("Login success");
        storeTokenInLS(res_data.token);

        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("Invalid username or password");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="section-Login">
            <div className="container grid grid-two-cols">
              <div className="Login-image">
                <img src="" alt="registration" width=" " height="" />
              </div>
              <div className="Login-form">
                <h1 className="main-heading mb-3">Login from</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder=" email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="passsword"
                      name="password"
                      placeholder=" password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
      <ToastContainer />
    </>
  );
};
