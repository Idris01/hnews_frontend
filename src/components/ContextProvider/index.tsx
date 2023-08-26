"use client"
import { createContext, useState, useEffect } from 'react';

const newsData = {
	error:"",
	content:[],
	loading:false,
	setNews:function(){},
	clearError:function(){},
	currentPage:0,
	pagesCount:0,
	updatePage:function(){},
	nextPage:function(){},
	numPerPage:20

}

export const NewsContext = createContext(newsData)

export default function ContextProvider({children}){
	const [updateNews, setUpdateNews] = useState(newsData);
	const { currentPage, pagesCount } = updateNews;

	useEffect(()=>{
		async function getData(){
			try {
				const res = await fetch('http://localhost:8000/news-api/latest/');
				if (res.status === 200){
					const news_data = await res.json()
					let news_size = await Math.ceil(news_data.length/updateNews.numPerPage)
					setUpdateNews(prevData=>({
						...prevData,
						content:news_data,
						currentPage:1,
						pagesCount:news_size,
						error:"",loading:false}))
				}
			}
			catch {
				setUpdateNews(prevData=>({...prevData,error:"Unable to fetch data",loading:false}))
			}
		}
		getData()
	},[])

	function setNews(data){
		let news_size = Math.ceil(data.length/updateNews.numPerPage)
		setUpdateNews(prevData=>({
			...prevData,
			content:data,
			currentPage:1,
			pagesCount:news_size,
			error:"", loading:false
		}))
	}

	function startLoading(state){
		setUpdateNews(prevData=>({
			...prevData,
			loading:true
		}))
	}
	function stopLoading(){
		setUpdateNews(prevData=>({
			...prevData,
			loading:false
		}))
	}
	function clearError(){
		setUpdateNews(prevData=>({
			...prevData,
			error:""
		}))
	}
	function setError(error){
		setUpdateNews(prevData=>({
			...prevData,
			error:error
		}))
	}

	function prevPage(){
		if ((currentPage - 1) >= 1){
					let next = currentPage
					let prev = currentPage - 1
					setUpdateNews(prevData=>({
						...prevData,
						currentPage:prev
					}))
				}
	}

	function nextPage(){
		if ((currentPage + 1) <= pagesCount){
			let prev = currentPage
			let next = currentPage + 1
			setUpdateNews(prevData=>({
				...prevData,
				currentPage:next
			}))
		}
	}
	
	return (
		<NewsContext.Provider value={{
			...updateNews,
			setNews,
			startLoading,
			stopLoading,
			clearError,
			setError,
			nextPage,
			prevPage,
		}}>
			{children}
		</NewsContext.Provider>
		)
}