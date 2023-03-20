import * as UserApi from "../api/UserRequests";


export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" })
    try {
        const { data } = await UserApi.updateUser(id, formData);
        // console.log("Action ko receive hoa hy ye : ",data)
        dispatch({ type: "UPDATING_SUCCESS", data: data })
    }
    catch (error) {
        dispatch({ type: "UPDATING_FAIL" })
    }
}

export const CreateProfile=(id,formData)=>async(dispatch)=>{
    dispatch({ type: "Create_START" })
    try {
        const { data } = await UserApi.updateUser(id, formData);
        // console.log("Action ko receive hoa hy ye : ",data)
        dispatch({ type: "Create_SUCCESS", data: data })
    }
    catch (error) {
        dispatch({ type: "Create_FAIL" })
    }
}

