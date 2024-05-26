import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actions,actionsGetData } from "../../../store/action";
import EditHotel from "./editHotel";
import RowHotel from "./rowHotel";

function ListHotel() {
    const [isShowEdit,setIsShowEdit] = useState(false);
    const [isSucc,setIsSucc] = useState(false);
    const [hotels,setHotels] = useState([]);
    const [editHt,setEditHt] = useState({});
    const [state,dispatch] = useStore();
    const {isEdit,idEdit,getData} = state;

    // Call apis
    const CallData = () => {
        dispatch(actionsGetData.getData("hotels")
        .then((data)=>{

            dispatch(actionsGetData.GetDataUser(data.data))
        }));
    }

    // callBack apis 
    useEffect(() => {
        CallData();
    },[])

    // assign value to users
    useEffect(()=>{
        setHotels(getData)
    },[getData])

    // get id edit
    useEffect(() => {
        const GetEdit = (idEdit) => {
            if(idEdit !== null){
                var getIdEND = hotels?.find(ob => ob.id === idEdit) 
                setEditHt(getIdEND)
            }
        }
        GetEdit(idEdit)
    },[idEdit])

    // Open form Edit 
    useEffect(() => {
        function OpenEdit(isEdit) {
            return(
                setIsShowEdit(isEdit)
            )
        }
        OpenEdit(isEdit)
    },[isEdit])

    // Open Add user
    

    // when click outside overlay 
    const handleClickOutsideModal = (event) => {
        var overlay = document.getElementById("overlay")
        if (event.target === overlay) {
            setIsShowEdit(false)
            dispatch(actions.ModalEdit(false))
        }
    };

    // 
    useEffect(() =>{
        window.addEventListener('click',handleClickOutsideModal)
    })

    return (
        <div className=" my-10 px-10">
            <div className=" containerr flex flex-col gap-6">
                <div className=" flex justify-between items-center">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-4xl w-80">
                            Hotel List
                        </h4>
                        <img className="w-24" src="../icon/heading-border.png" alt="" />
                    </div>
                </div>

                {isSucc ?
                    <div className="">
                        <div className=" bg-green-600">
                            <h4 className=" text-white"> You have successfully edited </h4>
                        </div>
                    </div>
                :null}

                <div className=" mt-5 shadow_uslist relative">
                    <table className=" w-full shadow ">
                        <tr className="sticky top-0 bg-slate-200 h-12">
                            <th>ID</th>
                            <th>Name Hotel</th>
                            <th>UserName Hotel</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {hotels?.map((dt,index)=>
                            <RowHotel
                                key={index}
                                hotels={dt}
                            />
                        )}
                    </table>
                </div>
            </div>
            {/* modal edit */}
            {isShowEdit ?
                <div className="modal z-50">
                    <div className="flex w-full h-full">
                        <div id="overlay" className="modal_overlay"></div>
                        <div className="modal_body">
                            <EditHotel hotel={editHt} />
                        </div>
                    </div>
                </div>
            : null
            }
        </div>
    );
}
export default ListHotel;