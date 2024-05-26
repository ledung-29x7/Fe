
function DetailImageRoom({src}) {
    return(
        <div className="w-full h-full relative overflow-hidden">
            <img className="object-cover w-full h-full" src={src} alt=""/>
        </div>
    );
}
export default DetailImageRoom;