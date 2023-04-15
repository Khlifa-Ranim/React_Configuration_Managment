import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {MeDeleteForever} from "react-icons/all"
import {deleteUsers} from "../../../redux/UserSlices/DeleteUserSlice"


const DeleteUser=()=> {

const users = useSelector((state) =>console.log(state.user));
const dispatch=useDispatch()


const deleteUser =(id)=>{
  dispatch(deleteUsers(id))

}

  return (<div>
    {
        users.map((user,id)=>{
            return
            <li key={id}> 
                {user}
                <button className='btn-delete' onClick={()=>deleteUser(id)}>
                    <MeDeleteForever className="delete-icon"/>
                </button>
            </li>
        })
    }
  </div>)
}

export default DeleteUser