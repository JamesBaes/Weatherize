import {headerFont} from "./layout.js";
import Link from "next/link";

export default function Home() {



  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-600 ">
      <main>
        <div className="bg-white p-6 flex">
          <div className="flex gap-2 flex-1/2">
            <img src="/image.png" alt="Logo" title="Weatherize Logo" width="35px" className="ml-8 w-9 h-8 "/>  
            <h1 className={`${headerFont.className} font-semibold text-black text-4xl`}>
              Weatherize
            </h1>
          </div>
          {/* This search bar component was from Flowbite*/}
          <div className="w-full"> 
            <div className=" mx-auto">
              <form className="flex items-center">   
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
              </form>
            </div>
          </div>
          <div className="flex flex-1 ml-10 mt-3 gap-10">
            <div className={`${headerFont.className} font-semibold text-black text-xl`}>
              Home
            </div>
            <div className={`${headerFont.className} font-semibold text-black text-xl`}>
              About
            </div>
          </div>    
        </div>             
      </main> 
    </div>
  );
}