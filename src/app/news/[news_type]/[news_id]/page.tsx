import React from 'react'
import { BASE_URL } from '@/components/apiUrls'

export async function generateStaticParams(){
	return [{news_id: '1'}, {news_type: '2'}]
}
async function getNews(params:any){
	let status = 200
	try {
		 const resp = await fetch(`${BASE_URL}/news-api/story/${params.news_id}`)
		status = resp.status;
		const news = await resp.json()
		return news;
	}	
	catch {

		return { 
			message: "An Error Has Occured",
			status
		}
	}
}

export default async function NewsItem({params}:any) {
	const news = await getNews(params.news_id)
	const {message, status} = news;

	if (status > 299) return <div>{params.news_type}</div>;
	return (
		<div>
		{params.news_type}
		</div>
		)
	
}