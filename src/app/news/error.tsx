"use client"

import { useEffect, useState} from 'react';
import { ErrorLayout } from '@/components/Layout'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error,
	reset: () => void
}){
	const [errorDetail, setErrorDetail] = useState("")
	useEffect(()=>{
		setErrorDetail(error.toString());
	}, [error])

	return <ErrorLayout>
		<div className="flex w-full h-full flex-col justify-center items-center">
			<h2 className="text-2xl">{errorDetail}</h2>
			<button onClick={()=>reset()}>Refresh</button>
		</div>
	</ErrorLayout>
		
}