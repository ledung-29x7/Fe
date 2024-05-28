import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BoxInputUser({ icon, type, nameInput, value, placeholder, onChange, ele,titleInput }) {
    return (
        <div className='sm:col-span-2 mt-2'>
            <label className='flex text-sm font-semibold leading-6 text-gray-900'>
                {titleInput} 
                <p className=' text-red-500'>*</p>
            </label>
            <div className=" relative overflow-hidden mt-2">
                <div className=' absolute top-2 left-3'>
                    <FontAwesomeIcon style={{ color: "#a4adbc" }} icon={icon} />
                </div>
                <input className=" block w-full outline-none rounded-md pl-11 pr-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type={type}
                    name={nameInput}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    required
                    autoFocus={ele}
                />
            </div>
        </div>
    );
}
export default BoxInputUser;