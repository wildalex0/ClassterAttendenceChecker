import Navbar from "../navbar";
import { useState, useEffect } from "react";
import { cookies } from 'next/headers'

export default function Home() {
     return (
    
    <main>
     
     <Navbar/>

      <div className="container mx-auto">
        <div className="m-2 p-4 my-2 border-2 border-gray-900 rounded-xl">
           
        <div className="flex items-center justify-between my-2">
                
                <label htmlFor="cutoffCoef-input" className="font-semibold">Update Attendence Cut-off Coeficient</label>      
                <input id="cutoffCoef-input" name="cutoffCoef-input" type="number" max={100} className="custom-number-input px-4 py-2 border border-gray-600 rounded-md bg-gray-100 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500" placeholder="0"></input>
      
            </div>
            
        </div>
    
      </div>
    </main>
  );
}
