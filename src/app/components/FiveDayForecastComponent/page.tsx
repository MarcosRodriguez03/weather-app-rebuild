import React from 'react'
import Image, { StaticImageData } from "next/image";
import snowflake from "@/app/assets/snowflake.png"

type IObject = {
    day: string
    image: StaticImageData
    high: number
    low: number
}

const FiveDayForecastComponent = (para: any) => {


    return (


        <div className='tempBox2 xl:text-center py-[20px] grid grid-cols-2 xl:grid-cols-1 px-[30px] gap-5 xl:gap-0'>
            <div className='text-[30px] md:text-[35px] text-white'>{para.day}</div>

            <div className='flex justify-end xl:justify-center xl:pt-[120px] xl:pb-[70px]'>
                <Image className=' h-[50px] md:h-[113px] w-auto' src={para.image} alt='weatherIcon' />
            </div>

            <div className=' grid col-span-2 xl:col-span-1'>
                <div className='flex xl:justify-center justify-between xl:flex-col'>
                    <div className='mb-3 leading-10 text-[30px] sm:text-[50px] text-white'>H:{para.high}°F</div>
                    <div className='leading-10 text-[30px] sm:text-[50px] text-[#8DA2BF]'>L:{para.low}°F</div>
                </div>
            </div>

        </div>
    )
}

export default FiveDayForecastComponent
