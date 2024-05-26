import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function ManageTask({nameTask,icon,link}){
    return(
        <Link to={link} className="box flex flex-col justify-center items-center w-full h-44">
            <FontAwesomeIcon style={{color:"#7a8699"}} size="2xl" icon={icon}></FontAwesomeIcon>
            <span className=" text-2xl font-bold">{nameTask}</span>
        </Link>
    );
}
export default ManageTask;