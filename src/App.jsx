import "./Styles/Global.css";
import Navbar from "./Components/Navbar"
import HomePage from "./Components/HomePage";
import MyList from "./Components/MyList";
import TrendingNow from "./Components/TrendingNow";
import Popular from "./Components/Popular";
import TvShows from "./Components/TvShows";
import TopRated from "./Components/TopRated";
import Susepenseful from "./Components/Susepenseful";
import Movies from "./Components/Movies";
import Footer from "./Components/Footer";
import Documentary from "./Components/Documentary";
import ActionMovies from "./Components/ActionMovies";
import Fantasy from "./Components/Fantasy";

import axios from 'axios';
import {useQuery} from '@tanstack/react-query'

function App() {
  // My API Setting Configurations
  const API_KEY = "11a61ae7e3b2ca3ab361c0a1fa158769";
  const API_BASE_URL = "https://api.themoviedb.org/3";


  const {data: genres} = useQuery(["genres"], ()=>{
      return axios.get(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`).then((res) => res.data.genres);
  });

  const {data: genresTV} = useQuery(["genresTV"], ()=>{
    return axios.get(`${API_BASE_URL}/genre/tv/list?api_key=${API_KEY}`).then((res) => res.data.genres);
  });

  function close_srch(){
    document.getElementById("Search_container").style.backgroundColor = "transparent"
    document.getElementById("Search_container").style.border = "1px solid transparent"
    document.getElementById("search_input").style.width = "0px"
    document.getElementById("close_icon").style.width = "0px"
    document.getElementById("close_search").style.display = "none"
  }
  return (
    <div className="App">
      <Navbar
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
      />
      <div onClick={close_srch}>
        <HomePage/>
        <MyList 
          genres = {genres}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <TrendingNow
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <Susepenseful
          genres = {genresTV}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <TopRated
          genres = {genres}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <TvShows
          genres = {genresTV}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <Movies
          genres = {genres}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <Popular
          genres = {genres}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <Documentary
          genres = {genresTV}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <ActionMovies
          genres = {genres}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <Fantasy
          genres = {genres}
          api_key = {API_KEY}
          api_base_url ={API_BASE_URL}
        />
        <Footer/>
      </div>
    </div>
  )
}

export default App
