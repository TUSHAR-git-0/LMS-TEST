import { useEffect } from "react"
import { serverUrl } from "../App"
import axios from "axios"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { setUserData } from "../redux/userSlice"
const getCurrentUser = ()=>{
    let dispatch = useDispatch()
   
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                let result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
                dispatch(setUserData(result.data))

            } catch (error) {
            if (error.response?.status !== 400) {
                toast.error(error.response?.data?.message || "Something went wrong")
            }
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser