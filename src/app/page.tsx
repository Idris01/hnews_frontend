import News from '@/components/News'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <div className="front-page">
      <SearchBar />
      <div className="bg-orange-100">
        <News />
      </div>
    </div>
  )
}
