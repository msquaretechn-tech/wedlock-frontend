import Ai from '../../components/home/Ai'
import Search from '../../components/home/Search'
import Archive from '../../components/home/Archive'
import YouTube from '../../components/home/YouTube'
// import Navbar from '../../components/home/Navbar'
import GetApp from '../../components/home/GetApp'
import Hero from '../../components/home/Hero'
import Details from '../../components/home/Details'
import Stories from '../../components/home/Stories'
import Matching from '../../components/home/Matching'
import Feature from '../../components/home/Feature'
import Pre from '../../components/home/Pre'

const Home = () => {
  return (
    <div>
      <Hero />
      <Archive />
      <GetApp />
      <Matching />
      <YouTube />
      <Stories />
      <Pre/>
      <Feature />
      <Ai />
      <Search />
      <Details />

      
    </div>
  )
}

export default Home
