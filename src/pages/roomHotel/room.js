import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "../../componet/logic"
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
    const [imagesHotel, setImagesHotel] = useState([]);
    const [dataRoom, setDataRoom] = useState([])
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const {
        isInforoom,
        getSearch,
        priceRoomS,
        priceRoomD,
        priceRoomF,
        checkin,
        checkout,
        countNType,
        countNTypeDou,
        countNTypeFami,
    } = state;

    const [bookingInfo, setBookingInfo] = useState({
        hotelId: id,
        checkinDate: "",
        checkoutDate: "",
        durationDays: 0,
        roomSelections: [

        ],
        amount: 0
    });

    // Hàm để chuyển đường link ảnh đầu tiên xuống cuối cùng
    const nextImages = () => {
        const newImages = [...imagesHotel];
        const firstImage = newImages.shift(); // Lấy phần tử đầu tiên
        newImages.push(firstImage); // Đẩy phần tử đầu tiên xuống cuối mảng
        setImagesHotel(newImages); // Cập nhật lại trạng thái
    };

    const privousImages = () => {
        const newImages = [...imagesHotel];
        const lastImage = newImages.pop(); // Lấy phần tử cuối cùng
        newImages.unshift(lastImage); // Đẩy phần tử cuối cùng lên đầu mảng
        setImagesHotel(newImages); // Cập nhật lại trạng thái
    };

    const displayedImages = imagesHotel.slice(0, 3);

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

    // set booking info
    useEffect(() => {
        let totalBooked = [];
        const datein = new Date(checkin);
        const dateout = new Date(checkout);
        const msin = datein.getTime();
        const msout = dateout.getTime();
        const duration = Math.ceil((msout - msin) / (24 * 60 * 60 * 1000))

        if (countNType?.count > 0) {
            totalBooked.push(countNType)
        }
        if (countNTypeDou?.count > 0) {
            totalBooked.push(countNTypeDou)
        }
        if (countNTypeFami?.count > 0) {
            totalBooked.push(countNTypeFami)
        }
        console.log(totalBooked)
        setBookingInfo(prev => ({
            ...prev,
            checkinDate: checkin,
            checkoutDate: checkout,
            durationDays: duration,
            roomSelections: totalBooked,
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
                            dispatch(actions.getInfoBooking({
                                ...bookingInfo,
                                nameHotel: dataRoom?.name,
                                address: dataRoom?.addressDTO,
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

    // Slide 


    // when click
    const handleClickOutsideModal = (event) => {
        var overlay = document.getElementById("overlay")
        if (event.target === overlay) {
            setShowInfoRoom(false)
            dispatch(actions.ModalInforRoom(false))
        }
    };

    // 
    useEffect(() => {
        window.addEventListener('click', handleClickOutsideModal)
    })

    return (
        <div className="">
            <div className="flex flex-col containerr px-8 py-20 ">
                <TitleRoom address={dataRoom?.addressDTO} sao={5} title={dataRoom?.name} introduce={dataRoom?.roomDTOs} />
            </div>
            <div className=" px-6">
                {/* sildes */}
                <div onClick={privousImages} className="flex justify-center gap-8 m-auto relative w-full rounded-3xl h-auto overflow-hidden ">
                    {/* prev */}
                    <button id="previous" type="button" className=" z-10 hover:bg-[#0e4f4f] hover:text-white 
                            border text-[#0e4f4f] bg-white flex p-3 rounded-full 
                            absolute w-[41px] left-5 top-1/2 translate-y-1/2 "
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    </button>

                    {/* next */}
                    <button onClick={nextImages} type="button" className=" z-10 hover:bg-[#0e4f4f] hover:text-white border 
                            text-[#0e4f4f] bg-white flex p-3 rounded-full 
                            absolute w-[41px] right-5 top-1/2 translate-y-1/2 "
                    >
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </button>

                    {/* images */}
                    {displayedImages.map((img, index) =>
                        <SlideRoom key={index} imgSlide={img} />
                    )}
                </div>
            </div>
            {/* end slide */}
            <div className="flex flex-col gap-10 px-8 py-20 containerr">
                {/* navi  */}

                <div className="flex gap-8  w-full">
                    <div className="flex flex-col gap-12 flex-grow">
                        {/* dac diem noi bat */}
                        <div className="flex flex-col gap-5">
                            <TitleHome title={"Tiểu sử"} />
                            {dataRoom?.description !== null ?
                                <div className="flex flex-col gap-6">
                                    <Utilitie src={"../../icon/icon-utiliti.svg"} util={dataRoom?.description} />
                                </div>
                                :
                                <div className="block py-5 text-center roun bg-neutral-100">
                                    <span className=" text-gray-500 text-sm font-semibold">Hiện tiểu sử chưa được cập nhật</span>
                                </div>
                            }
                        </div>

                        {/* cac loai phong gia */}
                        <div className=" flex flex-col gap-5">
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
                            <div className=" sm:px-56 py-8 rounded-3xl bg-[url('https://mixivivu.com/section-background.png')] flex flex-col gap-10 bg-[#f2f4f7]">
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
                                        <span className=" font-semibold text-gray-700">
                                            Tổng tiền
                                        </span>
                                        <span className=" pl-2 text-2xl font-bold text-[#0e4f4f]">
                                            {format.FormatNumber(total)} VNđ
                                        </span>
                                    </div>
                                    <button className=" rounded-md text-white px-6 py-2 bg-[#77dada]" onClick={handleOpenBooking}>
                                        <div className="text-sm font-semibold">Đặt ngay</div>
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