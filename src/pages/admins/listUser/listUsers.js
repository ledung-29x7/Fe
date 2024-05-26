import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actions,actionsGetData } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditUser from "./editUser";
import RowUser from "./rowUser";
import AddUser from "./addUser";
import Delete from "./Delete";

function ListUser() {
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [isShowAdd, setisShowAdd] = useState(false);
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [isSucc,setIsSucc] = useState(false);
    const [users,setUser] = useState([]);
    const [editUs,setEditUs] = useState({});
    const [state, dispatch] = useStore();
    const { isEdit,isAdd,isDelete,idEdit,getData,isSuccessfull } = state;

    // Call apis
    const CallData = () => {
        dispatch(actionsGetData.getData("users")
        .then((data)=>{
            dispatch(actionsGetData.GetDataUser(data.data))
        }));
    }
    
    // callBack apis 
    useEffect(() => {
        CallData();
        const callBack = setInterval(CallData,5000);
        
        return()=> callBack && clearInterval(callBack)
    },[])

    // assign value to users
    useEffect(()=>{
        setUser(getData)
    },[getData])

    // get id Edit
    useEffect(() => {
        const GetEdit = (idEdit) => {
            if(idEdit !== null){
                var getIdEND = users?.find(ob => ob.id === idEdit) 
                setEditUs(getIdEND)
            }
        }
        GetEdit(idEdit)
    },[idEdit])

    // Open form Edit
    useEffect(() => {
        function OpenEdit(isEdit) {
            return (
                setIsShowEdit(isEdit)
            );
        }
        OpenEdit(isEdit)
    }, [isEdit])

    // Open form Add
    function HandleOpenAdd() {
        dispatch(actions.ModalAdd(true))
    }

    //  Open form Add
    useEffect(() => {
        function OpenAdd (isAdd) {
            return(
                setisShowAdd(isAdd)
            );
        }
        OpenAdd(isAdd)
    },[isAdd])

    useEffect(() => {
        function OpenDelete(dlete) {
            return (
                setIsShowDelete(dlete)
            );
        }
        OpenDelete(isDelete)
    }, [isDelete])

    // 
    useEffect(() => {
        setIsSucc(isSuccessfull)
        setTimeout(() => {
            setIsSucc(false)
        }, 5000);
    },[isSuccessfull])

    // When you click outside the modal, it will close all form
    const handleClickOutsideModal = (event) => {
        var overlay = document.getElementById("overlay")
        if (event.target === overlay) {
            setIsShowEdit(false)
            setisShowAdd(false)
            dispatch(actions.ModalEdit(false))
            dispatch(actions.ModalAdd(false))
        }
    };
    useEffect(() => {
        window.addEventListener('click', handleClickOutsideModal)
    })

    return (
        <div className=" my-10 px-10">
            <div className=" containerr flex flex-col gap-6">
                <div className=" flex justify-between items-center">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-4xl w-80">
                            User List
                        </h4>
                        <img className="w-24" src="../icon/heading-border.png" alt="" />
                    </div>
                    <div className="mx-10 bg-lime-600 w-32 h-10 flex justify-center items-center gap-3 rounded-md">
                        <FontAwesomeIcon style={{color:"white"}} icon="fa-solid fa-plus"/>
                        <button onClick={HandleOpenAdd} className="buttom_crud ">Add User</button>
                    </div>
                </div>
                {isSucc ?
                    <div className="">
                        <div className=" bg-green-600">
                            <h4 className=" text-white"> You have successfully edited </h4>
                        </div>
                    </div>
                :null}
                <div className=" mt-4">
                    <table className="  w-full shadow ">
                        <tr className="bg-slate-200 h-12">
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Firt Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {users?.map((us)=>(
                            <RowUser
                            key={us.id}
                            user={us}
                        />
                        ))}
                    </table>
                </div>
            </div>
            {/* modal edit */}
            {isShowEdit ?
                <div className="modal z-50">
                    <div className="flex w-full h-full">
                        <div id="overlay" className="modal_overlay"></div>
                        <div className="modal_body">
                            <EditUser user={editUs} />
                        </div>
                    </div>
                </div>
                : null
            }

            {/* modal add */}
            {isShowAdd ?
                <div className="modal z-50">
                    <div className="flex w-full h-full">
                        <div id="overlay" className="modal_overlay"></div>
                        <div className="modal_body">
                            <AddUser />
                        </div>
                    </div>
                </div>
                : null
            }
            {/* modal Delete */}
            {isShowDelete ?
                <div className="modal z-50">
                    <div className="flex w-full h-full">
                        <div id="overlay" className="modal_overlay"></div>
                        <div className="modal_body">
                            <Delete delet={editUs}/>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    );
}
export default ListUser;