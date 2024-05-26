import AdminTask from "./adminTask";

function Admin() {

    return (
        <div className=" my-14 ">
            <div className=" containerr flex gap-12 h-full ">
                <AdminTask
                    link={"/admin/listUser"}
                    nameTask="User List"
                    icon="fa-solid fa-user"
                />
                <AdminTask
                    link={"/admin/listHotel"}
                    nameTask="List Hotel"
                    icon="fa-solid fa-house"
                />
                <AdminTask
                    link={"/admin/listBooking"}
                    nameTask="List Booking"
                    icon="fa-solid fa-list"
                />

            </div>
        </div>
    );
}
export default Admin;