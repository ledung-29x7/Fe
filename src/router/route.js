import Home from "../pages/home/home";
import Hotel from "../pages/hotel/hotel";
import ThingsToDo from "../pages/thingsToDo/thingsToDo";
import Admin from "../pages/admins/homeAdmin/admin";
import DefaultLayoutAdmin from "../layout/defaultLayout/defaultLayoutAdmin";
import ListUser from "../pages/admins/listUser/listUsers";
import ListHotel from "../pages/admins/listHotels/listHotel";
import ListBooking from "../pages/admins/listBookings/listBooking";
import Room from "../pages/roomHotel/room";
import ListRoom from "../pages/manage/listRooms/listRoom";
import HomeManage from "../pages/manage/homeManages/homeManage";
import MyHotel from "../pages/manage/myHotels/myHotel";
import ManagerBooking from "../pages/manage/manageBookings/manageBooking";
import Pay from "../pages/roomHotel/pay";
import BookingComfirmation from "../pages/roomHotel/bookingComfirmation";
import MyBookings from "../pages/roomHotel/myBookings";
import Login from "../layout/user/logIn";
import SignUp from "../layout/user/signUp";
import DefaultLayoutLogin from "../layout/defaultLayout/defaultLayoutLogin";
import EditManagerHotel from "../pages/manage/myHotels/editHotel";
import AddManagerHotel from "../pages/manage/myHotels/addManagerHotel";
import AddImageHotel from "../pages/manage/myHotels/addImageHotel";
import Contact from "../pages/contact/contact";
import DetailHotel from "../pages/manage/myHotels/detailHotel";
import AddImageRoom from "../pages/manage/myHotels/addImageRoom";
import NotFound from "../pages/notFound";
import DefaultLayoutManager from "../layout/defaultLayout/defaultLayoutManager";
import DetailsBookings from "../pages/manage/manageBookings/detailsBooking";
import DetailBookings from "../pages/admins/listBookings/detailBooking";

const publicRoute = [
  { path: "/", componet: Home },
  { path: "/hotel", componet: Hotel },
  { path: "/thingsToDo", componet: ThingsToDo },
  { path: "/admin/listUser", componet: ListUser, layout: DefaultLayoutManager},
  { path: "/admin/listHotel", componet: ListHotel, layout: DefaultLayoutManager },
  {
    path: "/admin/listBooking",
    componet: ListBooking,
    layout: DefaultLayoutManager,
  },
  {path: "/admin/listBooking/detail", componet: DetailBookings, layout: DefaultLayoutManager },
  { path: "/hotel/room/:id", componet: Room },
  {
    path: "/manager/listRooms",
    componet: ListRoom,
    layout: DefaultLayoutAdmin,
  },
  { path: "/manager/myHotels", componet: MyHotel, layout: DefaultLayoutAdmin },
  {
    path: "/manager/manageBookings",
    componet: ManagerBooking,
    layout: DefaultLayoutAdmin,
  },
  { path: "/pay", componet: Pay },
  {
    path: "/bookingConfirmation",
    componet: BookingComfirmation,
  },
  { path: "/bookings", componet: MyBookings },
  { path: "/user/signin", componet: Login, layout: DefaultLayoutLogin },
  { path: "/user/signup", componet: SignUp, layout: DefaultLayoutLogin },
  {
    path: "/manager/myHotels/edit/:id",
    componet: EditManagerHotel,
    layout: DefaultLayoutAdmin,
  },
  {
    path: "/manager/myHotel/add",
    componet: AddManagerHotel,
    layout: DefaultLayoutAdmin,
  },
  {
    path: "/manager/myHotel/add/imagehotel",
    componet: AddImageHotel,
    layout: DefaultLayoutAdmin,
  },
  {
    path: "/manager/myHotel/add/imageroom",
    componet: AddImageRoom,
    layout: DefaultLayoutAdmin,
  },
  {
    path: "/manager/myHotels/detail",
    componet: DetailHotel,
    layout: DefaultLayoutAdmin,
  },
  {path: "/manager/manageBookings/detailbooking", componet: DetailsBookings, layout: DefaultLayoutAdmin},
  { path: "/contact", componet: Contact },
  {path: "/*",componet: NotFound}
];

export default publicRoute;
