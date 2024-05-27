function InputRoom({
  placeholder,
  nameInput,
  value,
  onChange,
  titleInput,
  type,
  max,
}) {
  return (
    <div className=" mt-8">
      <div className=" relative  outline-none">
        <input
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
          type={type}
          placeholder={placeholder}
          name={nameInput}
          value={value}
          onChange={onChange}
          maxLength={max}
        />
        <label className="absolute top-0 left-4 bg-white px-2 -translate-y-1/2 text-[#475467] text-sm font-semibold">
          {titleInput}
        </label>
      </div>
    </div>
  );
}
export default InputRoom;
