import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../../store/contexts';
import { actions,actionsGetData } from '../../store/action';
import BoxInput from './boxInput';
import { DatePicker } from "antd";
import dayjs from 'dayjs'

function Search({setSearch}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [, dispatch] = useStore();

    const date = new Date();
    var setDateout = date.getFullYear()+"-"+ (date.getMonth()+1) + "-" + (date.getDate()+1);
    
    const [searchValue, setSearchValue] = useState({
        city: setSearch?.city || "" ,
        checkinDate: new Date(),
        checkoutDate: setDateout
    })
    console.log(searchValue)
    
    const { RangePicker } = DatePicker;
    const disabledDate = (current) => {
        // Không thể chọn ngày trước ngày hiện tại
    return current && current < dayjs().endOf('day')
    }

    // xử lý lấy định dạng ngày
    const dateFormatAux = (date) => {
        
        let d = new Date(date),
            month = '' + (d.getMonth()+1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length<2) 
            month = "0" + month;
        if(day.length<2)
            date ="0" + day;
        return [year, month, day].join('-')
    }

    // xử lý khi thay đổi ngày
    const handleinDate = (dates,dateStrings) => {
        
        setSearchValue({
            ...searchValue,
            checkinDate:dateFormatAux(dateStrings[0]) && dateFormatAux(dates[0]),
            checkoutDate:dateFormatAux(dateStrings[1] && dateFormatAux(dates[1]))
        })
    }
    
    //  xử lý khi thay điền thông tin cần search
    const handleSearch = (e) => {
        setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
    }
    
    // xử lý 
    const handleKeyDown = (e) => {
        try {
            e.preventDefault();
            if (searchValue.city.trim() !== "") {
                let queryPrams = new URLSearchParams(location.search)
                queryPrams.set("search", searchValue.city + searchValue.checkinDate + searchValue.checkoutDate)
                dispatch(actions.GetSearch(searchValue))
                dispatch(actionsGetData.CheckinDate(searchValue.checkinDate))
                dispatch(actionsGetData.CheckoutDate(searchValue.checkoutDate))
                navigate({
                    pathname: "/hotel", 
                    search: queryPrams.toString(date)
                })
            } else {
                navigate({
                    pathname: "/",
                    search: ""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    // xử lý ngày tháng
    useEffect(() => {
        const date = new Date();
        var setDatein = date.getFullYear()+"-"+ (date.getMonth() + 1) + "-" + date.getDate();
        setSearchValue({
            ...searchValue,
            checkinDate:dateFormatAux(setDatein),
            checkoutDate:dateFormatAux(setDateout)
        })
    }, [])

    return (
        <form className=" flex gap-5 " onSubmit={handleKeyDown}>
            <BoxInput
                style={{ color: "#667085" }}
                placeholder="Bạn muốn đi đâu? "
                type="text"
                icon="fa-solid fa-magnifying-glass"
                nameInput="city"
                value={searchValue.city}
                onChange={handleSearch}
            />
            <RangePicker
                
                placeholder={"ngày nhận và trả phòng"} 
                className='flex-1 focus-within:border-2 px-4 text-xl'
                onChange={handleinDate}
                defaultValue={[dayjs(searchValue.checkinDate),dayjs(searchValue.checkoutDate)]}
                disabledDate={disabledDate} 
                format={"DD/MM/YYYY"}
            />
           
            <div className="flex items-center ">
                <button className=" bg-cyan-400 px-5 py-4 transition duration-300 rounded-md font-bold hover:bg-cyan-800 hover:text-white">Tìm kiếm</button>
            </div>
        </form>
    );
}
export default Search;