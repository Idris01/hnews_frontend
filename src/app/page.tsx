import Image from 'next/image'
import News from '@/components/News'
import SearchBar from '@/components/SearchBar'

export default function Home(props) {
  return (
    <div className="front-page">
      <SearchBar />
      <div className="bg-orange-100">
        <News props={props} />
      </div>
    </div>
  )
}

// export async function getServerSideProps(){
//   let data = "Hello World"
//   let error = ""
//   const response = await fetch('http://127.0.0.1:8000/news-api/latest/')

//   if (response.status == 'ok'){
//     data = await response.json()
//   }
//   else {
//     error = "an error has occured"
//   }
//   return {props: {data, error}}
// }
