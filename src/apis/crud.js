import axios from "../axios";

// lấy dữ liệu User, hotel
export const getUser = (ad) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `admin/${ad}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

//
export const getInfoEdit = (ad, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `admin/${ad}/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// lấy địa chỉ để tìm kiếm
export const getAddress = (search) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "search/availability",
        method: "GET",
        params: {
          city: search.city,
          checkinDate: search.checkinDate,
          checkoutDate: search.checkoutDate,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// lấy thông tin các phòng của hotel đấy
export const getRoom = (search, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `search/${id}`,
        method: "GET",
        params: {
          checkinDate: search.checkinDate,
          checkoutDate: search.checkoutDate,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

//lấy ảnh hotel
export const GetImage = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `image/view/${id}`,
        method: "GET",
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// admin thêm người dùng
export const addUser = (post) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "admin/",
        data: post,
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// đăng ký
export const SignUp = (post) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("auth/signup", post);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// đăng nhập
export const Login = (post) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("auth/login", post, {
        withCredentials: true,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// admin chỉnh sửa người dùng
export const editUser = (host, id, put) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `admin/${host}/${id}`,
        data: put,
        method: "put",
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// manager lấy list hotel
export const getManager = (host) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `manager/${host}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// chỉnh sửa hotel and room hotel
export const editRoom = (host, id, put) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `manager/${host}/${id}`,
        method: "put",
        data: put,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// BOOKING
export const Booking = (bok) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `booking/initiate`,
        method: "POST",
        data: bok,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// PAYMENT
export const Payment = (pay) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `booking/payment`,
        method: "post",
        data: pay,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// confirmation
export const Confirmation = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `booking/confirmation/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// Add Hotel Manager
export const AddManagerHotel = (add) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `manager/hotels`,
        method: "post",
        data: add,
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Add Image
export const AddImage = (host, id, dt) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/image/upload/${host}/${id}`,
        method: "post",
        data: dt,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Get list Custommer Booked
export const HistoryBookings = (host) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${host}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// Log Out
export const LogOut = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `auth/logout`,
        method: "post",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// contact
export const addContact = (post) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("contact/", post);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const Delete = (host) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${host}`,
        method: "delete",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
