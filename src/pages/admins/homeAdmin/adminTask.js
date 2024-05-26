import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AdminTask({ nameTask,icon,link }) {
    return (

        <Link to={link} className="box flex flex-col justify-center items-center w-full h-44" >
            <FontAwesomeIcon style={{color:"#7a8699"}} size="2xl"  icon={icon}  />
            <span className=" text-2xl font-bold">{nameTask}</span>
        </Link>

    );
}
export default AdminTask;