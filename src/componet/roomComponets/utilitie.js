

function Utilitie({src,util}) {
    return(
        <div className="flex items-center gap-2">
            <div>
                <img src={src} alt=""/>
            </div>
            <label>{util}</label>
        </div>
    );
}
export default Utilitie;