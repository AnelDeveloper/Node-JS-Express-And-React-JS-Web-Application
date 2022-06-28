import React from 'react'

import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();



    const onClickReports = () => {
        navigate('/AllReports')
    }

    const onClickZelenko = () => {
        navigate('/')
    }





    return (
        <div className='header'>
            <div className='flex items-center  justify-between flex-wrap bg-[#3c9] p-6'>
                <button className='font-semibold text-xl tracking-tight" class="flex items-center flex-shrink-0 text-white mr-6"' onClick={onClickZelenko}>Zelenko</button>

                <div>

                    <button 
                    className="inline-block text-sm  px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" 
                    onClick={onClickReports}>Reports</button>
                </div>
            </div>

        </div>
    )
}

export default Header