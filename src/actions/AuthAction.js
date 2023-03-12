import * as AuthApi from'../api/AuthRequest'
{/* Interaact with API*/}

{/*formData is paramétre that i have recive from component AUTH */}
export const logIn=(formData)=>async(dispatch)=>{

    {/*Interact with  the Database so i have the try/catch block */}

  dispatch({type:"AUTH_START"})
   {/*dispatch permet to  interact with reducer */}    
    try {
        
        const{data}=await AuthApi.logIn(formData)
        dispatch({type:"AUTH_SUCCESS" , data:data})

    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}

export const signUp=(formData)=>async(dispatch)=>{

    dispatch({type:"AUTH_START"})     
      try {
          
          const{data}=await AuthApi.signUp(formData)
          dispatch({type:"AUTH_SUCCESS" , data:data})
  
      } catch (error) {
          console.log(error)
          dispatch({type:"AUTH_FAIL"})
      }
  }