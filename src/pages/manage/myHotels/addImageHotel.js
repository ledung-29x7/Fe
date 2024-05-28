import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import * as apis from "../../../apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddImageHotel() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [susserfull, setSusserfull] = useState(false);
    const [readerImg, setReaderImg] = useState([]);
    const navigate = useNavigate()
    const [state, dispatch] = useStore();
    const { isSuccessfull } = state

    const handleFileChange = (event) => {
        setSelectedImage(event.target.files);

    };

    useEffect(() => {
        var imgUpload = []
        for (let i = 0; i < selectedImage?.length; i++) {
            imgUpload.push(URL.createObjectURL(selectedImage[i]));
        }
        setReaderImg(imgUpload)

    }, [selectedImage])

    useEffect(() => {
        setSusserfull(isSuccessfull)
        setTimeout(() => {
            dispatch(actions.ModalSuccsessfull(false))
        }, 5000)
    }, [isSuccessfull])

    const handleAddImage = (e) => {
        const FetchEdit = async () => {

            e.preventDefault();
            const formData = new FormData();
            for (let i = 0; i < selectedImage?.length; i++) {
                formData.append("files", selectedImage[i])
            }

            try {
                await apis.AddImage("hotel", sessionStorage.getItem("idHotel"), formData)
                    .then(res => {
                        if (res.status === 200) {
                            return (
                                sessionStorage.setItem("idDetail",sessionStorage.getItem("idHotel")),
                                dispatch(actions.ModalSuccsessfull(true)),
                                navigate("/manager/myHotels/detail")
                            )
                        }
                    });

            } catch (error) {
                console.log(error)
            }
        }
        FetchEdit()
    }

    // 

    return (
        <div className="flex justify-center max-w-7xl m-auto bg-gray-50 w-full ">
            <div className=" flex  flex-col items-center w-full px-3 ">

                {susserfull ?
                    <div className=" rounded-b-md fixed top-[96px] bg-green-600 text-white py-3 px-9 flex justify-center ">
                        <h3 className=" text-sm">Đã Thêm khách sạn thành công</h3>
                    </div>
                    : null
                }
                <div className=" py-4">
                    <h3 className=" font-semibold text-lg">Thêm ảnh của bạn </h3>
                </div>
                <div className=" border-2 rounded-lg p-2 w-full">
                    <div className=" bg-gray-100 py-6 px-4 rounded-lg flex-col flex gap-32 mb-5">

                        {/* Add image Hotel */}
                        <form className="" onSubmit={handleAddImage}>
                            <label className=" text-zinc-600">Upload ảnh khách sạn</label>
                            <div className=" border-2 bg-white border-gray-400 rounded-lg border-dashed px-4 py-2 h-28 w-28 cursor-pointer"
                                onClick={() => document.getElementById("img-hotel").click()}
                            >
                                <div className=" flex flex-col justify-center items-center">
                                        <span className=" text-slate-600 text-sm font-semibold">
                                            Upload ảnh phòng
                                        </span>
                                        <span className="text-blue-400 text-5xl">
                                            <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" />
                                        </span>
                                    </div>
                                <input
                                    id="img-hotel"
                                    hidden
                                    type="file"
                                    name="image"
                                    placeholder={"anh khach san"}
                                    onChange={handleFileChange}
                                    multiple
                                />
                            </div>
                            <button className=" px-6 py-2 bg-green-400 rounded-md text-white" type="submit">Thêm</button>
                        </form>
                        <div className=" grid grid-cols-6 gap-1">
                            {readerImg.map((img) =>
                                <img className=" m-3 w-32 h-32" src={img} alt="" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddImageHotel;