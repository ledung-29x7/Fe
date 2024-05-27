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
    console.log(hotels)

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
        <div className=" px-10 bg-gray-50 py-10 rounded-md">
            <div className=" containerr">
                <div className="  flex justify-between items-end pb-6">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-lg text-gray-600">
                            Danh sách khách sạn
                        </h4>
                       
                    </div>
                </div>

                {isSucc ?
                    <div className="">
                        <div className=" py-3 bg-green-600">
                            <h4 className=" text-white"> successfully</h4>
                        </div>
                    </div>
                :null}

                <div className="  mt-4 rounded-md bg-white">
                    <table className=" w-full ">
                        <thead className=" text-left text-sm text-gray-700 h-12">
                            <th>Tên khách sạn</th>
                            <th>người quản lý</th>
                            <th>Thao tác</th>
                        </thead>
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