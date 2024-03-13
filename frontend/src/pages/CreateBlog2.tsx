import React, { useState } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { Backend_Api } from '../config';

export const CreateBlog2 = () => {


    const [title, setTitle] = useState("");
    const [content,setcontent]= useState("");

    const postBlog=async()=>{
        await axios.post(`${Backend_Api}/api/v1/blog/post`,{
            "title": title,
            "content": content
        },{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
    }


    return <div>
        <div><Navbar></Navbar></div>
        <div className='pt-36 bg-[#def2f1] h-screen'>
            <div className='w-full flex justify-center'>
                <input onChange={(e) => {
                    const value = e.target.value;
                    setTitle(value);
                }} type='text' placeholder='Title' className='border-l-2 bg-[#def2f1] border-slate-400 my-10 h-20 text-2xl p-2 text-slate-600 outline-none'></input>
            </div>
            <div className='flex justify-center w-full'>
                <div className='w-1/2'>
                    <Editor
                        apiKey='k50c9yqdlta3le2g4x2v7cusy7c1s948f7js5jpisfoyd7ms'
                        init={{
                            height: 500,
                            statusbar:false,
                            placeholder: "Type Here...",
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        initialValue=""
                        onEditorChange={(content:any,editor:any)=>{
                            setcontent(content);
                        }}
                    />
                </div>
            </div>
            <div className='flex justify-center mt-8'>
                <button type="button" onClick={postBlog} className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-48">Post</button>
            </div>

        </div>
    </div>

}