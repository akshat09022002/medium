import { Authfields } from "../components/Authfields"
import { Quote } from "../components/Quote"


export const Signup = () => {
    return <div className="grid lg:grid-cols-2">

        <div className="h-screen bg-[#3aafa9]">
            <div className="h-1/6 p-7">
                <h1 className="text-4xl hover:text-white font-mono overline">blogster</h1>
            </div>
            <div className="h-5/6 flex flex-col justify-center">
            <Authfields></Authfields>
            </div>
        </div>
        <Quote></Quote>
        
    </div>
}