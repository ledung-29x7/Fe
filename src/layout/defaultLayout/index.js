import HeaderUp from "../header/headerUp";
import Footer from "../footer/footer";

function DefaultLayout({children}){
    
    return(
        <div className="">
            <div className=" header-wapper">
                <HeaderUp/>
            </div>
            <div>
                <div>
                    {children}
                </div>
            </div>
            <div>
                <Footer/>
            </div>
            
        </div>
    );
}
export default DefaultLayout;