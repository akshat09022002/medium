
type blogcontent = {
    title: string
    content: string
    firstname: string
    lastname: string
    published: string
}

function getInitials(fname: string, sname: string) {

    if (sname.trim().length > 0) return fname.trim()[0] + sname.trim()[0];
    else if (fname.trim().length == 1) return fname.trim()[0];
    else return fname.trim()[0] + fname.trim()[1];

}

export const BlogCard = (props: blogcontent) => {
    return <div className=" border-b-2">
        <div className="flex justify-normal m-4">
            <div className="m-1 ml-2 flex flex-col justify-center">
                <div className=" inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <div className="font-medium text-gray-600 dark:text-gray-300">{getInitials((props.firstname || "").toUpperCase(), (props.lastname || "").toUpperCase())}</div>
                </div>
            </div>
            <div className="mx-2 font-thin text-xs flex flex-col justify-center">&#8226;</div>
            <div className="m-1 ml-2 text-slate-700 flex flex-col justify-center">
                {props.firstname + " " + props.lastname}
            </div>
            <div className="mx-2 font-thin text-xs flex flex-col justify-center">&#8226;</div>
            <div className="m-1 ml-2 text-slate-700 flex flex-col justify-center">
                {props.published}
            </div>
        </div>
        <div className="cursor-pointer">
            <div className="text-2xl font-semibold m-4">
                {props.title}
            </div>
            <div className="m-4 text-lg font-serif">
                <div className="max-h-32 p-2 overflow-hidden flex" dangerouslySetInnerHTML={{ __html: (props.content.length<=400 ? props.content : (props.content+ "...")) }}></div>
            </div>
        </div>
        <div className="m-4 text-sm text-slate-600">
            {Math.ceil(props.content.length / 205)} min read
        </div>
    </div>
}