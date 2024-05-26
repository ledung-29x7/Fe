import { NavLink } from "react-router-dom";

function MenuItem({to,title}){
    return(
        <NavLink className=" h-full"  to={to}>
            <div className=" navigation flex font-bold items-center h-full ">
                {title}
            </div>
        </NavLink>
    );
}

export default MenuItem;