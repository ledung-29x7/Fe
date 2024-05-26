import { 
    ISSHOWING,
    ISSHOWINGLOGIN,
    ISSHOWINGEDIT,
    ISSHOWINGADD,
    EDITNDELETE,
    ISSHOWINFOROOM,
    ISSHOWFORMBOOKING,
    GETSEARCH,
    GETIDROOM,
    ISSUCCESSFULL,
    GETPRICEROOM,
    CHECKLOGIN,
    GETIDBOOKING,
    ISSHOWINGDELETE,
    GETINFOBOOKING,
} from "./constants"

// modal SignUp, Login
export const Modal = (isShow) => {
    return {
        type : ISSHOWING,
        isShow
    }
}
export const ModalLogin = (isShowLogin) => {
    return {
        type : ISSHOWINGLOGIN,
        isShowLogin
    }
}

// Modal Admin Edit User, Add User
export const ModalEdit =  (showEdit) => {
    return{
        type : ISSHOWINGEDIT,
        showEdit
    }
}
export const ModalAdd = (showAdd) => {
    return{
        type : ISSHOWINGADD,
        showAdd
    }
}

export const ModalDelete = (showDelete) => {
    return {
        type: ISSHOWINGDELETE,
        showDelete
    }
}

// id Edit and delete
export const getIdEND = (id) => {
    return {
        type : EDITNDELETE,
        id
    }
}

// Informatin Room
export const ModalInforRoom = (isShow) =>{
    return {
        type : ISSHOWINFOROOM,
        isShow
    }
}

// Form Booking
export const ModalFormBooking = (isShow) =>{
    return {
        type : ISSHOWFORMBOOKING,
        isShow
    }
}

// Alart success
export const ModalSuccsessfull = (isSucc) =>{
    return {
        type : ISSUCCESSFULL,
        isSucc
    }
}

// 
export const GetSearch = (search) => {
    return {
        type : GETSEARCH,
        search
    }
}

//get id room
export const GetIdRoom = (id) => {
    return {
        type: GETIDROOM,
        id
    }
}

// get Price Room
export const GetPriceRoom = (price) => {
    return {
        type:GETPRICEROOM,
        price
    }
}

// get Price Room
export const CheckLogin = (blo) => {
    return {
        type:CHECKLOGIN,
        blo
    }
}

// get ID Booking
export const GetIdBooking = (id) => {
    return {
        type: GETIDBOOKING,
        id
    }
}

// get inFo  Booking
export const getInfoBooking = (info) => {
    return {
        type: GETINFOBOOKING,
        info
    }
}

