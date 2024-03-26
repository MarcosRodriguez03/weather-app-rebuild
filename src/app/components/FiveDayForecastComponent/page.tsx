import React from 'react'
import Image from "next/image";
import snowflake from "@/app/assets/snowflake.png"

type IObject = {
    day: string
    image: string
    high: string
    low: string
}

const FiveDayForecastComponent = (para: IObject) => {


    return (

        // <div className='tempBox2 w-full flex xl:justify-between xl:flex-col text-center py-[20px]'>
        //     <div className='text-[50px] text-white'>Monday</div>
        //     <div className='flex justify-center'>
        //         <Image className='h-[93px] w-[93px]' src={snowflake} alt='weatherIcon' />
        //     </div>

        //     <div>
        //         <div className='mb-3 leading-10 text-[50px] text-white'>H:60°F</div>
        //         <div className='leading-10 text-[50px] text-[#8DA2BF]'>L:60°F</div>
        //     </div>

        // </div>


        <div className='tempBox2 xl:text-center py-[20px] grid grid-cols-2 xl:grid-cols-1 px-[30px] gap-5 xl:gap-0'>
            <div className='text-[30px] sm:text-[50px] text-white'>Monday</div>

            <div className='flex justify-end xl:justify-center xl:pt-[120px] xl:pb-[70px]'>
                <Image className=' h-[50px] md:h-[93px] w-auto' src={snowflake} alt='weatherIcon' />
            </div>

            <div className=' grid col-span-2 xl:col-span-1'>
                <div className='flex xl:justify-center justify-between xl:flex-col'>
                    <div className='mb-3 leading-10 text-[30px] sm:text-[50px] text-white'>H:60°F</div>
                    <div className='leading-10 text-[30px] sm:text-[50px] text-[#8DA2BF]'>L:60°F</div>
                </div>
            </div>

        </div>
    )
}

export default FiveDayForecastComponent
