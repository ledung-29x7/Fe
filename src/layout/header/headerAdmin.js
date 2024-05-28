import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import * as apis from "../../apis";
import MenuItem from "./menuItem";
import SignUp from "../user/signUp";
import Login from "../user/logIn";

function HeaderAdmin() {

    const navigate = useNavigate()
    const [isShowingSignUp, setIsShowingSignUp] = useState(false);
    const [isShowingLogin, setIsShowingLogin] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isLogout, setIsLogout] = useState(true);
    const [state, dispatch] = useStore();
    const { isSignUp, isLogin, checkLogin } = state;

    useEffect(() => {
        checkLoggedIn();
    }, [checkLogin])

    const scrooltotop = () => {
        return window.scrollTo({
            top: 0,
            behavior: `smooth`,
        });
    };

    // hủy Cookie
    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // Hàm để lấy giá trị của một cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // check xem người dùng đã đăng nhập chưa
    function checkLoggedIn() {
        var token = getCookie("token");
        if (token) {
            // Gọi các API hoặc thực hiện các hành động khác khi người dùng đã đăng nhập
            setIsChecking(true);

        } else {
            // Hiển thị form đăng nhập hoặc các nút chức năng đăng nhập
            setIsChecking(false);
        }
    }


    // handle Login
    function handleLogin() {
        setIsShowingLogin(true);
        dispatch(actions.ModalLogin(true));
    }

    // show SignUp
    useEffect(() => {
        const OpenSignUp = (isSignUp) => {
            if (isSignUp === true) {
                dispatch(actions.ModalLogin(false));
            }
            return setIsShowingSignUp(isSignUp), setIsShowingLogin(isLogin);
        };
        OpenSignUp(isSignUp);
    }, [isSignUp]);

    // show login
    useEffect(() => {
        const OpenLogin = (isLogin) => {
            if (isLogin === true) {
                dispatch(actions.Modal(false));
            }
            return setIsShowingLogin(isLogin), setIsShowingSignUp(isSignUp);
        };
        OpenLogin(isLogin);
    }, [isLogin]);

    function handleHidden() {
        setIsLogout(!isLogout)
    }

    // handle Logout
    const handleLogout = () => {
        const FetchData = async () => {
            try {
                await apis.LogOut().then((res) => {
                    if (res.status === 200) {
                        deleteCookie("token");
                        scrooltotop()
                        checkLoggedIn();
                        navigate("/")
                        dispatch(actions.CheckLogin(false))
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };
        FetchData();
    };

    // close SignUp and Login
    function handleClose() {
        setIsShowingLogin(false);
        setIsShowingSignUp(false);
    }

    // when click vao outside form Login or SignUp thi close
    const handleClickOutsideModal = (event) => {
        var overlay = document.getElementById("overlay");
        var userDropdown = document.getElementById("userDropdown");
        if (event.target === overlay) {
            setIsShowingLogin(false);
            setIsShowingSignUp(false);
        }

        if (event.target !== userDropdown) {
            setIsLogout(true)
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutsideModal);
    }, []);

    return (
        <header className=" containerr px-8 flex  justify-between items-center h-[96px] " >
            <div className=" flex items-center gap-24 h-full">
                {/* logo home */}
                <div className="h-full">
                    <Link className=" h-full flex items-center" to={"/manager/myHotels"} >

                        <div>
                            <img
                                onClick={scrooltotop}
                                className=" w-36 h-24"
                                src="../logo.png"
                                alt=""
                            />
                        </div>
                    </Link>
                </div>

            </div>
            {/* đăng nhập đăng xuất */}
            {
                isChecking ?
                    (<div className=" relative drop-slect">
                        {/* <div id="logout" className=" absolute top-0 left-0 right-0 bottom-0"></div> */}
                        <div className="flex justify-center z-40 items-center gap-2">
                            <button data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start"
                                onClick={handleHidden}
                                className=" text-2xl rounded-full w-[2.8rem] h-11"
                            >
                                <div class="relative w-10 h-10 overflow-hidden bg-white rounded-full dark:bg-gray-600">
                                    <div id="userDropdown" onClick={handleHidden} className=" w-12 h-12 shield "></div>
                                    <svg onClick={handleHidden} id="userDropdown" class="absolute w-12 h-12 text-blue-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path id="userDropdown" fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
                                        </path>
                                    </svg>
                                </div>
                            </button>

                        </div>

                        <div className={isLogout && "hidden"} >
                            <div id="userDropdown" class="z-10 absolute -left-7 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div className=" font-semibold">{localStorage.getItem("nameUser")}</div>
                                    <div class="font-medium truncate"></div>
                                </div>
                                <div class="py-1">
                                    <Link onClick={handleLogout} to={"/manager"} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                    :
                    (
                        <div className=" flex gap-10 items-center">
                            <button
                                className=" bg-cyan-200 flex items-center justify-center  bottom font-bold "
                                onClick={handleLogin}
                            >
                                Đăng ký / Đăng nhập
                            </button>
                        </div>
                    )
            }

            {isShowingSignUp ?
                <div className="modal">
                    <div className="flex h-full w-full">
                        <div id="overlay" className="modal_overlay"></div>
                        <div className="modal_body">
                            <div className="auth-form ">
                                <div className=" w-full flex justify-end p-3">
                                    <span onClick={handleClose} className=" w-6 h-6 text-3xl flex justify-center items-center text-center cursor-pointer "  >
                                        &times;
                                    </span>
                                </div>
                                <SignUp />
                            </div>
                        </div>
                    </div>
                </div>
                : null}
            {isShowingLogin ?
                <div className="modal">
                    <div className="flex h-full w-full">
                        <div id="overlay" className="modal_overlay"></div>
                        <div className="modal_body">
                            <div className="auth-form ">
                                <div className=" w-full flex justify-end p-3">
                                    <span onClick={handleClose} className=" w-6 h-6 text-3xl flex justify-center items-center text-center cursor-pointer "  >
                                        &times;
                                    </span>
                                </div>
                                <Login />
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </header>

    );
}
export default HeaderAdmin;