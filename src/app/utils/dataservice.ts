'use client'
import thunder from '@/app/assets/lighting.png'
import clear from '@/app/assets/sunny.png'
import snow from '@/app/assets/snowflake.png'
import cloud from '@/app/assets/sunCloud.png'
import drizzle from '@/app/assets/rain.png'
import hazy from '@/app/assets/hazy.png'

// import {  } from './hiddenKey'
import { StaticImageData } from 'next/image'
let units = '&units=imperial';
const apiKey = process.env.NEXT_PUBLIC_ANALYTICS_ID




export async function GeolocationCheck(latitude: string, longitude: string) {
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}${units}`);
    const data = await promise.json();
    return await data
}


export async function GetState(input: string) {
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`);
    const data = await promise.json();
    return await data && data[0].state
}

export async function CurrentDay(theCheck: string) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${theCheck}&appid=${apiKey}${units}`);
    const data = await promise.json();
    console.log(data)

    return await data

}
export async function FiveDayForecast(theCheck: string) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${theCheck}&appid=${apiKey}${units}`);
    const data = await promise.json();
    console.log(data)

    return await data
}

export const doAll = async (input: string) => {
    let current = await CurrentDay(input)

    let fiveDay = await FiveDayForecast(input)

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
    let timeArr = time.split(" ")

    //one day
    console.log(timeArr)
    console.log(current.name)
    console.log(current.main.temp_min)
    console.log(current.main.temp_max)
    console.log(current.main.temp)
    console.log(current.weather[0].main)

    // console.log(fiveDay)
    // console.log(fiveDay.list[0].weather[0].main)
    // console.log(fiveDay.list[0].main.temp_min)
    // console.log(fiveDay.list[0].main.temp_max)

    let highArr = [];
    let lowArr = [];
    let weatherIconArr = []
    let dayArr = [];



    for (let i = 0; i <= 39; i = i + 8) {
        highArr.push(FindHigh(i, fiveDay))
        lowArr.push(FindLow(i, fiveDay))
        weatherIconArr.push(fiveDay.list[i + 4].weather[0].main)


        let time = new Intl.DateTimeFormat('en-US', options).format(new Date((fiveDay.list[i + 4].dt * 1000) + (current.timezone * 1000)))
        let day = time.split(",")
        console.log("hello")
        dayArr.push(day[0])
    }




    //5 day
    console.log("hello")
    console.log(weatherIconArr)
    console.log(highArr)
    console.log(lowArr)
    console.log(dayArr)

}
type iData2 = {
    list: [
        {
            main: {
                temp_min: 0,
            },
        },
    ],
}
type iData = {
    list: [
        {
            main: {
                temp_max: 0,
            },
        },
    ],
}

export function FindHigh(add: number, data: iData) {
    let highTemp = -Infinity;

    for (let i = add; i < add + 8; i++) {
        let currentHigh = data.list[i].main.temp_max;
        if (currentHigh >= highTemp || highTemp === undefined) {
            highTemp = currentHigh;
        }
    }
    return Math.round(highTemp)
}

export function FindLow(add: number, data: iData2) {
    let lowTemp = Infinity;
    for (let i = add; i < add + 8; i++) {
        let currentHigh = data.list[i].main.temp_min;
        if (currentHigh <= lowTemp || lowTemp === undefined) {
            lowTemp = currentHigh;
        }
    }
    return Math.round(lowTemp);
}

export function getStateAbbreviation(state: string) {
    switch (state.toLowerCase()) {
        case 'alabama':
            return 'AL';
        case 'alaska':
            return 'AK';
        case 'arizona':
            return 'AZ';
        case 'arkansas':
            return 'AR';
        case 'california':
            return 'CA';
        case 'colorado':
            return 'CO';
        case 'connecticut':
            return 'CT';
        case 'delaware':
            return 'DE';
        case 'florida':
            return 'FL';
        case 'georgia':
            return 'GA';
        case 'hawaii':
            return 'HI';
        case 'idaho':
            return 'ID';
        case 'illinois':
            return 'IL';
        case 'indiana':
            return 'IN';
        case 'iowa':
            return 'IA';
        case 'kansas':
            return 'KS';
        case 'kentucky':
            return 'KY';
        case 'louisiana':
            return 'LA';
        case 'maine':
            return 'ME';
        case 'maryland':
            return 'MD';
        case 'massachusetts':
            return 'MA';
        case 'michigan':
            return 'MI';
        case 'minnesota':
            return 'MN';
        case 'mississippi':
            return 'MS';
        case 'missouri':
            return 'MO';
        case 'montana':
            return 'MT';
        case 'nebraska':
            return 'NE';
        case 'nevada':
            return 'NV';
        case 'new hampshire':
            return 'NH';
        case 'new jersey':
            return 'NJ';
        case 'new mexico':
            return 'NM';
        case 'new york':
            return 'NY';
        case 'north carolina':
            return 'NC';
        case 'north dakota':
            return 'ND';
        case 'ohio':
            return 'OH';
        case 'oklahoma':
            return 'OK';
        case 'oregon':
            return 'OR';
        case 'pennsylvania':
            return 'PA';
        case 'rhode island':
            return 'RI';
        case 'south carolina':
            return 'SC';
        case 'south dakota':
            return 'SD';
        case 'tennessee':
            return 'TN';
        case 'texas':
            return 'TX';
        case 'utah':
            return 'UT';
        case 'vermont':
            return 'VT';
        case 'virginia':
            return 'VA';
        case 'washington':
            return 'WA';
        case 'west virginia':
            return 'WV';
        case 'wisconsin':
            return 'WI';
        case 'wyoming':
            return 'WY';
        default:
            return 'N/A';
    }
}

export function WeatherStatCheckFiveDay(weatherMain: string): StaticImageData {
    if (weatherMain === 'Thunderstorm') {
        return thunder;
    } else if (weatherMain === 'Drizzle') {
        return drizzle;
    } else if (weatherMain === 'Rain') {
        return drizzle;
    } else if (weatherMain === 'Snow') {
        return snow;
    } else if (weatherMain === 'Mist' || weatherMain === 'Smoke' || weatherMain === 'Haze' || weatherMain === 'Dust' || weatherMain === 'Fog' || weatherMain === 'Sand' || weatherMain === 'Dust' || weatherMain === 'Ash' || weatherMain === 'Squall' || weatherMain === 'Tornado') {
        return hazy;
    } else if (weatherMain === 'Clear') {
        return clear;
    } else if (weatherMain === 'Clouds') {
        return cloud;
    }
    return cloud
}