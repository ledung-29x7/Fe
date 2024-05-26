
function Blog({src,titleBlog,info,timeUp}){
    return(
        <div>
             <div className="w-96 flex flex-col gap-5 box" >
                {/* image Hotel */}
                <div className=" p-4 static pb-0 ">
                    <img loading="lazy" className=" rounded-3xl" src={src} alt="" />
                </div>
                {/* info */}
                <div className="flex flex-col ">
                    {/* info Hotel */}
                    <div className=" px-6 flex flex-col gap-4">
                        <p className=" font-bold text-xl opacity-70">{titleBlog}</p>
                        <div className="flex items-center item gap-1 opacity-75 rounded-xl">
                            <p className=" text-sm infoBlog">{info}</p>
                        </div>
                        <p className=" text-sm pb-6">{timeUp}</p>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}
export default Blog;