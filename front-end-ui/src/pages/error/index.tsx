import Navbar from "../navbar";
import FooterSection from "../footer";
import { useEffect } from "react";

export default function About() {
  
    
    useEffect(() => {
        onloadRed();
    })

    async function onloadRed(){
        await delay(100);
        window.location.replace("http://localhost:3000");    
    }
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
  return (
    
    <main className="h-screen">
     
     <Navbar/>

      <div className="container mx-auto h-full">
        <p>Seems like you've entered the wrong file type.</p>
      </div>
      <FooterSection/>
    </main>
  );
}
