import { useStore } from "../../../store/contexts"
import { useEffect, useState } from "react";
import * as apis from "../../../apis";
import { useNavigate } from "react-router-dom";
import { actions } from "../../../store/action";
import EditManagerHotel from "./editHotel";

function DetailHotel() {

    const navigate = useNavigate();
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [isSucc,setIsSucc] = useState(false);
    const [detailHotel, setDetailHotel] = useState({});
    const [hotels, setHotels] = useState([]);
    const [imagesHotel, setImagesHotel] = useState([]);
    const [state, dispatch] = useStore();
    const {isEdit,isSuccessfull} = state;

    console.log(isEdit)
    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await apis.getManager("hotels")
                console.log(response)
                setHotels(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchData()
    }, [])

    useEffect(() => {
        function OpenEdit(id) {
            return (
                setIsShowEdit(id)
            );
        }
        OpenEdit(isEdit)
    }, [isEdit])

    // get hotel edit 
    useEffect(() => {
        var idDetail = parseInt(sessionStorage.getItem("idDetail"), 10)
        const GetDetail = (id) => {
            if (id != null) {
                const getIdEND = hotels?.find(ob => ob.id === id)
                setDetailHotel(getIdEND)
            }
        }
        GetDetail(idDetail)
    }, [hotels])
                                

    // Get Image Hotel
    useEffect(() => {
        // Hàm để hiển thị ảnh từ JSON
        const images = [];
        function displayImages(imageDTOs) {
            imageDTOs?.forEach(imageDTO => {
                images.push(`data:${imageDTO?.type};base64,${imageDTO?.image}`)
            });
        }
        // Gọi hàm hiển thị ảnh
        displayImages(detailHotel?.imageDTOs);
        setImagesHotel(images);
    }, [detailHotel])


    

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
            dispatch(actions.ModalEdit(false))
            setIsShowEdit(false)
        }
    };
    useEffect(() => {
        window.addEventListener('click', handleClickOutsideModal)
    })


    return (
        <div className=" block max-w-5xl m-auto">
            <div className=" flex flex-col gap-5 px-6 py-5 rounded-md mt-10 border bg-neutral-100  ">
                <div className=" bg-white rounded-md px-3 py-3">
                    <h4 className=" text-gray-800 font-bold text-lg">{detailHotel?.name}</h4>
                    <div className="flex gap-2">
                        <span className=" text-sm text-slate-600   ">{detailHotel?.addressDTO?.addressLine},</span>
                        <span className=" text-sm text-slate-600   ">{detailHotel?.addressDTO?.district},</span>
                        <span className=" text-sm text-slate-600   ">{detailHotel?.addressDTO?.city},</span>
                        <span className=" text-sm text-slate-600   ">{detailHotel?.addressDTO?.country}</span>
                    </div>
                </div>
                <div className=" flex flex-col gap-10 border rounded-md px-3 py-3">
                    <div className="flex flex-col gap-3 ">
                        <h4 className=" text-gray-500 text-sm font-semibold">Description</h4>
                        <span className=" text-sm rounded-md bg-white px-3 py-3">{detailHotel?.description}</span>
                    </div>
                    <div className="">
                        <h4 className=" text-gray-500 text-sm font-semibold "> Ảnh khách sạn</h4>
                        <div className=" grid grid-cols-3 gap-y-5 mt-4 bg-white rounded-md px-6 py-5 ">
                            {imagesHotel.map((img) =>
                                <img className=" rounded-md w-40 h-32" src={img} alt="" />
                            )}

                        </div>
                        <button onClick={() => (navigate("/manager/myHotel/add/imageHotel"),
                            sessionStorage.setItem("idHotel", detailHotel?.id))
                        } className="px-6 py-2 text-sm bg-green-600 font-semibold text-white rounded-md">
                            Thêm ảnh
                        </button>
                    </div>
                    <div className=" flex flex-col gap-4">
                        <h4 className="text-gray-500 text-sm font-semibold">Các phòng</h4>
                        <div className=" grid grid-cols-3 bg-white px-6 py-5 rounded-md">
                            {detailHotel?.roomDTOs?.map((room) =>
                                <div>
                                   {  isShowEdit ?
                                    
                                        <div className="modal">
                                            < div className="flex w-full h-full" >
                                                <div id="overlay" className="modal_overlay"></div>
                                                <div className="modal_body">
                                                    <EditManagerHotel rooms={room}/>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    : null}

                                    <div className=" flex flex-col  gap-2">
                                        <h4 className=" font-semibold">Loại phòng: {room?.roomType}</h4>
                                        <span className=" text-sm">Số phòng: {room?.roomCount}</span>
                                        <span className=" text-sm">Giá phòng: {room?.pricePerNight}</span>
                                        <div className="" >
                                            <h4 className="text-sm"> dịch vụ </h4>
                                            {room?.serviceDTOs?.map((service) =>
                                                <span className=" text-sm">{service?.name}</span>
                                            )}
                                        </div>

                                        <div className=" grid grid-cols-2">
                                            {room?.imageDTOs?.map((img) =>
                                                <div className=" w-32 h-32 overflow-hidden border rounded-md">
                                                    <img className=" w-full h-full" src={`data:${img?.type};base64,${img?.image}`} alt="" />
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={() => (navigate("/manager/myHotel/add/imageroom"),
                                            sessionStorage.setItem("idRoom", room?.id))
                                        } className="px-6 py-3 w-36 bg-green-600 font-semibold text-white rounded-md">
                                            Thêm ảnh
                                        </button>
                                        <button className=""
                                            onClick={()=> ( dispatch(actions.ModalEdit(true))) }
                                        >
                                            sửa phòng
                                        </button>
                                    </div>
                                    
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div >

        </div >

    );
}
export default DetailHotel;