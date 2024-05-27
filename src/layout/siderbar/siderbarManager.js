import MenuItem from "./menuItem";

function SiderbarManager() {
  return (
    <div className="  font-medium">
      <div className=" flex flex-col gap-10 pt-10  w-full ">
      <MenuItem
        title={"Quản lý khách sạn"}
        icon={"fa-solid fa-hotel"}
        to={"/manager/myHotels"}
      />
      <MenuItem
        title={"Danh sách bookings"}
        icon={"fa-solid fa-calendar-days"}
        to={"/manager/manageBookings"}
      />
    </div>
    </div>
  );
}
export default SiderbarManager;
