import React from 'react'

import { useEffect, useState } from 'react'

import { DATA } from '../../data'
import SingleCategory from './SingleCategory'

import axios from 'axios'

import SubCategory from './SubCategory'

import main_bg from "../../assets/main_bg.png"



const Categories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [visible, setVisible] = useState("");

    const [dogImage, setDogImage] = useState(null)

    const [categoryData, setCategoryData] = useState([])

    console.log(categoryData)


    useEffect(() => {

        axios.get('http://localhost:3001/categories/allinfo', {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                setCategoryData(res.data)
            })

            .catch(err => {
                console.log(err)
            })

    }, [])

    // useEffect(() => {
    //     const url = "http://localhost:3000/categories/";

    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(url)
    //                 .then(response => {
    //                     console.log(response)
    //                 })




    //         } catch (error) {
    //             console.log("error", error);
    //         }
    //     };

    //     fetchData();
    //     console.log(fetchData())
    // }, []);
    const handleButtonClick = (title) => {
        setVisible(prevState => prevState === title ? "" : title);
    };



    return (
        <div className='' style={{ backgroundImage: `url(${main_bg})` }}>

            {categoryData.map((item) => (
                <div className='inline-block p-12 flex-row h-screen bg-transparent'>
                    <button class="inline-block px-20 py-20 bg-yellow-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => handleButtonClick(item.title)}>

                        <h1 className=''>{item.title} </h1>

                    </button>
                    <div >
                        {visible === item.title && <SubCategory key={item.Subcategories.id} item={item} />}

                    </div>

                </div>
            ))}

        </div>

    )

}

export default Categories