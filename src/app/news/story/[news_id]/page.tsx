import React from 'react'
import { BASE_URL } from '@/components/apiUrls'

export async function generateStaticParams(){
	return [{news_id: '1'}, {news_id: '2'}]
}
async function getNews(news_id:number){
	const news = await fetch(`${BASE_URL}/news-api/story`)
}

export default async function NewsItem(params: any) {
	const news = await getNews(params.news_id)
	return (
		<div>
			{params.news_id}
		</div>
	)
}