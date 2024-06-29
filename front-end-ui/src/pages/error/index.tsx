import Navbar from "../navbar";
import FooterSection from "../footer";
import { useEffect } from "react";

export default function About() {
  
    
    useEffect(() => {
        onloadRed();
    })

    async function onloadRed(){
        await delay(1500);
        window.location.replace("http://localhost:3000");    
    }
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
  return (
    
    <main onLoadStart={() => alert('Loaded')}>
     
     <Navbar/>
     <div className="container mx-auto">
        <p>Seems like you've entered the wrong file type.</p>
      </div>
    <FooterSection/>
    </main>
  );
}
