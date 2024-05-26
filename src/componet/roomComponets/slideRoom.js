
function SlideRoom({imgSlide}){
    return(
        <div className=" w-[70vw] h-[50vh] flex-shrink-0 cursor-pointer">
            <div className="w-full h-full relative overflow-hidden">
                <img className=" w-full h-full object-cover" loading="lazy" src={imgSlide} alt="sss"/>
            </div>
        </div>
    );
}
export default SlideRoom;