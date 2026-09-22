import React, { useState } from 'react'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import NintyPlusLogo from '../components/NintyPlusLogo'

function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const navigate = useNavigate()
  let [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  let dispatch = useDispatch()

  const handleSignUp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/signup", { name, email, password, role }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("SignUp Successfully")
      setLoading(false)
    }
    catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const googleSignUp = async () => {
    try {
      if (!auth || !provider) {
        throw { response: { data: { message: "Google login is not configured. Please use email signup." } } };
      }
      const response = await signInWithPopup(auth, provider)
      console.log(response)
      let user = response.user
      let name = user.displayName;
      let email = user.email
      const result = await axios.post(serverUrl + "/api/auth/googlesignup", { name, email, role, photoUrl: user.photoURL }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("SignUp Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  const inputClass = "w-full h-[44px] rounded-xl border border-gray-200 bg-gray-50 text-[15px] px-4 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200 placeholder:text-gray-400"

  return (
    <div className='bg-gradient-to-br from-gray-100 via-violet-50 to-fuchsia-100 w-[100vw] h-[100vh] flex items-center justify-center p-4 overflow-y-auto'>
      <form className='w-[90%] max-w-4xl md:h-[640px] h-auto bg-white shadow-2xl rounded-3xl flex overflow-hidden my-4' onSubmit={(e) => e.preventDefault()}>
        {/* Form Side */}
        <div className='md:w-[50%] w-[100%] flex flex-col items-center justify-center gap-3 py-8 md:py-0 px-5'>
          <div className='text-center'>
            <h1 className='font-bold text-gray-900 text-3xl'>Let's get Started 🚀</h1>
            <h2 className='text-gray-500 text-[16px] mt-1'>Create your free account</h2>
          </div>

          <div className='flex flex-col gap-1.5 w-[88%]'>
            <label htmlFor="name" className='font-semibold text-gray-700 text-[14px]'>Name</label>
            <input id='name' type="text" className={inputClass} placeholder='Your name' onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div className='flex flex-col gap-1.5 w-[88%]'>
            <label htmlFor="email" className='font-semibold text-gray-700 text-[14px]'>Email</label>
            <input id='email' type="text" className={inputClass} placeholder='Your email' onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className='flex flex-col gap-1.5 w-[88%] relative'>
            <label htmlFor="password" className='font-semibold text-gray-700 text-[14px]'>Password</label>
            <input id='password' type={show ? "text" : "password"} className={inputClass + " pr-11"} placeholder='Create a password' onChange={(e) => setPassword(e.target.value)} value={password} />
            {!show
              ? <MdOutlineRemoveRedEye className='absolute w-[22px] h-[22px] cursor-pointer right-[4%] bottom-[12px] text-gray-400 hover:text-violet-600 transition-colors' onClick={() => setShow(prev => !prev)} />
              : <MdRemoveRedEye className='absolute w-[22px] h-[22px] cursor-pointer right-[4%] bottom-[12px] text-violet-600' onClick={() => setShow(prev => !prev)} />}
          </div>

          <div className='flex w-[88%] items-center justify-between'>
            {["student", "educator"].map((r) => (
              <span
                key={r}
                className={`px-[28px] py-2 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-200 ${role === r
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-200"
                  : "border border-gray-300 text-gray-600 hover:border-violet-400"
                }`}
                onClick={() => setRole(r)}
              >
                {r === "student" ? "Student" : "Educator"}
              </span>
            ))}
          </div>

          <button className='w-[88%] h-[46px] bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold cursor-pointer flex items-center justify-center rounded-xl shadow-lg shadow-violet-200 hover:shadow-violet-400/50 hover:scale-[1.02] active:scale-95 transition-all' disabled={loading} onClick={handleSignUp}>
            {loading ? <ClipLoader size={24} color='white' /> : "Create Account"}
          </button>

          <div className='w-[88%] flex items-center gap-3'>
            <div className='flex-1 h-[1px] bg-gray-200'></div>
            <div className='text-[13px] text-gray-400 whitespace-nowrap'>Or continue with</div>
            <div className='flex-1 h-[1px] bg-gray-200'></div>
          </div>

          <div className='w-[88%] h-[46px] border border-gray-200 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all' onClick={googleSignUp}>
            <img src={google} alt="" className='w-[24px]' />
            <span className='text-[15px] text-gray-600 font-medium'>Continue with Google</span>
          </div>

          <div className='text-gray-500 text-[14px]'>Already have an account?
            <span className='underline underline-offset-2 font-semibold text-violet-600 cursor-pointer ml-1' onClick={() => navigate("/login")}>Login</span>
          </div>
        </div>

        {/* Brand Side */}
        <div className='w-[50%] hidden md:flex flex-col items-center justify-center gap-6 animated-gradient-bg relative overflow-hidden'>
          <div className='absolute top-10 right-10 w-28 h-28 rounded-full bg-violet-500/30 blur-2xl animate-float' />
          <div className='absolute bottom-16 left-10 w-36 h-36 rounded-full bg-fuchsia-500/30 blur-2xl animate-float-slow' />
          <NintyPlusLogo size={84} showWord={false} className="animate-fade-up" />
          <span className='text-white text-3xl font-bold tracking-wide animate-fade-up delay-150'>NINTYPLUS</span>
          <p className='text-white/70 text-[15px] max-w-[260px] text-center animate-fade-up delay-300'>Join thousands of learners building skills for tomorrow.</p>
        </div>
      </form>
    </div>
  )
}

export default SignUp