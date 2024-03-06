import { SignupInput } from "@hitemup09/blogsite-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"

export const Authfields = () => {

    const [postInputs, setInputs] = useState<SignupInput>({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })


    return <div>
        <div className="flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="text-center">
                    <div className="font-bold text-3xl mb-2 text-black">
                        Create An Account
                    </div>
                    <div className="font-semibold text-white">
                        Already Have An Account? Login
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between">
                        <LabelledInput title="First Name" placeholder="John" type="text" onChange={(e) => {
                            setInputs({
                                ...postInputs,
                                firstname: e.target.value
                            })
                        }}></LabelledInput>
                        <LabelledInput title="Last Name" placeholder="Carter" type="text" onChange={(e) => {
                            setInputs({
                                ...postInputs,
                                lastname: e.target.value
                            })
                        }}></LabelledInput>
                    </div>
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
                <div className="w-full flex justify-center mt-4">
                    <button type="button" className="text-white bg-gray-800 w-2/5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Create Account</button>
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