import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import * as apis from "../../apis";
import BoxInputUser from "./boxInputUser";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [, dispatch] = useStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [showError, setShowError] = useState(false)

  // open form SingUp
  function handleSignUp() {
    dispatch(actions.Modal(true)); // deponsit action = true for form signUp in header
  }

  // write info
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const FetchData = async () => {
      try {
        await apis
          .Login(formData)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              window.sessionStorage.setItem("token", res.data.token);
              localStorage.setItem("nameUser", res.data.username);
              dispatch(actions.CheckLogin(true));
              dispatch(actions.ModalLogin(false));
              switch (res.data.role) {
                case "ADMIN":
                  return navigate("/admin/listUser");
                case "MANAGER":
                  return navigate("/manager/myHotels");
                case "CUSTOMER":
                  return navigate("/");
                default:
                  return alert("loi roi");
              }
            } else {
              alert("dang nhap that bai");
            }
          })

      } catch (error) {
        if (error.response.status === 401) {
          setErrors("Tài khoản hoặc mật khẩu không chính xác")
        }
        setShowError(true)
      }
    };
    FetchData();
  };

  

  return (
    <div className="flex flex-col gap-8 px-8 pb-10 mx-4 mb-12">
      {/* modal header */}
      <div className="">
        <div className="flex justify-between items-center mt-2">
          <h3 className=" text-indigo-700 text-2xl font-semibold">Đăng nhập</h3>
          <span onClick={handleSignUp} className="auth-form_btn cursor-pointer hover:text-teal-500 active:text-teal-400 ">
            Đăng ký
          </span>
        </div>
      </div>

      {/* input  */}
      <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>

        <BoxInputUser
          icon={"fa-solid fa-user"}
          type={"text"}
          nameInput={"username"}
          placeholder={"Email"}
          value={formData.username}
          onChange={handleChange}
          ele={true}
          titleInput={"Email"}
        />

        <BoxInputUser
          icon={"fa-solid fa-lock"}
          type={"password"}
          nameInput={"password"}
          placeholder={"Mật khẩu"}
          value={formData.password}
          onChange={handleChange}
          ele={false}
          titleInput={"Mật khẩu"}
        />

        {showError ?
          <div>
            <span className=" text-sm text-red-500">{errors}</span>
          </div>
          : null}
        {/* modal footer */}
        <div className=" mt-8">
          <button className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
