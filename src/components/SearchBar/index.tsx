"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from  'next/link'
import { NewsContext } from '@/components/ContextProvider'
import { BASE_URL } from '@/components/apiUrls'

const filterType = ['story', 'askstory', 'poll', 'job']

function SearchBar() {
	const [inputData, setInputData] = useState("");
	const router = useRouter()
	const {
		setNews, startLoading, stopLoading, setFilter, doSearch,
		loading, setError, clearError, doFilter, filters} = useContext(NewsContext)
	const buttonDisabled = loading || inputData.trim().length === 0
	
	const inputHandler:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
		const {value} = e.target;
		setInputData(value);

	}
	const handleSearch = () =>{
		if (inputData.length === 0) return;
		setInputData("");
		doSearch(inputData);

	}

	return (
		<div className="flex justify-around sticky top-[4rem] px-3
                      py-5 gap-2 text-xl border border-bottom
                      h-[6rem] w-[100%] bg-yellow-200">
        <section className="filter-container rounded">
          <button className="bg-gray-300 h-[100%] px-3">Filter</button>
          	<ul className="filter-list">
							{filterType.map(item=>{
								return <li className="text-sm p-1" key={item}>
										<label className="" htmlFor={item}>{item.toUpperCase()}</label>
										<input onChange={setFilter} value={item} id={item} type="checkbox"/>
									</li>
							})}
							<li><button onClick={()=>doFilter([...filters])} className="text-sm py-1">submit</button></li>
					</ul>

        </section>
        <section className="flex justify-center items-center border rounded">
        <input value={inputData} onChange={inputHandler}  className="h-[100%]" type="text" name="" id="" placeholder="Enter search" />
        <button onClick={handleSearch} className={`bg-gray-200 cursor-pointer h-[100%] 
        					px-3 ${buttonDisabled? "bg-orange-400 text-gray-500 text-gray-100" 
        					: "bg-green-400 text-white"}`} disabled={buttonDisabled} >Search</button>
        </section>
      </div>
	)
}

export default SearchBar