import React from 'react'
import { BASE_URL } from '@/components/apiUrls'
import { NewsType } from '@/components/types'

const newMessage:NewsType = {
		id:0, item_type:'story', title:"news", api_id:0, by:'idris', created_at:"20"
	};

export async function generateStaticParams(){
	return [{news_type: '1'}, {news_id: '2'}]
}


async function getNews(params:{news_id:number, news_type:string}){
	const {news_id, news_type} = params
	
	const data = {
		news:newMessage,
		status:200,
		message:""
	}

	try {
		const url = `${BASE_URL}/news-api/${news_type}/${news_id}`
		const resp = await fetch(url, {method:'GET', redirect:'follow'});
		if (resp.status > 399) throw new Error(`${resp.status}`);
		data.news = await resp.json();
	}
	catch {
		data.message= "an Error has occured";
		data.status = 404;
	}
	return data;
}

export default async function NewsItem({params}:any) {
	const res = await getNews(params)
	const {message, status, news} = res;
	const { url, text, title} = news;

	if (status > 399) return <div>{message}</div>;
	return (
		<div  className="news-detail w-100 mx-[5rem]">
		<h2 className="flex justify-center p-4 w-full text-2xl">{title}</h2>
		
		{
			text && <p className="flex  justify-center">
				{text}
			</p>
		}

		{url &&  <span className="flex w-full bg-red-100 justify-center"> 
					More about the news at  
					<a className="ml-3 text-blue-500"  href={url}> {url}</a>
				</span>
		}
		</div>
		)
	
}