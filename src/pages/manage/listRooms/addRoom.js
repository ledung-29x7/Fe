import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import * as apis from "../../../apis"

function AddRoom() {
    const [formData, setFormData] = useState({
        HotelName: "",
        AddressLine: "",
        City: "",
        Country: "",
        SingleRoomCount: "",
        SingleRoomPrice:"",
        DoubleRoomCount:"",
        DoubleRoomPrice:""

    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [,dispatch] = useStore();
    
    // open add
    function HandleCloseAdd() {
        dispatch(actions.ModalAdd(false));
    }

    // hande input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const FetchData = async() => {
            await apis.addUser(formData)
        }
        FetchData();
    };

    return (
        <div className="auth-form">
            <div className=" p-10 pb-0">
                {/* title edit */}
                <div className=" flex justify-between w-full h-14 font-bold text-xl border-b border-b-slate-800 ">
                    <span >Add Hotel</span>
                    <span onClick={HandleCloseAdd} className=" w-6 h-6 text-2xl text-slate-500 flex justify-center items-center text-center cursor-pointer "  >
                        &times;
                    </span>
                </div>
                <form onSubmit={handleSubmit} className=" my-7 flex flex-col gap-10">
                    {/* form edit */}
                    <div className=" flex flex-col gap-6">
                        <div className=" border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9 ">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Hotel Name"
                                type="text"
                                name="HotelName"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                type="text"
                                placeholder="Address Line"
                                name="AddressLine"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="City"
                                type="text"
                                onChange={handleChange}
                                name="City"
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Country"
                                type="text"
                                onChange={handleChange}
                                name="Country"
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Single Room Count"
                                type="text"
                                onChange={handleChange}
                                name="SingleRoomCount"
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Single Room Price"
                                type="text"
                                onChange={handleChange}
                                name="SingleRoomPrice"
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Double Room Count"
                                type="text"
                                onChange={handleChange}
                                name="DoubleRoomCount"
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Double Room Price"
                                type="text"
                                onChange={handleChange}
                                name="DoubleRoomPrice"
                            />
                        </div>
                    </div>
                    <div className="border-gray-500 border text-right rounded-lg overflow-hidden h-9">
                        <button type="submit" className=" bg-blue-500 h-full w-full font-bold text-white">Add</button>
                    </div>
                </form>{/* end form */}
                <div className=" h-14 flex justify-end items-center">
                    <button onClick={HandleCloseAdd} className=" rounded-md text-white bg-zinc-400  font-bold w-32 h-8 ">Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default AddRoom;