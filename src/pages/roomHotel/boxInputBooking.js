import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function BoxInputBoonking({style,icon,type,nameInput,value,placeholder,onChange}) {
    return (
        <div className="flex items-center gap-2 w-full outline-none">
            <div className='pl-1 '>
                <FontAwesomeIcon style={style} icon={icon} />
            </div>
            <input className=" h-6 outline-none"
                type={type}
                name={nameInput}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}
export default BoxInputBoonking;