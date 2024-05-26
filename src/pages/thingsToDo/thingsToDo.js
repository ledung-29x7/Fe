import Blog from "../../componet/thingsToDoComponets/blog";

function ThingsToDo() {
    return (
        <div className=" containerr py-20">
            <div className="flex flex-col text-left gap-6 w-2/5">
                <h4 className=" text-4xl font-bold">Khám Phá các điểm du lịch và Cập nhật tin tức mới</h4>
                <p>Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này.</p>
                <img className=" w-40" src="./icon/heading-border.png" alt="" />
            </div>
            <div className=" mt-14">
                <Blog src="https://minio.fares.vn/mixivivu-dev/tour/blog/images/apbb39vj3e99sczz.webp"
                    titleBlog="Top 5 resort nổi tiếng ở Hạ Long"
                    info="Nếu bạn chưa tìm được khu nghỉ dưỡng sang xịn tại Hạ Long, hãy để Mixi Vivu gợi ý giúp bạn 6 resort Hạ Long đáng để trải nghiệm trong chuyến du lịch khám phá vùng đất tươi đẹp nơi đây nhé!"
                    timeUp="12/12/2022"
                />
            </div>
        </div>
    );
}
export default ThingsToDo;