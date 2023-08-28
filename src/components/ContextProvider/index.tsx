"use client"
import { createContext, useState, useEffect } from 'react';
import { NewsType, NewsDataType } from '@/components/types'

const newContent :NewsType[] = [];
const newFilter :string[] = []
const newsData = {
	error:"",
	content: newContent,
	loading:true,
	setNews:function(news:NewsType[]){},
	clearError:function(){},
	updatePage:function(){},
	toNextPage:function(){},
	filters:newFilter,
	toPrevPage:function(){},
	pagesCount:0,
	currentPage:0,
	numPerPage:20,
	doFilter:function(e:string[]){},
	setError: function(error:string){},
	stopLoading: function(){},
	startLoading: function(){},
	setFilter:function(e:React.ChangeEvent<HTMLInputElement>){},
	nextPage:"",
	prevPage:""

}


export const NewsContext = createContext(newsData)

export default function ContextProvider(
	{children}: {children: React.ReactNode}){
	const [updateNews, setUpdateNews] = useState<NewsDataType>(newsData as NewsDataType );
	const { currentPage, pagesCount, filters, numPerPage} = updateNews;

	useEffect(()=>{
		async function getData(){
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/news-api/latest/`);
				if (res.status === 200){
		
					const { overall_total, next, previous, results} = await res.json()
					let news_size = await Math.ceil(overall_total/numPerPage)
					setUpdateNews(prevData=>({
						...prevData,
						content:results,
						currentPage:1,
						pagesCount:news_size,
						nextPage:next,
						error:"",loading:false}))
				}
			}
			catch {
				setUpdateNews(prevData=>({...prevData,error:"Unable to fetch data",loading:false}))
			}
		}
		getData()
	},[])

	function setNews(data:NewsType[]){
		let news_size = Math.ceil(data.length/updateNews.numPerPage)
		setUpdateNews(prevData=>{

			let { filters } = prevData;
			let newData = filters.length === 0 ? 
							data : data.filter(
								(item:NewsType)=>filters.includes(item.news_type))
			
			return {
					...prevData,
					content:newData,
					currentPage:1,
					pagesCount:news_size,
					error:"", loading:false
				}
		})
	}

	function startLoading(){
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
	function setError(error: string){
		setUpdateNews(prevData=>({
			...prevData,
			error:error
		}))
	}

	function toPrevPage(){
		if ((currentPage - 1) >= 1){
					let next = currentPage
					let prev = currentPage - 1
					setUpdateNews(prevData=>({
						...prevData,
						currentPage:prev
					}))
				}
	}

	function toNextPage(){
		if ((currentPage + 1) <= pagesCount){
			let prev = currentPage
			let next = currentPage + 1
			setUpdateNews(prevData=>({
				...prevData,
				currentPage:next
			}))
		}
	}

	function setFilter(e: React.ChangeEvent<HTMLInputElement>){
		const { value, checked } = e.target
		setUpdateNews(prevData=>{
				let newFilters  = [...prevData.filters]
				if (checked){
					!newFilters.includes(value) && newFilters.push(value);
				}
				else{
					newFilters = newFilters.filter((item:string)=>item != value)
					}
				return {
					...prevData,
					filters:newFilters
					}
			});
	}


	async function doFilter(myFilters: string[]){
		const params= myFilters.length === 0 ? "?" :
					`?news_type=${myFilters.toString()}`

		setUpdateNews(prevData=>({
			...prevData,
			loading:true
		}))

		try{
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/news-api/latest/${params}`);
			if (res.status > 290){
				throw Error(`Error ${res.status}`);
			}
			const { overall_total, next, previous, results} = await res.json();

			let news_size = await Math.ceil(overall_total/numPerPage)
			setUpdateNews(prevData=>{
			return {...prevData,
			content:results,
			currentPage:1,
			pagesCount:news_size,
			nextPage:next,
			prevPage:previous,
			error:"",loading:false}})

		}
		catch {
			setUpdateNews(prevData=>({...prevData,error:"Unable to fetch data",loading:false}))
		}
	}
	
	return ( <NewsContext.Provider value={{
				...updateNews,
				setNews,
				startLoading:startLoading,
				stopLoading,
				clearError,
				setError,
				toNextPage,
				toPrevPage,
				doFilter,
				setFilter
			}}>
				{children}
			</NewsContext.Provider>
			)
}