import Navbar from "../navbar";
import FooterSection from "../footer"
import { useState, useEffect } from "react";
import classNames from "classnames";
export default function Home() {
    const[subList, setSubList] = useState({});
    const[parseList, setParseList] = useState({})

    useEffect(() => {
    
        fetch("http://localhost:5000/fileAPI").then((response) => response.json())
    .then((data) => {
        setSubList(data);
    })
}), []
  
    return (
    
    <main>
     
     <Navbar/>

      <div className="container mx-auto">
        <div className="m-2">
            {Object.entries(subList).map(([key, value]) => (
                
                <div className="p-4 my-2 border-2 border-gray-900 rounded-xl flex justify-between">
                
                    <p className="font-semibold">{key}</p> 
                    <p className="">{value as any}%</p>
                
                </div>
            ))}
      </div>
      </div>
    </main>
  );
}
