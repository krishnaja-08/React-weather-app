'use client';
import { Weather } from "@/weather";
import axios from "axios";
import { useState } from "react";
export default function Home() {
  const [val, setVal] = useState("")
  const [x, setX] = useState<Weather>()
  return (
    <main className="flex flex-col gap-2 py-10 items-center">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          async function getData() {
            try{
            const result = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
              params: {
                q: val,
                appid: process.env.NEXT_PUBLIC_API_KEY
              }
            })
            const res = result.data as Weather
            setX(res)
          }
        catch(error){
          alert("Wrong city name!")
          setVal('')
          setX(undefined)
        }
      }
          
          getData()
        
        }}>
        <div className="flex flex-col gap-2 py-10 items-center">
          <label>Enter City Name</label>
          <input type="text" value={val
          } className="border border-blue px-2 py-2 outline-none" onChange={(e) => {
            setVal(e.target.value)
            console.log(val)
          }
          }></input>
          <button type="submit" className="bg-[#0ea5e9] text-white border-blue border px-2 py-2">Submit</button>
        </div>
      </form>
        {x&& <div><p>The temperature is : {(x.main.temp -273).toFixed(2)}</p>
        <p>Description : {x?.weather[0]?.description}</p>
        
        <img src={`https://openweathermap.org/img/wn/${x.weather[0]?.icon}@4x.png`}></img>
        </div>
        }
    </main>
  )
}
