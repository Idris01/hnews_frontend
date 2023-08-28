import React from 'react'

export type NewsType = {
	item_type:string,
	id:number,
	title:string,
	api_id:number,
	by: string,
	text?:string,
	url?:string,
	descendants?:number,
	created_at: string
}

export type NewsDataType = {
	error: string;
	content: NewsType[];
	loading:boolean;
	setNews: (news: NewsType[])=>void;
	clearError: () => void;
	updatePage: () => void;
	toNextPage: () => void;
	filters: string[];
	toPrevPage: () => void;
	pagesCount: number;
	currentPage: number;
	numPerPage: number;
	doFilter: (e: string[]) => void;
	setError: (error: string)=> void;
	stopLoading: () => void;
	startLoading: () => void;
	setFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
	prevPage: string;
	nextPage: string;
	getNewsData:(endpoint:string) => void;
	doSearch:(searchText:string) => void;

}