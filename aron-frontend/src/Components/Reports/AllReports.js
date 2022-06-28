import React from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios'
const Report = () => {

    const [requestdata, setRequestData] = useState([])

    console.log(requestdata)

    useEffect(() => {

        axios.get('http://localhost:3001/reports/', {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                setRequestData(res.data)
            })

            .catch(err => {
                console.log(err)
            })

    }, [])



    return (
        <>


            {requestdata.map((item) => (

                <div className='flex justify-center py-5'>
                    <div className="shadow drop-shadow-2xl sm:rounded-md pt-12 sm:overflow-hidden">

                        <div className="px-4 py-5  bg-white space-y-6 sm:p-6">
                            <div className="block p-6 rounded-lg  bg-white max-w-sm text-gray-900 text-xl leading-tight font-medium mb-2">
                                <label>Title:{item.title}</label>
                            </div>
                            <h1>Picture Of Report</h1>

                            { /*
                                <div className="mt-1 flex justify-center  align-center   border-2 border-gray-300 border-dashed rounded-md ">
                                    <img className="space-y-1 text-gray-400" alt="not fount" src={`http://localhost:3001/images/${item.img}`} }  />
                                </div>

                                */}

                            <div className='w-full h-fit '>
                                <img className="" alt="" src={`http://localhost:3001/images/${item.img}`} />
                            </div>




                            <div>
                                <label className=''>Description:</label>
                                <div className='block p-5 rounded-lg shadow-lg bg-white max-w-sm text-gray-900 text-xl leading-tight font-medium mb-2'><p>{item.report_desc}</p></div>
                            </div>
                            <div className='block p-5 rounded-lg shadow-lg bg-white max-w-sm text-gray-900 text-xl leading-tight font-medium mb-2'>
                                <label>Where did you take picture:
                                    {item.address}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default Report