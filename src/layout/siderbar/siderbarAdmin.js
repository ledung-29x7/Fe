import MenuItem from "./menuItem";

function SiderbarAdmin() {
  return (
    <div className="  font-medium">
      <div className=" flex flex-col gap-10 pt-10  w-full ">
      <MenuItem
        title={"Quản lý người dùng"}
        icon={"fa-solid fa-users"}
        to={"/admin/listUser"}
      />
      <MenuItem
        title={"Quản lý khách sạn "}
        icon={"fa-solid fa-hotel"}
        to={"/admin/listHotel"}
      />
      <MenuItem
        title={"Danh sách bookings"}
        icon={"fa-solid fa-clipboard-list"}
        to={"/admin/listBooking"}
      />
    </div>
    </div>
  );
}
export default SiderbarAdmin;
