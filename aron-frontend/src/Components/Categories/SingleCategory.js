import React from 'react'

import { useState } from 'react';
import { useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import { useEffect } from 'react';

import './SingleCard.css'


import axios from 'axios'
import GooleMap from '../GoogleMap/GooleMap';


const SingleCategory = () => {

    const [singlekat, setSinglekat] = useState([])


    const title = useParams(); // id nam je parametri iz URL-a

    const navigate = useNavigate();

    const [report, setReport] = useState([]);

    const [titlepost, setTitlepost] = useState('')

    const [descpost, setDescPost] = useState('')

    const [imagePost, setImagepost] = useState(null)

    const [anotherPage, setAnotherPage] = useState(false)


    const [address, setAddress] = useState('')

    const [nameimage, setImageName] = useState('')




    const id = useParams()

    console.log(id.Id)


    const handleSubmit = (e) => {
        e.preventDefault();
        setTitlepost(titlepost);
        setDescPost(descpost)
        console.log(nameimage)

        axios.post("http://localhost:3001/reports", {

            title: titlepost,
            report_desc: descpost,
            SubcategoryId: id.Id,
            address: address,
            img: nameimage



        })
            .then((response) => {
                setDescPost(response.data)
                console.log(response)
            });

        alert("Check My Reports")

    }

    return (
        <div>
            <div className="flex justify-center  flex-col column items-center py-40 px-4 border-t dark:border-gray-600">
                <p className='font-medium leading-tight text-5xl mt-0 mb-2 text-yellow-300 sans-serif '>REPORT:</p>
                <div className="mb-2  bg-gray-50 rounded-lg border border-yellow-200 dark:bg-gray-700 dark:border-gray-600" >
                    <div className="flex justify-end justify-end inline-flex py-7 px-3">

                    </div>
                    <div className='flex  items-center flex-col' >
                        <input
                            type="text"
                            name="descpost"
                            placeholder="Input Title"
                            value={titlepost}
                            onChange={(e) => setTitlepost(e.target.value)}
                        />
                    </div>
                    <div className='flex  py-7 px-3 items-center flex-col'>
                        <input placeholder='Type Address.....' value={address} onChange={(e) => setAddress(e.target.value)} />

                    </div>
                    <div className="flex justify-center items-center py-7  dark:border-gray-600">
                        <textarea className=" mb-2 w-1/2 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                            type="text"
                            name="titlepost"
                            placeholder="ENTER......."
                            value={descpost}
                            onChange={(e) => setDescPost(e.target.value)}
                        />
                    </div>


                    <div className='items-center flex justify-center p-3 '>
                        <GooleMap className="" />

                    </div>
                    <label className=''>Upload image:</label>
                    <br />



                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd">
                        <input
                            type="file"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#3c9] rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800" onChange={(e) => {
                                e.preventDefault();
                                const formData = new FormData();
                                formData.append("for", "logo");
                                formData.append("image", e.target.files[0]);

                                axios.post(`http://localhost:3001/reports/image-upload`, formData,
                                    {
                                        headers: {
                                            "Content-Type": "multipart/form-data"
                                        },
                                        withCredentials: true
                                    })
                                    .then((response) => {
                                        if (response.data.img_name) {
                                            setImageName(response.data.img_name)
                                            alert("Uploaded!");


                                        }
                                        else {
                                            alert("Not able to upload!");
                                        }

                                    })
                                    .catch((err) => { console.log(err) });
                            }}
                        />
                    </path>
                    <div className='p-3 justify-center '>
                        <button className=" items-center py-3 px-7  text-xs font-medium  text-white bg-[#3c9] rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>





            </div >



        </div >
    )
}

export default SingleCategory


