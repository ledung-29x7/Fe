import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { useEffect, useState } from "react";
import * as apis from "../../../apis";
import { useNavigate } from "react-router-dom";

function EditUser({ user }) {
    const role = [
        {id:1, roleType:"ADMIN"} ,
        {id:2, roleType:"CUSTOMER"},
        {id:3, roleType:"MANAGER"}
    ]

    const [valueEdit,setValueEdit] = useState({
        id:0,
        username: '' ,
        phone: '',
        firstName: '',
        lastName:'' ,
        role: {id: 0, roleType:"" },
    })

    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const {idEdit} = state;

    // as
    useEffect(()=> {
        setValueEdit(user)
    },[user])


    function HandleCloseEdit() {
        dispatch(actions.ModalEdit(false));
    }

    function handleChange (e){
        if (e.target.name === "role") {
            // Find the role object from the role array based on the selected role ID
            const selectedRole = role.find(rol => rol.id === parseInt(e.target.value, 10)); // Convert value to integer if necessary
            // Update the state with the selected role object
            setValueEdit(prevState => ({
              ...prevState,
              role: selectedRole
            }));
        } else{
            setValueEdit({...valueEdit,[e.target.name]: e.target.value})
        }
    }

    function handleUpdated(data) {
        setValueEdit(data)
    }
    

    function handleSubmit(e) {
        const FetchEdit = async() => {
            try {
                e.preventDefault();
                await apis.editUser("users",idEdit,valueEdit)
                .then(res=>{
                    console.log(res)
                    if(res.status === 200){
                        return(
                            
                            dispatch(actions.ModalEdit(false)),
                            dispatch(actions.ModalSuccsessfull(true))
                        )
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        FetchEdit()
    }

    return (
        <div className="auth-form">
            <div className="px-10 my-7 flex justify-between w-full h-14 font-bold text-xl border-b border-b-slate-400 ">
                <span>Edit User</span>
                <span onClick={HandleCloseEdit} className=" w-6 h-6 text-2xl text-slate-500 flex justify-center items-center text-center cursor-pointer "  >
                    &times;
                </span>
            </div>
            <div className=" px-10">
                {/* title edit */}
                <form onSubmit={handleSubmit} className=" my-10 flex flex-col gap-10">
                    {/* form edit */}
                    <div className=" flex flex-col gap-6">
                        <div className=" border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9 ">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Username"
                                value={valueEdit?.username}
                                type="text"
                                name="username"
                                onChange={handleChange}  
                            />
                        </div>

                        <div className=" border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9 ">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Phone"
                                value={valueEdit?.phone}
                                type="text"
                                name="phone"
                                onChange={handleChange}  
                            />
                        </div>

                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                type="text"
                                placeholder="Firt Name"
                                name="firstName"
                                value={valueEdit?.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                value={valueEdit?.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <select className="outline-none w-11/12 h-full" value={valueEdit.role?.id} name="role" onChange={handleChange}>
                                {role.map((rol)=>(
                                    <option key={rol.id} value={rol.id} >{rol?.roleType}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="border-gray-500 border text-right rounded-lg overflow-hidden h-9">
                        <button className=" bg-blue-500 h-full w-full font-bold text-white">Update</button>
                    </div>
                </form>{/* end form */}
                <div className=" h-14 flex justify-end items-center">
                    <button onClick={HandleCloseEdit} className=" rounded-md text-white bg-zinc-400  font-bold w-32 h-8 ">Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default EditUser;