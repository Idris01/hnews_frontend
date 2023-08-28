import React from 'react'

export function ContentEmpty(){

	return (
		<div className="flex w-full h-full text-lg justify-center items-center">
			No result found
		</div>
		)
}

function Loader() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<span className="loader">
				</span>
				<span className="text-3xlg">LOADING ...</span>
			</div>
			
		</div>
	)
}

export default Loader