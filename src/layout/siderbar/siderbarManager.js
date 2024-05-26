import MenuItem from "./menuItem";

function SiderbarManager() {
  return (
    <div className=" flex flex-col gap-6 pt-10 ">
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
  );
}
export default SiderbarManager;
