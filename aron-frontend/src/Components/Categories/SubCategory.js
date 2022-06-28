import React from 'react'

import { NavLink } from 'react-router-dom';

const SubCategory = ({ item }) => {



    console.log(item.Subcategories)


    return (

        <div className='flex flex-col ' key={item.Subcategories.title}>
            {item.Subcategories.map((category) => (
                <NavLink to={`/${category.id}`}>
                    <option class=" w-full inline-block py-1 bg-green-500 text-white font-medium text-sm leading-snug uppercase shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">
                        {category.title}
                    </option>

                </NavLink>

            ))}

        </div>

    )
}



export default SubCategory