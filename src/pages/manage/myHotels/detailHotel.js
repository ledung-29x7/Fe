import { useStore } from "../../../store/contexts"
import { useEffect, useState } from "react";
import * as apis from "../../../apis";
import { useNavigate } from "react-router-dom";
import { actions } from "../../../store/action";
import EditManagerHotel from "./editHotel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DetailHotel() {

    const navigate = useNavigate();
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [isShowTrans, setIsShowTrans] = useState(true)
    const [isSucc, setIsSucc] = useState(false);
    const [detailHotel, setDetailHotel] = useState({});
    const [hotels, setHotels] = useState([]);
    const [imagesHotel, setImagesHotel] = useState([]);
    const [state, dispatch] = useStore();
    const { isEdit, isSuccessfull } = state;


    useEffect(() => {
        FetchData1()
    }, [])

    const FetchData1 = async () => {
        try {
            const response = await apis.getManager("hotels")
            console.log(response)
            setHotels(response.data)
        } catch (error) {
            console.log(error)
        }
    }

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
                images.push({
                    id:imageDTO?.id,
                    image: `data:${imageDTO?.type};base64,${imageDTO?.image}`
                })
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
    }, [isSuccessfull])

    const handleShowTras = () => {
        setIsShowTrans(!isShowTrans);
    }

    const handleDeleteImg = (id) => {
        const FetchData = async() => {
            try {
                await apis.Delete(`image/${id}`)
                .then(res =>{
                    if(res.status === 200){
                        
                        FetchData1()
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        FetchData()
    }
    console.log(imagesHotel)

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
        <div className=" block">
            <div className=" flex flex-col gap-5 px-8 py-8 rounded-md shadow bg-neutral-100  ">
                <div className=" bg-white rounded-md px-3 py-3">
                    <h4 className=" text-gray-800 font-bold text-lg">{detailHotel?.name}</h4>
                    <div className="flex gap-2">
                        <span className=" text-sm text-slate-600   ">{detailHotel?.addressDTO?.addressLine},</span>
                        <span className=" text-sm text-slate-600   ">{detailHotel?.addressDTO?.district},</span>
                        <span className=" text-sm text-slate-600   ">{detailHotel?.addressDTO?.city},</span>
                        <span className=" text-sm text-slate-600   ">{detailHotel?.addressDTO?.country}</span>
                    </div>
                </div>
                <div className=" flex flex-col gap-12 border shadow rounded-md px-3 py-3">
                    <div className=" w-full ">
                        <h4 className=" text-gray-500 text-sm font-semibold">Description</h4>

                        {detailHotel?.description !== null ?
                            <span className=" block mt-6  text-sm rounded-md bg-white px-6 py-5">{detailHotel?.description}</span>
                            :
                            <div className=" flex justify-center mt-6  text-sm rounded-md bg-white px-6 py-5">
                                <h4 className=" font-semibold text-sm text-gray-400">Chưa thêm tiểu sử</h4>
                            </div>
                        }
                    </div>
                    <div className="">
                        <div className=" flex justify-between items-end">
                            <h4 className=" text-gray-500 text-sm font-semibold "> Ảnh khách sạn</h4>

                            <button onClick={() => (navigate("/manager/myHotel/add/imageHotel"),
                                sessionStorage.setItem("idHotel", detailHotel?.id))
                            } className="px-6 py-2 text-sm bg-green-600 font-semibold text-white rounded-md">
                                Thêm ảnh
                            </button>
                        </div>

                        {imagesHotel.length > 0 ?
                            <div className=" grid grid-cols-6 gap-y-5 mt-6  bg-white h-44 rounded-md px-6 py-5 ">
                                {imagesHotel.map((img,index) =>
                                    <div key={index} className=" flex flex-col justify-end">
                                        <div className={isShowTrans && "hidden"}>
                                            <div className=" flex justify-center text-center text-gray-500">
                                                <div className=" cursor-pointer w-14 rounded-md bg-neutral-300"
                                                    onClick={()=>handleDeleteImg(img?.id)} >
                                                    <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={handleShowTras} className=" flex items-end cursor-pointer ">
                                            <img className=" rounded-md w-32 h-28" src={img?.image} alt="" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <div className=" flex justify-center mt-6  text-sm rounded-md bg-white px-6 py-5">
                                <h4 className=" font-semibold text-sm text-gray-400">Chưa thêm ảnh</h4>
                            </div>
                        }

                    </div>
                    <div className=" flex flex-col gap-4">
                        <h4 className="text-gray-500 text-sm font-semibold">Các phòng</h4>
                        <div className=" grid grid-cols-1 gap-10 bg-white px-6 py-5 rounded-md">
                            {detailHotel?.roomDTOs?.map((room) =>
                                <div>
                                    {isShowEdit ?
                                        <div className="modal">
                                            < div className="flex w-full h-full" >
                                                <div id="overlay" className="modal_overlay"></div>
                                                <div className="modal_body">
                                                    <EditManagerHotel rooms={room} />
                                                </div>
                                            </div>
                                        </div>

                                        : null}

                                    <div className=" flex flex-col  gap-2">
                                        <div className="flex justify-between items-end">
                                            <h4 className=" font-semibold">Loại phòng: {room?.roomType}</h4>
                                            <div className="">
                                                <button onClick={() => (navigate("/manager/myHotel/add/imageroom"),
                                                    sessionStorage.setItem("idRoom", room?.id))
                                                } className="px-6 py-2 bg-green-600 font-semibold text-sm mr-2 text-white rounded-md">
                                                    Thêm ảnh
                                                </button>

                                                <button className="px-6 py-2 ml-2 bg-yellow-400 rounded-md font-semibold text-sm text-white"
                                                    onClick={() => (dispatch(actions.ModalEdit(true)))}
                                                >
                                                    sửa phòng
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex gap-10">
                                            <span className=" text-sm">Số phòng: {room?.roomCount}</span>
                                            <span className=" text-sm">Giá phòng: {room?.pricePerNight}</span>
                                        </div>
                                        <div className="" >
                                            <h4 className="text-sm">Dịch vụ: </h4>
                                            {room?.serviceDTOs?.length > 0 ?
                                                <div className="mt-4  text-sm rounded-md bg-neutral-100 px-6 py-5 block">
                                                    {room?.serviceDTOs?.map((service) =>
                                                        <span className=" text-sm">{service?.name}</span>
                                                    )}
                                                </div>
                                                :
                                                <div className=" flex justify-center mt-4  text-sm rounded-md bg-neutral-100 px-6 py-5">
                                                    <h4 className=" font-semibold text-sm text-gray-400">Chưa thêm dịch vụ</h4>
                                                </div>
                                            }
                                        </div>

                                        <div className=" py-6">
                                            <h4 className="text-gray-800 text-sm ">Ảnh phòng:</h4>
                                            {room?.imageDTOs?.length > 0 ?
                                                <div className=" mt-4 grid grid-cols-6 bg-neutral-100 px-6 py-5 rounded-md">
                                                    {room?.imageDTOs?.map((img) =>
                                                        <div className=" w-32 h-28 overflow-hidden border rounded-md">
                                                            <img className=" w-full h-full" src={`data:${img?.type};base64,${img?.image}`} alt="" />
                                                        </div>
                                                    )}
                                                </div>
                                                :
                                                <div className=" flex justify-center mt-4  text-sm rounded-md bg-neutral-100 px-6 py-5">
                                                    <h4 className=" font-semibold text-sm text-gray-400">Chưa thêm ảnh phòng</h4>
                                                </div>
                                            }
                                        </div>

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