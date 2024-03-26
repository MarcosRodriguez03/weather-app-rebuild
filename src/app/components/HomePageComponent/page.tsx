'use client'
import React, { useState } from 'react'
import Image from "next/image";
import sunny from '@/app/assets/sunny.png'
import FiveDayForecastComponent from '../FiveDayForecastComponent/page';
import search from '@/app/assets/search.png'
import minus from '@/app/assets/minus.png'
import exit from '@/app/assets/exit.png'



const HomePageComponent = () => {
    const [isVisible, setIsVisible] = useState(true); // State to track visibility
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };


    return (
        <div className='background'>

            <div className='xl:flex items-center justify-between px-[10px] md:px-[30px] grid grid-cols-1' >
                <div className='flex justify-between items-center'>
                    <p className=' sm:text-[50px] text-[24px] xl:text-[75px] text-white me-5'>Stockton, CA</p>
                    <div>
                        <div onClick={toggleVisibility} className='my-[10px] p-[15px] text-[20px] sm:text-[25px] xl:text-[40px] text-white bg-[#426BA5] rounded-[10px]  bg-opacity-70 content-fit inline-block'>Favorties</div>

                    </div>

                </div>



                <div className='flex items-center justify-between'>
                    <Image className=' h-[48px] w-[48px] me-[15px]' src={minus} alt="favbtn" />

                    <div className='flex items-center '>
                        <div className='bg-[#426BA5] rounded-[10px]  bg-opacity-70 flex items-center py-[5px] px-[15px]'>
                            <Image className='me-[15px]  h-[40px] w-[40px]' src={search} alt='src' />
                            <input className='xl:pe-[150px] text-white bg-transparent placeholder-white' type="text" placeholder='Search' />
                        </div>
                    </div>
                </div>



            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-[10px] md:gap-[30px] p-[10px]  md:p-[30px]">

                <div className='g xl:col-span-5 grid xl:grid-cols-2'>
                    <div className="tempBox flex justify-center items-center py-[30px]">
                        <div>
                            <p className='text-center text-white sm:text-[50px] text-[30px] xl:text-[50px]'>Sunday</p>
                            <div className='flex items-center justify-center'>
                                <Image className='pe-[50px] w-[125px] md:w-[200px]' src={sunny} alt="sun" />
                                <p className='text-white sm:text-[90px] text-[70px] xl:text-[150px]'>62° F</p>
                            </div>
                        </div>

                    </div>


                    <div className='tempBox3 text-center  xl:flex items-center xl:justify-center py-[30px]'>

                        <div className='text-white sm:text-[50px] text-[30px] xl:text-[70px] '>
                            <div>High: 72° F</div>
                            <div>Low: 34° F</div>
                        </div>
                    </div>

                </div>

                <FiveDayForecastComponent day="" image="" high="" low="" />
                <FiveDayForecastComponent day="" image="" high="" low="" />
                <FiveDayForecastComponent day="" image="" high="" low="" />
                <FiveDayForecastComponent day="" image="" high="" low="" />
                <FiveDayForecastComponent day="" image="" high="" low="" />

            </div>

            <div className={`toggle-div ${isVisible ? 'visible' : 'hidden'}`}>
                <div className='left-div p-[30px]'>
                    <div className='flex justify-end'>
                        <Image src={exit} className='w-[30px] h-[30px]' alt="close button" onClick={() => toggleVisibility()} />
                    </div>
                    hi
                </div>
            </div>

        </div>
    )
}

export default HomePageComponent
