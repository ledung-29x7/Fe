import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/contexts';
import { actions } from '../../store/action';
import * as apis from "../../apis"
import BoxInputUser from './boxInputUser';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [, dispatch] = useStore()

    // open Form Login
    function handleLogin() {
        dispatch(actions.ModalLogin(true));
    }

    //  write info
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const FetchData = async () => {
            await apis.SignUp(formData)
            .then(res=>{
                console.log(res)
                if (res.errors) {
                    setErrors(res.errors);
                    alert('Login failed!');
                } else {
                    dispatch(actions.Modal(false))
                    dispatch(actions.ModalLogin(true))
                    navigate('/');
                }
            })
            .catch(errors=>{
                console.log(errors)
            })
        }
        FetchData();
    };

    return (

        <div className="flex flex-col gap-8 px-8 mx-4 mb-12 mt-0">
            {/* modal header */}
            <div className="auth-form_header">
                <div className="flex justify-between mb-4 mt-2">
                    <h3 className=" text-3xl font-semibold">Đăng ký</h3>
                    <span onClick={handleLogin} className="auth-form_btn ">Đăng nhập</span>
                </div>
            </div>

            {/* input  */}
            <form className="flex flex-col gap-5 " onSubmit={handleSubmit} >

                <BoxInputUser
                    icon={"fa-solid fa-user"}
                    type={"text"}
                    nameInput={"username"}
                    placeholder={"User Name"}
                    value={formData.username}
                    onChange={handleChange}
                />
                <BoxInputUser
                    icon={"fa-solid fa-lock"}
                    type={"password"}
                    nameInput={"password"}
                    placeholder={"Password"}
                    value={formData.password}
                    onChange={handleChange}
                />
                <BoxInputUser
                    icon={"fa-solid fa-lock"}
                    type={"text"}
                    nameInput={"firstName"}
                    placeholder={"First Name"}
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <BoxInputUser
                    icon={"fa-solid fa-lock"}
                    type={"text"}
                    nameInput={"lastName"}
                    placeholder={"last Name"}
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <BoxInputUser
                    icon={"fa-solid fa-lock"}
                    type={"text"}
                    nameInput={"phone"}
                    placeholder={"Phone"}
                    value={formData.phone}
                    onChange={handleChange}
                />
                {/* modal footer */}
                <div className="">
                    <button className=" rounded-lg w-full h-12 font-bold bg-cyan-200"
                       
                    >
                        Đăng ký
                    </button>
                </div>
            </form>
        </div>

    );
}
export default SignUp;