import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as apis from "../../apis"
import TitleRoom from "../../componet/roomComponets/titleRoom";
import SlideRoom from "../../componet/roomComponets/slideRoom";
import TitleHome from "../../componet/homeComponets/titleHome";
import NavButton from "../../componet/roomComponets/navButton";
import Utilitie from "../../componet/roomComponets/utilitie";
import CheckBox from "../../componet/hotelComponets/checkBox";
import InfoRoom from "../../componet/roomComponets/infoRoom";
import DetailRoom from "../../componet/roomComponets/detailRoom";

function Room() {
    const { id } = useParams()
    const [state, dispatch] = useStore();
    const [showInfoRoom, setShowInfoRoom] = useState(false);
    const [showFormBooking, setShowFromBooking] = useState(false);
    const [imagesHotel, setImagesHotel ] = useState([]);
    const [dataRoom, setDataRoom] = useState([])
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const {
        isInforoom,
        isFormBooking,
        getSearch,
        priceRoomS,
        priceRoomD,
        priceRoomF,
        checkin,
        checkout,
        countNType
    } = state;
    const [roomBooking, setRoomBooking] = useState({
        roomType: "",
        count: 0
    });
    const [bookingInfo, setBookingInfo] = useState({
        hotelId : id,
        checkinDate: "",
        checkoutDate: "",
        durationDays: 0,
        roomSelections: [

        ],
        amount: 0
    });

    // get API
    useEffect(() => {
        if (getSearch !== null) {
            const FetchData = async () => {
                try {
                    const response = await apis.getRoom(getSearch, id)
                    setDataRoom(response)
                } catch (error) {
                    console.log(error)
                }
            }
            FetchData();
        }
    }, [getSearch])

    // total price
    useEffect(() => {
        setTotal(priceRoomS + priceRoomF + priceRoomD)
    }, [priceRoomS, priceRoomD, priceRoomF])


    // Open Information Room
    useEffect(() => {
        setShowInfoRoom(isInforoom)
    }, [isInforoom])


    useEffect(() => {
        const datein = new Date(checkin);
        const dateout = new Date(checkout);
        const msin = datein.getTime();
        const msout = dateout.getTime();
        const duration = Math.ceil((msout - msin) / (24 * 60 * 60 * 1000))

        setBookingInfo(b=>({
            ...b,
            checkinDate: checkin,
            checkoutDate: checkout,
            durationDays: duration,
            roomSelections: [countNType],
            amount: total
        }))

    }, [countNType, checkin, checkout, total])

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
        displayImages(dataRoom?.imageDTOs);
        setImagesHotel(images);
    }, [dataRoom])
    
    // Open Form Booking
    const handleOpenBooking = () => {

        const FetchData = async () => {
            try {
                await apis.Booking(bookingInfo)
                    .then(res => {
                        
                        if (res.status === 200) {
                            dispatch(actions.getInfoBooking({...bookingInfo,
                                                                nameHotel:dataRoom?.name,
                                                                address : dataRoom?.addressDTO,
                                                            }))
                            navigate("/pay")
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
        FetchData();
    }

    useEffect(() => {
        setShowFromBooking(isFormBooking)
    }, [isFormBooking])


    // when click
    const handleClickOutsideModal = (event) => {
        var overlay = document.getElementById("overlay")
        if (event.target === overlay) {
            setShowInfoRoom(false)
            setShowFromBooking(false)
            dispatch(actions.ModalInforRoom(false))
            dispatch(actions.ModalFormBooking(false))
        }
    };

    // 
    useEffect(() => {
        window.addEventListener('click', handleClickOutsideModal)
    })

    return (
        <div className="">
            <div className="flex flex-col containerr px-8 py-20 ">
                <TitleRoom address={dataRoom.addressDTO} sao={5} title={dataRoom.name} introduce={dataRoom.roomDTOs} />
            </div>
            <div className=" px-6">
                {/* sildes */}
                <div className="flex justify-center gap-8 m-auto relative w-full rounded-3xl h-auto overflow-hidden">
                    {/* prev */}
                    <button type="button" className=" z-10 hover:bg-[#0e4f4f] hover:text-white 
                            border text-[#0e4f4f] bg-white flex p-3 rounded-full 
                            absolute w-[41px] left-5 top-1/2 translate-y-1/2 "
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    </button>
                    {/* next */}
                    <button type="button" className=" z-10 hover:bg-[#0e4f4f] hover:text-white border 
                            text-[#0e4f4f] bg-white flex p-3 rounded-full 
                            absolute w-[41px] right-5 top-1/2 translate-y-1/2 "
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </button>
                    {/* images */}
                    {imagesHotel.map((img)=> 
                        <SlideRoom imgSlide={img} />
                    )}
                </div>
            </div>
            {/* end slide */}
            <div className="flex flex-col gap-10 px-8 py-20 containerr">
                {/* navi  */}
                <div className=" bg-slate-200 rounded-lg text-sm flex items-center gap-2 p-1">
                    <NavButton nav={"Đặc điểm"} />
                </div>

                <div className="flex gap-8  w-full">
                    <div className="flex flex-col gap-20 flex-grow">
                        {/* dac diem noi bat */}
                        <div className="flex flex-col gap-10">
                            <TitleHome title={"Tính năng nổi bật"} />
                            <div className="flex flex-col gap-6">
                              
                                    <Utilitie src={"../../icon/icon-utiliti.svg"} util={dataRoom?.description} />
                                
                            </div>
                        </div>

                        {/* cac loai phong gia */}
                        <div className=" flex flex-col gap-10">
                            <TitleHome title={"Các loại phòng $ giá"} />
                            {/* <div className="flex flex-col gap-6 border rounded-lg px-5 py-6">
                                <span className=" text-lg font-semibold ">
                                    Tìm kiếm nhanh hơn bằng cách chọn những tiện nghi bạn cần
                                </span>
                                <div className="grid grid-cols-3 gap-y-2">
                                    <CheckBox amenities={"abc"} />
                                    <CheckBox amenities={"abc"} />
                                    <CheckBox amenities={"abc"} />
                                    <CheckBox amenities={"abc"} />
                                </div>
                            </div> */}
                            <div className=" px-20 py-8 rounded-3xl bg-[url('https://mixivivu.com/section-background.png')] flex flex-col gap-10 bg-[#f2f4f7]">

                                <div className="flex justify-end px-2">
                                    <button className=" text-[#0e4f4f] font-semibold px-6 py-4 rounded-2xl bg-white">
                                        Xóa lựa chọn
                                    </button>
                                </div>
                                {dataRoom.roomDTOs?.map((dtroom, key) =>
                                    <InfoRoom
                                        key={key}
                                        dataInfoRoom={dtroom}
                                        max={dataRoom}
                                    />
                                )}
                                <div className=" flex justify-between">
                                    <div className="flex flex-col px-2">
                                        <span className=" text-gray-700">
                                            Tổng tiền
                                        </span>
                                        <span className=" pl-2 text-2xl font-bold text-[#0e4f4f]">
                                            {total} $
                                        </span>
                                    </div>
                                    <button className=" bottom bg-[#77dada]" onClick={handleOpenBooking}>
                                        <div>Đặt ngay</div>
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* Detail Room */}
            {showInfoRoom ?
                <div className="modal">
                    <div className="flex h-full w-full">
                        <div id="overlay" className="modal_overlay"></div>
                        <div className="modal_body">
                            <DetailRoom dataInfoRoom={dataRoom.roomDTOs} />
                        </div>
                    </div>
                </div>
                : null
            }

        </div>
    );
}
export default Room;