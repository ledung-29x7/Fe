
function LocaltionPicnic({src,nameLocal,infoLocal}){
    return(
        <div className="flex flex-col w-64 gap-6 h-80  box ">
            {/* image Local */}
            <div className=" p-4 pb-0 static">
                <img loading="lazy" src={src} alt="" /> 
            </div>
            {/* info Local */}
            <div className=" flex flex-col gap-4 px-4 pb-4">
                <h4 className=" text-xl font-semibold">{nameLocal}</h4>
                <p className=" text-sm opacity-65">{infoLocal}</p>
            </div>
        </div>
    );
}
export default LocaltionPicnic;