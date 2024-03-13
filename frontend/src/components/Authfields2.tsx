import { SigninInput, SignupInput } from "@hitemup09/blogsite-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SuccessAlert } from "./Alert"
import { Backend_Api } from "../config"

export const Authfields2= () => {
    const navigate=useNavigate();

    const [postInputs, setInputs] = useState<SigninInput>({
        email: "",
        password: ""
    })
    const [success, setsuccess] = useState("");
    const [msg, setmsg] = useState("");


    return <div>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center w-1/2">
                <div className="text-center">
                    <div className="font-bold text-4xl mb-2 text-black">
                        Sign in
                    </div>
                    <div className="font-semibold text-white">
                        Don't have an account? <Link to={"/"} className="underline">Signup</Link>
                    </div>
                </div>
                <div className="mt-6">
                    <LabelledInput title="Email" placeholder="example@email.com" type="email" onChange={(e) => {
                        setInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}></LabelledInput>
                    <LabelledInput title="Password" placeholder="password" type="password" onChange={(e) => {
                        setInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></LabelledInput>

                </div>
                <SuccessAlert success={success} msg={msg}></SuccessAlert>
                <div className="w-full flex justify-center mt-4">
                    <button onClick={async () => {
                        try {
                            const response = await axios.post(`${Backend_Api}/api/v1/user/signin`, {
                                email: postInputs.email,
                                password: postInputs.password
                            });
                            localStorage.setItem("token",response.data.jwt);
                            setsuccess("success");
                            setmsg("Successfully Logged In")
                            navigate('/home')
                            
                        } catch (e: any) {
                            const status = e.response.status;
                            if(status=="403" || "422"){
                                setsuccess("warning");
                                setmsg("Invalid Login Credentials")
                            }
                            else{
                                setsuccess("invalid");
                                setmsg("Something Went Wrong")
                            }
                        }

                    }
                    } type="button" className="text-white bg-gray-800 w-2/5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
                </div>

            </div>

        </div>
    </div>
}

type label = {
    title: String
    placeholder: any
    type: any
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput(props: label) {
    return <div className="m-2">
        <label className="block mb-2 text-sm font-medium text-black dark:text-white">{props.title}</label>
        <input type={props.type} onChange={props.onChange} className="border border-black text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder={props.placeholder} required />
    </div>
}