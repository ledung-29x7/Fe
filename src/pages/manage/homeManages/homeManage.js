import ManageTask from "./manageTask";
function HomeManage(){
   return(
    <div className="my-14">
    <div className=" containerr flex gap-12 h-full">
        <ManageTask
        link={"/manager/listRooms"}
        nameTask="Room Lists"
        icon="fa-solid fa-key" 
        />
        <ManageTask
        link={"/manager/myHotels"}
        nameTask="My Hotel"
        icon="fa-solid fa-hotel"
        />
        <ManageTask
        link={"/manager/manageBookings"}
        nameTask="List Booking"
        icon="fa-solid fa-calendar-days" 
        />
    </div>

</div>
   );
}
export default HomeManage;