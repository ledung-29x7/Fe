import HeaderAdmin from "../header/headerAdmin";
import SiderbarManager from "../siderbar/siderbarManager";

function DefaultLayoutAdmin({ children }) {
  return (
    <div className=" overflow-y-hidden">
      <div className=" fixed top-0 left-0 z-10 right-0 bg-gray-100 shadow">
        <HeaderAdmin />
      </div>
      <div className=" block  relative ">
        <aside className="fixed top-[97px] shadow-md w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 " aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <SiderbarManager />
          </div>
        </aside>
        <div className="p-10 sm:ml-64 sm:mt-24 ">
          {children}
        </div>
      </div>
    </div>
  );
}
export default DefaultLayoutAdmin;
