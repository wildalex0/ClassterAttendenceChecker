import Navbar from "../navbar";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { getCookie, setCookie } from "cookies-next";
import FooterSection from "../footer";
import classNames from "classnames";
export default function Home() {
  const [cutoff, setCutoff] = useState(0);
  const [changes, setChanges] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false)
  const [toastText, setToastText] = useState("Changes Saved");

  const [authIndex, setAuthIndex] = useState(1);
  const [hrsIndex, setHrsIndex] = useState(9); 
  const [nameIndex, setNameIndex] = useState(4); 

  useEffect(() => {
    baseCookieSet();
  }, []);
  let cookieList = [
    {
      "name": "ClassterAttendenceCoef",
      "baseVal" : "70",
      "stateName" : setCutoff,
      "stateVal" : cutoff
    },
    {
      "name": "AuthIndex",
      "baseVal" : "1",
      "stateName" : setAuthIndex,
      "stateVal" : authIndex
    },
    {
      "name": "HrsIndex",
      "baseVal" : "9",
      "stateName" : setHrsIndex,
      "stateVal" : hrsIndex
    },
    {
      "name": "NameIndex",
      "baseVal" : "4",
      "stateName" : setNameIndex,
      "stateVal" : nameIndex
    },
  ]
  function baseCookieSet() {
    //Coef Cookie
    for(let x in cookieList){
    
      if (getCookie(cookieList[x].name) === undefined) {
        //Set Cookie
        console.log(cookieList[x].stateVal);
        setCookie(cookieList[x].name, cookieList[x].stateVal);
      } else {
        let num = Number(getCookie(cookieList[x].name));
        cookieList[x].stateName(num);
      }
  }
  }
  function handleCutoff(event: any) {
    const val = event.target.value;
    if (val > 100) {
      setCutoff(100);
    } else {
      setCutoff(val);
    }
    setChanges(true);
  }
  function handleChanges() {
    for(let x in cookieList){
      console.log(cookieList[x].name+ "- "+cookieList[x].baseVal);
      setCookie(cookieList[x].name, cookieList[x].baseVal);
    }
    setChanges(false);
    setSaveChanges(true);
    onloadRed();
  }
  
  async function onloadRed(){
    await delay(3100);
    window.location.reload();
}
function resetDefaults(){
  setChanges(true);
  for(let x in cookieList){
    cookieList[x].stateName(Number(cookieList[x].baseVal));
  }
  setToastText("Changes Reset");

}
function handleChange(event : any, parent : Dispatch<SetStateAction<number>>){
  parent(Number(event.target.value));
  
}


function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  return (
    <main className="h-screen">
      <Navbar />

      <div className="container mx-auto h-full">
        <div className="m-2 p-4 my-2 border-2 border-gray-900 rounded-xl">
          <div className="flex items-center justify-between my-2">
            <label htmlFor="cutoffCoef-input" className="font-semibold">
              Update Attendence Cut-off Coeficient
            </label>
            <input
              id="cutoffCoef-input"
              name="cutoffCoef-input"
              type="number"
              value={cutoff}
              onChange={(event: any) => handleCutoff(event)}
              className="custom-number-input px-4 py-2 border border-gray-600 rounded-md bg-gray-100 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500"
              placeholder={String(cutoff)}
            ></input>
          </div>
          <div className="flex items-center justify-between my-2">
            <label htmlFor="cutoffCoef-input" className="font-semibold">
              Authorised Index
            </label>
            <input
              id="authIndex-input"
              name="authIndex-input"
              type="number"
              value={authIndex}
              onChange={(event) => handleChange(event, setAuthIndex)}
              className="custom-number-input px-4 py-2 border border-gray-600 rounded-md bg-gray-100 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500"
              placeholder={String(cutoff)}
            ></input>
          </div>
          <div className="flex items-center justify-between my-2">
            <label htmlFor="cutoffCoef-input" className="font-semibold">
              Name Index
            </label>
            <input
              id="nameIndex-input"
              name="nameIndex-input"
              type="number"
              value={nameIndex}
              onChange={(event) => handleChange(event, setNameIndex)}
              className="custom-number-input px-4 py-2 border border-gray-600 rounded-md bg-gray-100 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500"
              placeholder={String(cutoff)}
            ></input>
          </div>
          <div className="flex items-center justify-between my-2">
            <label htmlFor="cutoffCoef-input" className="font-semibold">
              Hours Index
            </label>
            <input
              id="hrsIndex-input"
              name="hrsIndex-input"
              type="number"
              value={hrsIndex}
              onChange={(event) => handleChange(event, setHrsIndex)}
              className="custom-number-input px-4 py-2 border border-gray-600 rounded-md bg-gray-100 text-white focus:outline-none focus:border-white-500 focus:ring-1 focus:ring-white-500"
              placeholder={String(cutoff)}
            ></input>
          </div>
          <button
            id="save"
            onClick={handleChanges}
            className={
              "mt-4 p-4 w-full border-2 rounded-lg  dark:border-gray-600 cursor-pointer dark:hover:border-gray-500  dark:bg-[#212121] dark:hover:bg-[#121212] "
            }
          >
            Save Changes
          </button>
          <button
            id="resetDefaults"
           
            onClick={resetDefaults}
            className={
              "mt-4 p-4 w-full border-2 rounded-lg  dark:border-gray-600 cursor-pointer dark:hover:border-gray-500  dark:bg-[#212121] dark:hover:bg-[#121212] "
            }
          >
            Reset to Defaults
          </button>
        </div>
            
        <div
          id="toast-default"
          className={classNames("flex m-auto justify=center items-center w-full max-w-xl p-4 text-gray-500 bg-white rounded-lg shadow dark:text-white-100 dark:bg-gray-100", {"hidden": !saveChanges})}
          role="alert"
        >
          <div className="inline-flex items-center border-1 rounded-lg  dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600 justify-center flex-shrink-0 w-8 h-8 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>
          </div>
          <div className="ms-3 text-md font-normal">{toastText}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 items-center border-1 rounded-lg  dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-white-100 dark:hover:text-white dark:bg-gray-100 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
            onClick={() => setSaveChanges(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
