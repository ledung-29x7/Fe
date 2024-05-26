import { useReducer } from "react";
import Reducers ,{ initState } from "./reducer";
import Context from "./context";

function Provider ({children}) {
    const [state,dispatch] = useReducer(Reducers, initState)
    return (
        <Context.Provider value={[state,dispatch]}>
            {children}
        </Context.Provider>
    )
}
export default Provider;