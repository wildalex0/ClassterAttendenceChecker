import Navbar from "../navbar";
import FooterSection from "../footer";
import { useEffect } from "react";
import Image from "next/image";
import sadgeLight from "./sadgeLight.png"
export default function About() {
  
    
    useEffect(() => {
        onloadRed();
    })

    async function onloadRed(){
        await delay(3000);
        window.location.replace("http://localhost:3000");    
    }
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
  return (
    
    <main className="h-screen ErrorBackground">
     
     <Navbar/>

      <div className="container mx-auto h-full">
        <div className="flex items-center justify-center h-4/5">
        <p className="text-center"><span className="font-semibold text-3xl">An Error has occured.</span> <br></br><span className="text-lg">Please check your CSV file and try again.<br></br><br></br><span className="italic">Note: If an error still persists, reset your settings. <br></br><br></br>Timing out in <span className="font-semibold">3 seconds</span></span></span></p>
        </div>
      </div>
      <FooterSection/>
    </main>
  );
}
