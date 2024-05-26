

function Popular({local, nameHotel,infoHotel,src,price}){
    return(
        <div className=" ">
            <div className="w-96 flex flex-col gap-5 box" >
                {/* image Hotel */}
                <div className=" p-4 static pb-0 ">
                    <img loading="lazy" className=" rounded-3xl" src={src} alt="" />
                </div>
                {/* info */}
                <div className="flex flex-col ">
                    {/* info Hotel */}
                    <div className=" px-6 flex flex-col gap-4">
                        <div className=" flex items-center justify-center gap-1 w-24 opacity-75 rounded-xl bg-slate-200">
                            <img className=" w-3 h-3 " src="./icon/local-80.png" alt="" />
                            <p className= "text-sm">{local}</p>
                        </div>
                        <p className=" font-bold text-xl opacity-70">{nameHotel}</p>
                        <div className="flex items-center item gap-1 opacity-75 rounded-xl">
                            <img className="w-5 h-5" src="./icon/icons8-hotel-50.png" alt="" />
                            <p className=" text-base">{infoHotel}</p>
                        </div>
                    </div>
                    {/* price */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-5">
                        <p className=" text-lg font-bold">{price}/khách</p>
                        <button className="bg-cyan-200 border-4
                        border-cyan-200 
                        flex 
                        items-center 
                        justify-center 
                        h-fit w-fit bottom 
                        font-bold
                        opacity-60
                        ">
                            Đặt ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Popular;