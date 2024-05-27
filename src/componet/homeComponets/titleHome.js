
function TitleHome({title,introduce}){
    return(
        <div className="flex justify-between">
            <div className="flex ">
                <h4 className=" font-semibold text-gray-700 text-xl w-full">
                    {title}
                </h4>
            </div>
            <div className="w-72">
                <p className="text-lg opacity-65">
                    {introduce}
                </p>
            </div>
        </div>
    );
}

export default TitleHome;