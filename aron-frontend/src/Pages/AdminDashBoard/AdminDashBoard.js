import React, { useEffect, useState } from 'react'
import axios from "axios";

const AdminDashBoard = () => {

    const [reportsList, setReportsList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/reports/tocheck', {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                setReportsList(res.data)
            })

            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div className='flex flex-col align-start h-screen max-w-5xl mx-auto'>
            <div className='text-3xl text-left px-4 mt-4'>Admin Dashboard</div>
            <div className='py-4 inline-block min-w-full overflow-hidden '>
                <table className='min-w-full text-center'>
                    <thead className="border-b bg-[#3c9]">
                        <tr>
                            <th className='text-sm font-medium text-white px-6 py-4'>id</th>
                            <th className='text-sm font-medium text-white px-6 py-4'>title</th>
                            <th className='text-sm font-medium text-white px-6 py-4'>subcategory</th>
                            <th className='text-sm font-medium text-white px-6 py-4'></th>
                            <th className='text-sm font-medium text-white px-6 py-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                    {reportsList.map((report, i) => {
                        return (
                            <tr className='bg-white border-b'>
                                <td>{report.id}</td>
                                <td>{report.title}</td>
                                <td>{report.SubcategoryId}</td>
                                <td><button
                                    className='px-2 py-1 bg-red-600 text-white rounded'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        axios.delete(`http://localhost:3001/reports/${report.id}`, {
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            withCredentials: true
                                        })
                                            .then((response) => {
                                                console.log(response);
                                                setReportsList(reportsList.filter(item => item.id !== report.id));
                                                
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            })
                                    }}>Delete</button></td>
                                <td><button 
                                    className='px-2 py-1 bg-green-600 text-white rounded'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        axios.put(`http://localhost:3001/reports/approve/${report.id}`, {}, {
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            withCredentials: true
                                        })
                                            .then((response) => {
                                                console.log(response);
                                                setReportsList(reportsList.filter(item => item.id !== report.id));
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            })
                                    }}>Approve</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDashBoard