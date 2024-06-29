import Navbar from "../navbar";
import FooterSection from "../footer"
import { useState, useEffect } from "react";
import classNames from "classnames";
export default function Home() {
    const[subList, setSubList] = useState({});
    useEffect(() => {
    fetch("http://localhost:5000/fileAPI").then((response) => response.json())
    .then((data) => {
        setSubList(data);
    })
  })
  return (
    
    <main>
     
     <Navbar/>

      <div className="container mx-auto">
        <div className="m-2">
            <button onClick={() => console.log(subList)}>Meow</button>
      </div>
      </div>
      <FooterSection/>
    </main>
  );
}
