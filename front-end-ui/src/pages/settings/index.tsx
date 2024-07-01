import Navbar from "../navbar";
import { useState, useEffect } from "react";
import { getCookie, setCookie } from 'cookies-next';
import FooterSection from "../footer";

export default function Home() {
  const [cutoff, setCutoff] = useState(0);
  const [changes, setChanges] = useState(false);
  useEffect (() => {
    baseCookieSet();
  }, [])
  
function baseCookieSet(){
        //Coef Cookie
        if (getCookie("ClassterAttendenceCoef") === undefined){
        //Set Cookie
        setCookie('ClassterAttendenceCoef','70');
        }else{
            let num = Number(getCookie("ClassterAttendenceCoef"))
            setCutoff(num);
        }
      }
  function handleCutoff(event : any){
    const val = event.target.value;
    if(val > 100){
      setChanges(true);
      setCutoff(100)
    }else{
      setChanges(true);
      setCutoff(val);  
    }
    
  }
  function handleChanges(){
    setCookie('ClassterAttendenceCoef', cutoff);
    setChanges(false);
    window.location.reload();
  }
  return (
    
    <main className="h-screen">
     
     <Navbar/>

      <div className="container mx-auto h-full">
        <div className="m-2 p-4 my-2 border-2 border-gray-900 rounded-xl">
           
        <div className="flex items-center justify-between my-2">
                
                <label htmlFor="cutoffCoef-input" className="font-semibold">Update Attendence Cut-off Coeficient</label>      
                <input id="cutoffCoef-input" name="cutoffCoef-input" type="number" value={cutoff} onChange={(event: any) => handleCutoff(event)} className="custom-number-input px-4 py-2 border border-gray-600 rounded-md bg-gray-100 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500" placeholder={String(cutoff)}></input>
      
            </div>
            <button id="save" disabled={!changes} onClick={handleChanges} className={"mt-4 p-4 w-full border-2 rounded-lg  dark:border-gray-600 cursor-pointer dark:hover:border-gray-500  dark:bg-[#212121] dark:hover:bg-[#121212] " } >Save Changes</button>

        </div>
    
      </div>
      <FooterSection/>
    </main>
  );

}