import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../store/contexts";
import { actions, actionsGetData } from "../../store/action";
import Search from "./search";
import TitleHome from "../../componet/homeComponets/titleHome";
import LocaltionPicnic30 from "../../componet/homeComponets/localtionPicnic30-30";
import LocaltionPicnic50 from "../../componet/homeComponets/localtionPicnic50-50";

function Home() {


  const location = useLocation();
  const navigate = useNavigate();
  const [, dispatch] = useStore();

  const scrooltotop = () => {
    return window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  };

  const date = new Date();
  var setDateout =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    (date.getDate() + 1);

  const [searchValue, setSearchValue] = useState({
    city: "",
    checkinDate: new Date(),
    checkoutDate: setDateout,
  });

  // xử lý lấy định dạng ngày
  const dateFormatAux = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) date = "0" + day;
    return [year, month, day].join("-");
  };

  // xử lý ngày tháng
  useEffect(() => {
    const date = new Date();
    var setDatein =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setSearchValue({
      ...searchValue,
      checkinDate: dateFormatAux(setDatein),
      checkoutDate: dateFormatAux(setDateout),
    });
  }, []);

  const handleSearch = (ct) => {
    setSearchValue((pre) => ({ ...pre, city: ct }));
  };

  // xử lý
  useEffect(() => {
    try {
      if (searchValue.city.trim() !== "") {
        let queryPrams = new URLSearchParams(location.search);
        queryPrams.set(
          "search",
          searchValue.city + searchValue.checkinDate + searchValue.checkoutDate
        );
        dispatch(actions.GetSearch(searchValue));
        dispatch(actionsGetData.CheckinDate(searchValue.checkinDate));
        dispatch(actionsGetData.CheckoutDate(searchValue.checkoutDate));
        navigate({
          pathname: "/hotel",
          search: queryPrams.toString(),
        });
      } else {
        navigate({
          pathname: "/",
          search: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchValue.city]);

  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <video
          className="home-bn-video"
          src="../0525.mp4"
          autoPlay
          muted
          playsInline
          loop
        ></video>
        <div className="searchBox flex flex-col gap-5 box">
          <div className="flex flex-col gap-2">
            <h4 className=" text-center font-bold text-2xl text-white">
              Rong chơi bốn phương, giá vẫn yêu thương
            </h4>
            <p className=" text-center text-lg text-white opacity-60">
              Hơn 1000 khách sạn giá tốt đang chờ bạn
            </p>
          </div>
          <Search />
        </div>
      </div>

      {/* Popular home */}

      {/* địa điểm du lịch  */}
      <div className="bg-[#f3ffff] px-20 py-20 block gap-6 section-bg">
        <div className=" pb-12 ">
          <TitleHome title="Địa điểm du lịch nổi bật" />
        </div>
        <div className=" ">
          <div className="flex">
            <LocaltionPicnic50
              onClick={() => (handleSearch("Ho Chi Minh"), scrooltotop)}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/DJI_0550-HDR-Pano.jpg/1200px-DJI_0550-HDR-Pano.jpg"
            />
            <LocaltionPicnic50
              onClick={() => (handleSearch("Ha Noi"),scrooltotop)}
              src="https://image.baophapluat.vn/w840/Uploaded/2024/athlraqhpghat/2023_06_25/ho-hoan-kiem-7185.jpg"
            />
          </div>
          <div className="flex">
            <LocaltionPicnic30
              onClick={() => (handleSearch("Da Nang"),scrooltotop)}
              src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/282191292.jpg?k=38172bfb2816610a68304b6f515a16bd0a53d7aa9308ce0e753c37285fc5ee8f&o="
            />

            <LocaltionPicnic30
              onClick={() => (handleSearch("Da Lat"),scrooltotop)}
              src="https://sakos.vn/wp-content/uploads/2023/04/hanh-trinh-kham-pha-da-lat-bang-trai-ngoai-troi-1.png"
            />
            <LocaltionPicnic30
              onClick={() => (handleSearch("Phu Quoc"),scrooltotop)}
              src="https://hanoitourist.vn/sites/default/files/2024/03/kinh-nghiem-du-lich-phu-quoc-cho-gia-dinh-1.jpg"
            />
          </div>
        </div>
      </div>
      {/* Blog ve du lich */}
    </div>
  );
}
export default Home;
