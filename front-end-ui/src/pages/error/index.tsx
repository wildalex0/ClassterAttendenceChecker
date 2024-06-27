import Navbar from "../navbar";
import FooterSection from "../footer";
import { useEffect } from "react";

export default function About() {
  
    
    useEffect(() => {
        onloadRed();
    })

    async function onloadRed(){
        await delay(2000);
        window.location.replace("http://localhost:3000");    
    }
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
  return (
    
    <main onLoadStart={() => alert('Loaded')}>
     
     <Navbar/>
     <div className="container mx-auto">
        <h1>ERROR</h1>
      </div>
    <FooterSection/>
    </main>
  );
}
