import './globals.css'
import type { Metadata } from 'next'
import Layout from '@/components/Layout'


export const metadata: Metadata = {
  title: 'Hacker news',
  description: 'All Tech related news and happenings',
}

export default async function RootLayout(props: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="">
        <Layout>
          {props.children}
        </Layout>
      </body>
    </html>
  )
}
