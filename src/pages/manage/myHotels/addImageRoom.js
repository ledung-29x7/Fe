import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import * as apis from "../../../apis";
import { useNavigate } from "react-router-dom";

function AddImageRoom() {

    const navigate = useNavigate()
    const [susserfull, setSusserfull] = useState(false);
    const [readerImg, setReaderImg] = useState([]);
    const [state, dispatch] = useStore();
    const {getIdRoom} = state;
    const [selectedImg, setSelectedImg] = useState(null);

    const handleFile = (e) => {
        setSelectedImg(e.target.files);
    }

    useEffect(()=> {
        var imgUpload = []
        for (let i = 0; i < selectedImg?.length; i++) {
            imgUpload.push(URL.createObjectURL(selectedImg[0]));
        }
        setReaderImg(imgUpload)

    },[selectedImg])

    const handleAddImg = (e) => {
        const FetchEdit = async () => {

            var idRoom = sessionStorage.getItem("idRoom")
            e.preventDefault();
            const formData = new FormData();
            for (let i = 0; i < selectedImg?.length; i++) {
                formData.append("files", selectedImg[i])
            }

            try {
                await apis.AddImage("room", idRoom, formData)
                    .then(res => {
                        if (res.status === 200) {
                            return (
                                setSusserfull(true),
                                navigate('/manager/myHotels/detail')
                            )
                        }
                    });

            } catch (error) {
                console.log(error)
            }
        }
        FetchEdit()
    }

    return (
        <div>
            {/* Add image Room Single */}
            <div className="flex justify-center max-w-7xl m-auto bg-gray-50 w-full ">
                <div className=" py-32 flex items-center w-full px-3 ">

                    {susserfull ?
                        <div className=" rounded-b-md fixed top-[96px] bg-green-600 text-white py-3 px-9 flex justify-center ">
                            <h3 className=" text-sm">Đã Thêm thành công</h3>
                        </div>
                        : null
                    }

                    <div className=" flex flex-col gap-8 border-2 rounded-lg p-3 w-full">
                        <div className="">
                            <h3 className=" font-semibold text-sm text-gray-500">Thêm ảnh của bạn </h3>
                        </div>
                        <div className=" bg-gray-100 py-8 px-4 rounded-lg flex-col flex gap-32 mb-5">

                            {/* Add image Hotel */}
                            <form className="flex justify-center flex-col" onSubmit={handleAddImg}>
                                <div className="border-2 flex justify-center items-center bg-white border-gray-400 rounded-lg border-dashed py-2 h-32 mx-24 cursor-pointer"
                                    onClick={() => document.getElementById("img-single").click()}
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
                                        id="img-single"
                                        hidden
                                        type="file"
                                        name="image"
                                        onChange={handleFile}
                                        multiple
                                    />
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button className=" px-6 py-2 bg-green-400 rounded-md text-white" type="submit">Thêm</button>
                                </div>
                                
                                <div className="">
                            {readerImg.map((img)=>
                                <img className=" m-3 w-40 h-40" src={img} alt=""/>
                            )}
                        </div>
                        <div className="flex justify-end pr-5">
                        
                        </div>
                               
                            </form>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddImageRoom;