import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BoxInput({
  style,
  placeholder,
  ai,
  type,
  icon,
  onKeyDown,
  onChange,
  nameInput,
  value,
}) {
  return (
    <div className=" relative flex-1 ">
      <div className="absolute top-4 left-4">
        <FontAwesomeIcon style={style} icon={icon} />
      </div>
      <input
        className=" w-full outline-none placeholder:text-sm bg-white rounded-md pl-11 pr-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset font-semibold ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-10  "
        aria-invalid={ai}
        type={type}
        name={nameInput}
        value={value}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        required
      />
    </div>
  );
}
export default BoxInput;
