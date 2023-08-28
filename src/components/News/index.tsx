"use client"

import React, { useState, useEffect, useContext } from 'react'
import { NewsContext } from '@/components/ContextProvider'
import { NewsType } from '@/components/types'
import Loader, { ContentEmpty } from '@/components/UI'
import Link from 'next/link';

const initialData = {
	error:"",
	content:[]
}



function Story(props:{data:NewsType}){
	const {title, by, url, id, text, item_type, created_at} = props.data;
	return (
		<li>
			<Link className="flex items-center w-full h-full gap-2" href={`news/${item_type}/${id}`}>
				<span className="text-sm p-1 bg-green-200 rounded">{item_type}</span>
				<h4 className="text-lg text-blue-600">{title}</h4>
				<span className="text-xs">{created_at}</span>
				<span className="text-sm ml-auto">by - <span className="text-red-500">{by}</span></span>
			</Link>
		</li>
		)
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
					{content.map((item:NewsType)=>{
						return <Story key={item.api_id} data={item} />;
					})}
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
