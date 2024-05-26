
function TitleHome({title,introduce}){
    return(
        <div className="flex justify-between">
            <div className="flex flex-col gap-5 ">
                <h4 className="font-bold text-4xl w-full">
                    {title}
                </h4>
                {/* <img className="w-24" src="../icon/heading-border.png" alt="" /> */}
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