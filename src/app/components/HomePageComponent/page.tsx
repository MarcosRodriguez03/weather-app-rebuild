'use client'
import React, { useEffect, useState } from 'react'
import Image, { StaticImageData } from "next/image";
import sunny from '@/app/assets/sunny.png'
import FiveDayForecastComponent from '../FiveDayForecastComponent/page';
import search from '@/app/assets/search.png'
import minus from '@/app/assets/minus.png'
import exit from '@/app/assets/exit.png'
import thunder from '@/app/assets/lighting.png'
import clear from '@/app/assets/sunny.png'
import snow from '@/app/assets/snowflake.png'
import cloud from '@/app/assets/sunCloud.png'
import drizzle from '@/app/assets/rain.png'
import hazy from '@/app/assets/hazy.png'
import add from '@/app/assets/add.png'


import { CurrentDay, FindHigh, FindLow, FiveDayForecast, GeolocationCheck, GetState, WeatherStatCheckFiveDay, getStateAbbreviation } from '@/app/utils/dataservice';
import { getlocalStorage, removeFromLocalStorage, savelocalStorage } from '@/app/utils/localStorage';
import { type } from 'os';
import { ILocation } from '@/app/interfaces/interface';



const HomePageComponent = () => {

    const [city, setCity] = useState("stockton");
    const [currentDay, setCurrentDay] = useState("monday");
    const [currentImg, setCurrentImg] = useState(sunny)
    const [currentWeather, setCurrentWeather] = useState(0)
    const [currentHigh, setCurrentHigh] = useState(0)
    const [currentLow, setCurrentLow] = useState(0)
    const [state, setState] = useState<string>("stockton");
    const [inputOnChange, setInputOnChange] = useState("stockton");
    const [input, setInput] = useState("stockton")
    const [isBool, setIsBool] = useState(false);
    const [fav, setFav] = useState<StaticImageData>(add)

    const [oneDay, setOneDay] = useState<string>("monday");
    const [oneImg, setOneImg] = useState<StaticImageData>(sunny);
    const [oneLow, setOneLow] = useState<number>(0);
    const [oneHigh, setOneHigh] = useState<number>(0);

    const [twoDay, setTwoDay] = useState<string>("monday");
    const [twoImg, setTwoImg] = useState<StaticImageData>(sunny);
    const [twoLow, setTwoLow] = useState<number>(0);
    const [twoHigh, setTwoHigh] = useState<number>(0);

    const [threeDay, setThreeDay] = useState<string>("monday");
    const [threeImg, setThreeImg] = useState<StaticImageData>(sunny);
    const [threeLow, setThreeLow] = useState<number>(0);
    const [threeHigh, setThreeHigh] = useState<number>(0);

    const [fourDay, setFourDay] = useState<string>("monday");
    const [fourImg, setFourImg] = useState<StaticImageData>(sunny);
    const [fourLow, setFourLow] = useState<number>(0);
    const [fourHigh, setFourHigh] = useState<number>(0);

    const [fiveDay, setFiveDay] = useState<string>("monday");
    const [fiveImg, setFiveImg] = useState<StaticImageData>(sunny);
    const [fiveLow, setFiveLow] = useState<number>(0);
    const [fiveHigh, setFiveHigh] = useState<number>(0);
    const [localStor, setLocalStor] = useState<string[]>([])


    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const doAll = async (input: string) => {
        let current = await CurrentDay(input)
        let statefetched = await GetState(input)
        let fiveDay = await FiveDayForecast(input)
        determineHeartOnLoad(current.name)



        type DateTimeOptions = {
            hour: '2-digit' | 'numeric';
            minute: '2-digit' | 'numeric';
            timeZone: string;
            timeZoneName: 'short' | 'long';
            weekday: 'short' | 'long';
            weekdate: 'short' | 'long';
            day: 'numeric';
            month: 'numeric';
        }

        const options: DateTimeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short',
            weekday: 'long',
            weekdate: 'short',
            day: 'numeric',
            month: 'numeric',
        };

        let time = new Intl.DateTimeFormat('en-US', options).format(new Date((current.dt * 1000) + (current.timezone * 1000)))
        let timeArr = time.split(",")

        //one day
        console.log(timeArr)
        console.log(current.name)
        console.log(current.main.temp_min)
        console.log(current.main.temp_max)
        console.log(current.main.temp)
        console.log(current.weather[0].main)


        setCity(current.name)
        setCurrentLow(Math.round(current.main.temp_min))
        setCurrentHigh(Math.round(current.main.temp_max))
        setCurrentWeather(Math.round(current.main.temp))
        setCurrentDay(timeArr[0])

        setState(getStateAbbreviation(statefetched))
        function WeatherStatCheck(weatherMain: string) {
            if (weatherMain === 'Thunderstorm') {
                setCurrentImg(thunder);
            } else if (weatherMain === 'Drizzle') {
                setCurrentImg(drizzle);
            } else if (weatherMain === 'Rain') {
                setCurrentImg(drizzle);
            } else if (weatherMain === 'Snow') {
                setCurrentImg(snow);
            } else if (weatherMain === 'Mist' || weatherMain === 'Smoke' || weatherMain === 'Haze' || weatherMain === 'Dust' || weatherMain === 'Fog' || weatherMain === 'Sand' || weatherMain === 'Dust' || weatherMain === 'Ash' || weatherMain === 'Squall' || weatherMain === 'Tornado') {
                setCurrentImg(hazy);
            } else if (weatherMain === 'Clear') {
                setCurrentImg(clear);
            } else if (weatherMain === 'Clouds') {
                setCurrentImg(cloud);
            }
        }



        let weatherIcon = WeatherStatCheck(current.weather[0].main)

        let highArr = [];
        let lowArr = [];
        let weatherIconArr: string[] = []
        let dayArr = [];



        for (let i = 0; i <= 39; i = i + 8) {
            highArr.push(FindHigh(i, fiveDay))
            lowArr.push(FindLow(i, fiveDay))
            weatherIconArr.push(fiveDay.list[i + 4].weather[0].main)


            let time = new Intl.DateTimeFormat('en-US', options).format(new Date((fiveDay.list[i + 5].dt * 1000) + (current.timezone * 1000)))
            let day = time.split(",")
            dayArr.push(day[0])

        }
        //5 day
        console.log(weatherIconArr)
        console.log(highArr)
        console.log(lowArr)
        console.log(dayArr)


        setOneDay(dayArr[0]);
        setTwoDay(dayArr[1])
        setThreeDay(dayArr[2])
        setFourDay(dayArr[3])
        setFiveDay(dayArr[4])

        setOneHigh(highArr[0])
        setTwoHigh(highArr[1])
        setThreeHigh(highArr[2])
        setFourHigh(highArr[3])
        setFiveHigh(highArr[4])

        setOneLow(lowArr[0])
        setTwoLow(lowArr[1])
        setThreeLow(lowArr[2])
        setFourLow(lowArr[3])
        setFiveLow(lowArr[4])

        setOneImg(WeatherStatCheckFiveDay(weatherIconArr[0]))
        setTwoImg(WeatherStatCheckFiveDay(weatherIconArr[1]))
        setThreeImg(WeatherStatCheckFiveDay(weatherIconArr[2]))
        setFourImg(WeatherStatCheckFiveDay(weatherIconArr[3]))
        setFiveImg(WeatherStatCheckFiveDay(weatherIconArr[4]))
    }






    useEffect(() => {
        let latitude1;
        let longitude1;
        navigator.geolocation.getCurrentPosition(success, errorFunc);

        async function success(position: any) {
            latitude1 = position.coords.latitude;
            longitude1 = position.coords.longitude;
            let data: any = await GeolocationCheck(latitude1, longitude1)
            doAll(data ? data[0].local_names.en : "stockton");
        }
        function errorFunc(error: any) {
            console.log("location must be on to see current weather")
        }
    }, [])

    useEffect(() => {
        doAll(input)
    }, [input])

    useEffect(() => {
        let getLocal = getlocalStorage()
        setLocalStor(getLocal)
    }, [isBool])



    const handleSwitch = () => {
        // setIsBool(!isBool);
        console.log(isBool)
        console.log("hi")
        setIsBool((isBool: boolean) => !isBool);

    }

    const handleAdd = (para: string): void => {
        let locals: string[] = getlocalStorage();

        if (locals.includes(para)) {
            removeFromLocalStorage(para)
        } else {
            savelocalStorage(para)
        }
    }

    const determineFav = () => {
        let localStor = getlocalStorage()

        if (localStor.includes(city)) {
            setFav(minus)
        } else {
            setFav(add)
        }
    }
    const determineHeartOnLoad = (para: string) => {
        let localStor = getlocalStorage()

        if (localStor.includes(para)) {
            setFav(minus)
        } else {
            setFav(add)
        }

    }



    return (
        <div className='background'>
            <div className='xl:flex items-center justify-between px-[10px] md:px-[30px] grid grid-cols-1' >
                <div className='flex justify-between items-center'>
                    <p className=' sm:text-[50px] text-[24px] xl:text-[75px] text-white me-5'>{city && city}, {state && state}</p>
                    <div>
                        <div onClick={toggleVisibility} className='my-[10px] p-[15px] text-[20px] sm:text-[25px] xl:text-[40px] text-white bg-[#426BA5] rounded-[10px]  bg-opacity-70 content-fit inline-block'>Favorites</div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <Image className=' h-[48px] w-[48px] me-[15px]' src={fav && fav} alt="favbtn"
                        onClick={() => { handleSwitch(); handleAdd(city); determineFav() }}
                    />

                    <div className='flex items-center '>
                        <div className='bg-[#426BA5] rounded-[10px]  bg-opacity-70 flex items-center py-[5px] px-[15px]'>
                            <Image className='me-[15px]  h-[40px] w-[40px]' src={search} alt='src' />
                            <input className='xl:pe-[150px] text-white bg-transparent placeholder-white' type="text" placeholder='Search'
                                onChange={(e) => setInputOnChange(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' ? setInput(e.currentTarget.value) : null}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-[10px] md:gap-[30px] p-[10px]  md:p-[30px]">

                <div className='g xl:col-span-5 grid xl:grid-cols-2'>
                    <div className="tempBox flex justify-center items-center py-[30px] ">
                        <div className='w-full h-full border-r border-[#8DA2BF] '>
                            <div className=''>
                                <p className='text-center  text-white sm:text-[50px] text-[30px] xl:text-[50px]'>{currentDay && currentDay} </p>
                                <div className='flex items-center justify-center'>
                                    <Image className='pe-[50px] w-[125px] md:w-[200px]' src={currentImg && currentImg} alt="sun" />
                                    <p className='text-white sm:text-[90px] text-[70px] xl:text-[150px]'>{currentWeather}°F</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='tempBox3 text-center  xl:flex items-center xl:justify-center py-[30px]'>

                        <div className='text-white sm:text-[50px] text-[30px] xl:text-[70px] '>
                            <div>High: {currentHigh && currentHigh}°F </div>
                            <div>Low: {currentLow && currentLow}°F </div>
                        </div>
                    </div>
                </div>
                <FiveDayForecastComponent day={oneDay && oneDay} image={oneImg && oneImg} high={oneHigh && oneHigh} low={oneLow && oneLow} />
                <FiveDayForecastComponent day={twoDay && twoDay} image={twoImg && twoImg} high={twoHigh && twoHigh} low={twoLow && twoLow} />
                <FiveDayForecastComponent day={threeDay && threeDay} image={threeImg && threeImg} high={threeHigh && threeHigh} low={threeLow && threeLow} />
                <FiveDayForecastComponent day={fourDay && fourDay} image={fourImg && fourImg} high={fourHigh && fourHigh} low={fourLow && fourLow} />
                <FiveDayForecastComponent day={fiveDay && fiveDay} image={fiveImg && fiveImg} high={fiveHigh && fiveHigh} low={fiveLow && fiveLow} />
            </div>
            <div className={`toggle-div ${isVisible ? 'visible' : 'hidden'}`}>
                <div className='left-div p-[30px]'>
                    <div className='flex justify-end pr-[7px]'>
                        <Image src={exit} className='w-[16px] h-[16px]' alt="close button" onClick={() => toggleVisibility()} />
                    </div>
                    <p className='text-white text-[24px] pb-[5px]'> Favorites</p>

                    {
                        localStor && localStor.map((ele: string, idx: number) => {
                            return <div key={idx} className='px-[10px] py-[15px] bg-[#8DA2BF] flex justify-between items-center rounded-lg mb-[10px]'>
                                <h1

                                    onClick={() => { setInput(ele); toggleVisibility() }}
                                    className='text-[16px] md:text-[24px] text-white '>{ele} </h1>

                                <Image
                                    key={ele + 1}
                                    onClick={() => { removeFromLocalStorage(ele); handleSwitch(); toggleVisibility(); determineFav() }}
                                    className='h-[16px] w-[16px] ' src={exit} alt='close' />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default HomePageComponent
