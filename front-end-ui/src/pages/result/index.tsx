import Navbar from "../navbar";
import FooterSection from "../footer"
import { useState, useEffect } from "react";
import { cookies } from 'next/headers'

export default function Home() {
    const[subList, setSubList] = useState({});
    const[parseList, setParseList] = useState({});
    const[cutoffCoef, setCutoff] = useState(70);
    
    useEffect(() => {
    
        fetch("http://localhost:5000/fileAPI").then((response) => response.json())
    .then((data) => {
        setSubList(data);
    })
    
}, [])
  
    function calcCutoff(val : string){
        const value = Number(val);
        if (value > cutoffCoef){
            if((value - cutoffCoef) < 15){
                return (<span className="text-orange-300 ">Getting Close</span>)
            }else{
                return (<span className="text-green-300">You're Fine</span>);

            }
        
        
        }
        return(<span className="text-red-300">You're Cooked</span>)
    }
    return (
    
    <main>
     
     <Navbar/>

      <div className="container mx-auto">
        <div className="m-2">
            {Object.entries(subList).map(([key, value]) => (
                
                <div className="p-4 my-2 border-2 border-gray-900 rounded-xl flex justify-between hover:scale-105 hover:text-white duration-200">
                
                    <p className="font-semibold">{key}</p> 
                    <p className=""><span className="font-semibold">{value as any}%</span> - <span>{calcCutoff(value as string)}</span></p>
                
                </div>
            ))}
        </div>
    
      </div>
    </main>
  );
}
