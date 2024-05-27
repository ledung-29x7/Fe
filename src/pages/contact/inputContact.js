function InputContact({
  style,
  placeholder,
  type,
  nameInput,
  value,
  onChange,
  titleInput,
}) {
  return (
    <div className="w-full">
      <input
        className={`block w-full outline-none rounded-md px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        type={type}
        name={nameInput}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <label className="absolute -top-1 left-4 bg-white px-2 -translate-y-1/2 text-[#475467] text-sm font-semibold">
        {titleInput}
      </label>
    </div>
  );
}

export default InputContact;
