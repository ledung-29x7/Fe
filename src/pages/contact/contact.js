import InputContact from "./inputContact";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import * as apis from "../../apis";

function Contact() {
  const navigate = useNavigate();
  const [infoValue, setValueEvaluate] = useState({
    name: "",
    phone: "",
    email: "",
    content: "",
  });

  function handleChange(e) {
    setValueEvaluate({ ...infoValue, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    const FetchData = async () => {
      e.preventDefault();
      try {
        const response = await apis.addContact(infoValue).then((res) => {
          if (res.status === 200) {
            navigate("/contact");

            console.log(res);
          }
        });
      } catch (error) {
        console.log(sessionStorage.getItem("contact"));
        console.log(error);
      }
    };
    FetchData();
  };

  return (
    <div className="isolate bg-white px-6 py-10 ">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className=" text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Liên hệ với chúng tôi
        </h2>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Họ và tên*
            </label>
            <div className="mt-2.5">
              <InputContact
                nameInput={"name"}
                value={infoValue.name}
                placeholder={"Nhập họ và tên"}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Số điện thoại*
            </label>
            <div className="mt-2.5">
              <InputContact
                nameInput={"phone"}
                value={infoValue.phone}
                placeholder={"Nhập số điện thoại"}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Email*
            </label>
            <div className="mt-2.5">
              <InputContact
                nameInput={"email"}
                value={infoValue.email}
                placeholder={"Nhập email"}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Nội dung*
            </label>
            <div className="mt-2.5">
              <textarea
                name={"content"}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={infoValue.content}
                onChange={handleChange}
                placeholder={"Nhập nội dung"}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Liên hệ chúng tôi
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
