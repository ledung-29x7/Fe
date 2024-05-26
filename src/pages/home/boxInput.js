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
    <div className=" border flex justify-center gap-2 bg-white rounded-md px-3 flex-1 ">
      <div className="flex justify-center items-center">
        <FontAwesomeIcon style={style} icon={icon} />
      </div>
      <input
        className=" text-left w-full outline-none placeholder:text-sm   "
        aria-invalid={ai}
        type={type}
        name={nameInput}
        value={value}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </div>
  );
}
export default BoxInput;
