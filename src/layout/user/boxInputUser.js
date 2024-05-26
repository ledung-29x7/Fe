import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BoxInputUser({icon,type,nameInput,value,placeholder,onChange}) {
    return (
        <div className="flex items-center gap-2 w-full box h-11 outline-none">
            <div className='pl-4 pb-1 '>
                <FontAwesomeIcon style={{ color: "#a4adbc" }} icon={icon} />
            </div>
            <input className=" outline-none"
                type={type}
                name={nameInput}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}
export default BoxInputUser;