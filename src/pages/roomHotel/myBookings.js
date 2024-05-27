import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as apis from "../../apis";
import { useState, useEffect } from "react";
import TableBooked from "../../componet/roomComponets/tableBooked";

function MyBookings() {
  const [infoBooked, setInfoBooked] = useState([]);
  const [checkEmty, setCheckEmty] = useState(false);
  const [errors, setErrors] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await apis.HistoryBookings("customer/bookings");
        setInfoBooked(response);
      } catch (error) {
        if (error.response.status === 403) {
          setErrors("Vui lòng đăng nhập tài khoản custumer để xem danh sách")
        }
        setShowError(true)
      }
    };
    FetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowError(false)
    }, 8000);

  },[showError])

  useEffect(() => {
    if (infoBooked?.length > 0) {
      setCheckEmty(true);
    }
  }, [infoBooked]);

  return (
    <div className="bg-[#CDD0D1]/[.44] ">
      <div className=" flex m-auto py-8 w-[1200px] min-h-[720px]">
        <div className=" px-3 flex-1 bg-white py-5 rounded-md shadow">
          {/* <h1
            dir="auto"
            role="heading"
            className=" mb-4 text-2xl text-left font-medium text-[#030810]"
          >
            Đặt chỗ chưa hoàn tất
          </h1> */}
          <a
            href="/bookings"
            className="flex items-center p-2 rounded-md group bg-[#0264c8] hover:bg-[#0264c8] active:bg-[#0264b8]"
          >
            <div className=" pr-4 text-2xl text-white group-hover:text-gray-300">
              <FontAwesomeIcon
                icon="fa-solid fa-rectangle-list"
                rotation={180}
              />
            </div>
            <div className=" group-hover:text-gray-300 text-sm font-semibold text-white  ">
              Tất cả danh sách booking
            </div>
          </a>
        </div>
        {/*  */}
        {checkEmty ? (
          <div className="flex items-stretch flex-col flex-[3_1_0%] pl-3">
            <TableBooked bookings={infoBooked} />
          </div>
        ) : (
          <div className=" flex items-stretch flex-col flex-[2_1_0%] px-3">
            {/* banner login */}
            {/* <div className=" mb-3 ">
              <div className="bg-[#1BA0E2] flex items-center shadow rounded-md p-6 ">
                <div className=" text-8xl text-cyan-100 ">
                  <FontAwesomeIcon icon="fa-solid fa-list-check" />
                </div>
                <div className=" flex flex-col items-stretch ml-6 flex-1 text-white">
                  <h3
                    aria-level="3"
                    dir="auto"
                    role="heading"
                    className=" mb-3 font-bold text-left"
                  >
                    Xem lịch sử đặt phòng của bạn
                  </h3>
                  <div dir="auto" className=" text-sm">
                                        <a className=" underline" href="/user/signin">Đăng nhập</a>
                                        <span> vào tài khoản Đặt chỗ của bạn hoặc </span>
                                        <a className=" underline" href="/">Đăng ký</a>
                                        <span> để xem lịch sử đặt phòng  hiện tại và trước đây của bạn, cũng như quản lý việc đặt phòng của bạn</span>
                                    </div>
                </div>
              </div>
            </div> */}
            {/* list history */}
            <div className=" bg-white flex items-center shadow rounded-md p-6">
              <img importan src="./icon/icon-emptyList.svg" alt="" />

              <div className=" mx-6">
                <h3
                  aria-level="3"
                  dir="auto"
                  role="heading"
                  className=" my-3 font-bold text-left"
                >
                  Không đặt chỗ chưa hoàn thành
                </h3>
                <div dir="auto" className=" text-sm">
                  <div dir="auto" className="">
                    Nếu bạn không thể hoàn tất quá trình đặt chỗ, chúng tôi sẽ
                    lưu nó ở đây!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showError ?
          <div className=" fixed top-24 right-6 w-80 text-center bg-white shadow-md">
            <div className="w-full h-1 bg-red-500"></div>
            <div className=" py-4 text-xs px-4 font-semibold text-red-400 ">{errors}</div>
          </div>
          :
          null}
      </div>
    </div>
  );
}
export default MyBookings;
