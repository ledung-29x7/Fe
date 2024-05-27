import RowMyBookings from "./rowMyBookings";

function TableBooked({bookings}) {

    return(
        <div className=" my-2 pl-4">
            <div className=" ">
                <div className=" flex justify-between items-center">
                    <div className="flex flex-col gap-5">
                        <h4 className=" font-semibold text-xl text-gray-700">
                            Lịch sử booking
                        </h4>
                        
                    </div>
                </div>
                <div className=" mt-5 relative">
                    <table className=" w-full rounded-md overflow-hidden ">
                        <thead className=" bg-[#0264c8] text-white text-left text-sm  h-12">
                            <th>Tên người dùng</th>
                            <th>Tên khách sạn</th>
                            <th>Ngày check in</th>
                            <th>Ngày check out</th>
                            <th>Tổng tiền</th>
                            <th>Chi tiết</th>
                        </thead>
                        {bookings?.map((dt)=>
                            <RowMyBookings
                                booking={dt}
                            />
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}
export default TableBooked;