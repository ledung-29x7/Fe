import DetailImageRoom from "./detailImageRoom";
import IconNText from "./iconNText";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import { useEffect, useState } from "react";
import { format } from "../logic";

function DetailRoom({ dataInfoRoom }) {

    const [state, dispatch] = useStore();
    const { getIdRoom } = state;
    const [dtDetail, setDtDetail] = useState({});
    const [imageDetail, setImageDetail] = useState([]);
    const [imageRoom, setImageRoom] = useState(imageDetail[0]);
    
    const handleImageClick = (image) => {
        setImageRoom(image);
    };

    useEffect(() => {
        var findData = dataInfoRoom.find((ob) => ob.id === getIdRoom)
        setDtDetail(findData);
    }, [getIdRoom])

    console.log(dtDetail)

    function handleClose() {
        dispatch(actions.ModalInforRoom(false))
    }
    useEffect(() => {
        const images = [];
        function displayImages(imageDTOs) {
            if (imageDTOs?.length > 0) {
                imageDTOs?.forEach(imageDTO => {
                    images.push(`data:${imageDTO?.type};base64,${imageDTO?.image}`)
                });
                setImageRoom(`data:${imageDTOs[0]?.type};base64,${imageDTOs[0]?.image}`)
            }
        }
        displayImages(dtDetail?.imageDTOs);
        setImageDetail(images);
    }, [dtDetail])


    return (
        <div className=" p-2 ">
            <div className="w-[960px] flex p-6">
                <div className="">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className=" w-[400px] h-[400px] rounded-xl overflow-hidden">
                            <DetailImageRoom
                                src={imageRoom}
                            />

                        </div>
                        <div className=" max-w-[400px] overflow-auto  flex gap-2">
                            {imageDetail.map((image, index) => (
                                <div key={index} className="min-w-16 w-16 h-16 rounded-xl overflow-hidden cursor-pointer" onClick={() => handleImageClick(image)}>
                                    <DetailImageRoom src={image} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className=" px-5 w-full flex flex-col justify-between">
                    <h1 className="text-xl font-semibold mb-3">Loại phòng {dtDetail?.roomType}</h1>
                    <div className="py-6 flex-initial flex flex-col gap-3 ">
                        <h4 className="text-sm font-semibold text-gray-800">Thông tin phòng</h4>
                        <div className="flex justify-between px-7">
                            <IconNText icon="fa-solid fa-bed" text={dtDetail?.roomCount + " phòng"} />
                        </div>
                    </div>

                    <div className=" pt-5 flex-[1_1_0%] flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-gray-800">Dịch vụ phòng: </h4>
                        {dtDetail?.serviceDTOs?.length > 0 ?
                            <div className="grid grid-cols-2">
                            {dtDetail?.serviceDTOs?.map((servic)=>
                                <IconNText icon="fa-solid fa-check" style={{ color: "#66d9ff", }} text={servic?.name} />
                            )}
                        </div>
                        :
                            <div className="block text-center w-full py-6 rounded-md text-sm font-semibold text-gray-400 bg-slate-100">
                                Hiện tại dịch vụ này chưa được thêm
                            </div>
                        }
                    </div>

                    <div className="flex-[1_1_0%] flex flex-col gap-3">
                        <span className=" text-yellow-700 text-sm font-bold">Giá chỉ từ: </span>
                        <div className="flex justify-between">
                            
                            <div className="">
                                <span className=" text-lg font-bold text-[#0e4f4f]">{format.FormatNumber(dtDetail?.pricePerNight)} </span>
                                <span className=" text-gray-500 text-sm font-semibold">Đ/phòng/đêm</span>
                            </div>

                            <button className=" px-6 py-2 rounded-md text-sm font-semibold bg-cyan-500 text-white"
                                type="button"
                                onClick={handleClose}
                            >
                                Lựa chọn khác
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailRoom;