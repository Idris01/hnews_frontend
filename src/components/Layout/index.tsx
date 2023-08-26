import React from 'react'
import ContextProvider from '@/components/ContextProvider'

function Layout({children,}:{children:React.ReactNode}) {
	return (
		<ContextProvider>
			<header className="flex sticky top-0 z-10 items-center justify-center text-3xl bg-black text-white min-h-[4rem]">
				Hacker News
			</header>
			<main className="h-100"> {children}</main>
			<footer className="flex justify-center text-lg bg-gray-300 min-h-[3rem]">&copy; hacker news 2023</footer>
		</ContextProvider>
	)
}

export default Layout