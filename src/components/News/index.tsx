"use client"

import React, { useState, useEffect, useContext } from 'react'
import { NewsContext } from '@/components/ContextProvider'
const initialData = {
	error:"",
	content:[]
}

export default function News(props) {
	const {
		error, content, loading, prevPage, nextPage,
		currentPage, pagesCount, numPerPage} = useContext(NewsContext);

	const startIndex = (currentPage-1) * numPerPage;

	return (
		<div className="news">
		{
			!loading && error.trim().length === 0 &&
			<div>
				<ul className="news-container">
					{content.slice(startIndex, startIndex + numPerPage).map(item=><li key={item.api_id}>{item.title}</li>)}
				</ul>
				{	pagesCount > 1 &&
					<div className="page-nav flex justify-around sticky bottom-0 bg-white h-[3rem] mt-[2rem]">
						<button className="" onClick={prevPage}>prev</button>
						<span>page {currentPage} of {pagesCount}</span>
						<button onClick={nextPage}>next</button>
					</div>
				}
			</div>

		}
		{
			loading && <div>Loading...</div>
		}
		{
			!loading && error.trim().length > 0 &&
			<div>
				{error}
			</div>
		}
		{
			!loading && error.trim().length === 0 && content.length === 0 &&
			<div>No match found</div>
		}
		</div>
		)
}
