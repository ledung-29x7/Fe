import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MenuItem({ title, to, icon }) {
  return (
    <div className=" flex pl-5">
      <NavLink className=" flex items-center px-1 pb-2 justify-between gap-4 text-[#7a8699] " to={to}>
        <FontAwesomeIcon
          size="lg"
          icon={icon}
        />
        <span className=" text-sm font-semibold">{title}</span>
      </NavLink>
    </div>
  );
}
export default MenuItem;
