import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authfields } from "../components/Authfields"
import { Quote } from "../components/Quote"
import { Authfields2 } from "../components/Authfields2"
import { BlinkingLogo } from "../components/BlinkingLogo"


export const Signup = () => {
    return <div className="grid lg:grid-cols-2">

        <div className="h-screen bg-[#3aafa9]">
            <BlinkingLogo></BlinkingLogo>
            <div className="h-5/6 flex flex-col justify-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Authfields} ></Route>
                    <Route path="/signin" Component={Authfields2}></Route>
                </Routes>
            </BrowserRouter>
            </div>
        </div>
        <Quote></Quote>
        
    </div>
}