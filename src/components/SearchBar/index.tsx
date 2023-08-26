"use client"
import React, { useContext, useState } from 'react'
import { NewsContext } from '@/components/ContextProvider'

function SearchBar() {
	const [inputData, setInputData] = useState("");
	const {setNews, startLoading, stopLoading, loading, setError, clearError} = useContext(NewsContext)
	const buttonDisabled = loading || inputData.trim().length === 0
	const inputHandler = (e)=>{
		const {value} = e.target;
		setInputData(value);

	}
	const doSearch = () =>{
		if (inputData.length === 0) return;
		(async ()=>{
			startLoading();
			setInputData("")
			try{
				const resp = await fetch(`http://localhost:8000/news-api/latest/?search=${inputData}`);
				if (resp.status === 200){
					const news = await resp.json()
					stopLoading();
					clearError();
					setNews(news);
				}
				else{
					setError(`Error ${resp.status}`)
					stopLoading()
				}
			}
			catch {
				stopLoading();
				setError("Unable to load data")
			}
			
		})();
	}
	return (
		<div className="flex justify-around sticky top-[4rem] px-3
                      py-5 gap-2 text-xl border border-bottom
                      h-[6rem] w-[100%] bg-yellow-200">
        <section className="border rounded">
          <button className="bg-gray-300 h-[100%] px-3">Filter</button>
        </section>
        <section className="flex justify-center items-center border rounded">
        <input value={inputData} onChange={inputHandler}  className="h-[100%]" type="text" name="" id="" placeholder="Enter search" />
        <button onClick={doSearch} className={`bg-gray-200 cursor-pointer h-[100%] 
        					px-3 ${buttonDisabled? "bg-orange-400 text-gray-500 text-gray-100" 
        					: "bg-green-400 text-white"}`} disabled={buttonDisabled} >Search</button>
        </section>
      </div>
	)
}

export default SearchBar