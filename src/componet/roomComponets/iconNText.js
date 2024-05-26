
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconNText({text,icon,style}) {
    return(
        <div className="flex items-center gap-2 text-gray-600">
            <FontAwesomeIcon icon={icon} style={style} />
            <label>{text}</label>
        </div>
    );
}
export default IconNText;