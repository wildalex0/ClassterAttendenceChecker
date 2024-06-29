import Navbar from "./navbar";
import FooterSection from "./footer"
import { useState } from "react";
import classNames from "classnames";
export default function Home() {
  const [uploaded, setUpload] = useState(false);
  const [uploadName, setUploadName] = useState("")
  
  function handleUpload(event: any){
    const file = event.target.files[0]; 
    if (!handleFile(file)){
      handleError();
    }

  }

function handleDrop(event: React.DragEvent<HTMLDivElement>){
  event.preventDefault();
  const file = event.dataTransfer.files?.[0];
  if (!handleFile(file)){
    handleError();
  }

}

function handleDragover(event: React.DragEvent<HTMLDivElement>){
  event.preventDefault();
}

function handleFile(file : File){
  const fileName = file.name;
  if(fileName.split('.')[1] == "csv"){
    setUpload(true);
    setUploadName(fileName);
    return true;
  }
  return false;
}
function handleError(){
  alert("Please Input a CSV file");
  window.location.reload();
}
  return (
    
    <main>
     
     <Navbar/>

      <div className="container mx-auto">
        <div className="m-4">
          <p className="text-2xl font-bold pb-5">Classter Attendence Calculator</p>
          <p className="text-xl font-semibold">What is this calculator used for?</p>
          <p className="my-2">Due to the lack of a built in feature within the Classter software, requiring the assistance of lecturers, this calculator aims to  give a general idea of where a student's attendence is, by looking at the CSV export from the Classter attendence page. Please note that this website is purely <span className="font-semibold underline">experimental</span> and inputting wrong data or incomplete data will result in odd or unaccurate results. Use with caution.</p>
        </div>
        
        <div className="m-2">

        <form action="http://localhost:5000/result" method="post" encType="multipart/form-data">

          
        <div className="flex items-center justify-center w-full" onDrop={(event) =>handleDrop(event) } onDragOver={(event) => handleDragover(event)}>
            <label htmlFor="dropzone-file"  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-900 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-[#121212] dark:bg-[#212121] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">.CSV only</p>
                </div>
                <input id="dropzone-file" name="file" type="file" className="hidden" onInput={(event) => handleUpload(event)}/>
            </label>
        </div> 
      <p className="mb-4"><span className="font-semibold">Selected file:</span> {uploadName}</p>
       
      
      <input type="submit" id="Sub" disabled={!uploaded} className={classNames("p-4 w-full border-2 rounded-lg  dark:border-gray-600  ",{ "text-gray-500 dark:bg-[#2e2e2e]":!uploaded, "cursor-pointer dark:hover:border-gray-500  dark:bg-[#212121] dark:hover:bg-[#121212] ":uploaded}) } ></input>
      </form>
      <p className="italic py-4 ">To Add: Dynamic Customisation to CSV reading, IE: <span className="font-bold">Setting rows read dynamically.</span>.</p>
      </div>
      </div>
      <FooterSection/>
    </main>
  );
}
