"use client"

import React, { useState, useEffect, useContext } from 'react'
import { NewsContext } from '@/components/ContextProvider'
import { NewsType } from '@/components/types'
import Loader, { ContentEmpty } from '@/components/UI'

const initialData = {
	error:"",
	content:[]
}



export default function News() {
	const {
		toPrevPage, toNextPage,
		error, content, loading, prevPage, nextPage,
		currentPage, pagesCount, numPerPage, filters} = useContext(NewsContext);


	const startIndex = (currentPage-1) * numPerPage;

	return (
		<div className="news">
		{
			!loading && error.trim().length === 0 && content.length != 0 &&
			<div className="news-container">
				<ul >
					{content.map((item:NewsType)=><li key={item.api_id}>{item.title}</li>)}
				</ul>
				{	(nextPage!= null ||  prevPage != null) &&
					<div className="page-nav flex justify-around sticky bottom-0 bg-white h-[3rem] mt-[2rem]">
						<button className="" onClick={toPrevPage}>prev</button>
						<span>page {currentPage} of {pagesCount}</span>
						<button onClick={toNextPage}>next</button>
					</div>
				}
			</div>

		}
		{
			loading && <Loader />
		}
		{
			!loading && error.trim().length > 0 &&
			<div>
				{error}
			</div>
		}
		{
			!loading && error.trim().length === 0 && content.length === 0 &&
			 <ContentEmpty />

		}
		</div>
		)
}
