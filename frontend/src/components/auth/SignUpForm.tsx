import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import axios from "axios";
import { api } from "../../config/api";
import Swal from 'sweetalert2';
export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formDetails,setformDetails]=useState({
    name:"",
    email:"",
    password:"",
    role:"user"
  });
  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      console.log(formDetails);
      
      const res=await axios.post(api+'userRoutes/signup',formDetails);
      if(res.status==200){
        Swal.fire({
          title:'Signup Success',
          icon:'success',
        });
        sessionStorage.setItem('token',res.data.token);

      }
    } catch (error) {
      Swal.fire({
        title:"Invalid Credentials",
        icon:"error"
      })
    }
  }
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            
            <form onSubmit={onSubmit}>
              <div className="space-y-5">
                <div className="sm:col-span-1">
                  <Label>
                    Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                   value={formDetails.name}
                   onChange={
                     (e)=>{
                       setformDetails({...formDetails,name:e.target.value})
                     }
                   }
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter your name"
                  />
                </div>

                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    value={formDetails.email}
                    onChange={
                      (e)=>{
                        setformDetails({...formDetails,email:e.target.value})
                      }
                    }
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                     value={formDetails.password}
                     onChange={
                       (e)=>{
                         setformDetails({...formDetails,password:e.target.value})
                       }
                     }
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
