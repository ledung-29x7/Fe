
function CheckBox({amenities,value,id,onClick}){
    return(
        <div className=" sm:col-span-1 flex items-center gap-3" >
            <input 
                 
                className="option" 
                type="checkbox" 
                name="service" 
                value={value} 
                onClick={onClick}
                
            />
            <label>{amenities}</label>
        </div>
    );
}
export default CheckBox;