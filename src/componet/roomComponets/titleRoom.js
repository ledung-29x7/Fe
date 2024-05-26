import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TitleRoom({title,introduce,sao,address}) {

    const specificAddress = address?.addressLine + ", " + address?.district + ", " + address?.city + ", " + address?.country;
    const price = introduce?.find(ob => ob.roomType === "SINGLE")?.pricePerNight;

    return (
        <div className="flex justify-between">
            <div className="flex flex-col gap-5 ">
                <h4 className="font-bold text-4xl">
                    {title}
                </h4>
                <div className="flex gap-8 h-8 font-light">
                    <div className=" w-16 flex gap-2 rounded-md text justify-center items-center bg-yellow-400">
                        <span className=" text-[#7a2e0e]">
                            {sao}
                        </span>
                        <FontAwesomeIcon style={{color:"#f79009"}}  icon="fa-solid fa-star" />
                    </div>
                    <div className=" font-semibold flex items-center text-sm rounded-md px-3 text-gray-700 bg-gray-100">
                        {specificAddress}
                    </div>
                </div>
                <img className="w-24" src="../icon/heading-border.png" alt="" />
            </div>
            <div className="w-72">
                <p className=" text-2xl font-semibold text-lime-800 bottom-0">
                    {price} $/
                </p>Khách
            </div>
        </div>
    );
}
export default TitleRoom;