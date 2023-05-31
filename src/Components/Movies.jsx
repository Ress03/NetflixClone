import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/List.css";

// import Carousel from 'carousel-react-rcdev'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Item from './Item';

// From Moment
import moment from 'moment';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// modules styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import {Navigation} from "swiper";
import VideoModal_Movies from './VideoModals/VideoModal_Movies';
import {useQuery} from '@tanstack/react-query'

export default function Movies(props) {

  // Generates Random Number from 1 - 5   
  var random_key =  Math.floor(Math.random() * 5) + 1;
  const {data: Movies, isLoading,isFetched} = useQuery(["Movies"], ()=>{
    return axios.get(`${props.api_base_url}/movie/popular?api_key=${props.api_key}&language=en-US&page=${random_key}`).then((res) => res.data.results);
  });

  var key_mapping = -1; 
  const myList_mapping = Movies?.map((res) => {
      key_mapping++
      var genres_array = [] 
      props.genres?.map((response) => {
          for(var x = 0 ; x < res.genre_ids.length ; x++){
            response.id === res.genre_ids[x] ? genres_array.push(response.name) : ""
          }
      });
      return (
        <SwiperSlide key = {res.id} className="eachSwiper">
          <Item
           image = {res.backdrop_path}
           movie_id = {res.id}
           class_count = {key_mapping}
           class_key = {"Movies"+key_mapping}
           genres = {genres_array}
           title = {res.title}
           name = {res.name}
           date = {res.release_date}
           first_air_date = {res.first_air_date}
           overview = {res.overview}
           click_funtion = {show_info_Movies}
           index_id = {"Movies_now_container"}
           mv_id = {"movie_id_Movies"}
           nm_id = {"name_key_Movies"}
           gr_id = {"genre_key_Movies"}
           dk_id = {"date_key_Movies"}
           ov_id = {"overview_key_Movies"}
          />
        </SwiperSlide>
      )
  });


  function swipe_right() {
    document.getElementsByClassName("swiper-button-next")[5].click();

    document.getElementsByClassName("left_btn_Movies")[0].style.display = "flex"
    document.getElementsByClassName("left_btn_Movies")[0].style.left = "0"
    document.getElementsByClassName("image_carousel_container_Movies")[0].style.marginLeft = "0"
  }
  function swipe_left() {
    document.getElementsByClassName("swiper-button-prev")[5].click();
  }

  function hover_swipe(classkey,img_icon){
    document.getElementsByClassName(classkey)[0].style.opacity = "100%"
    document.getElementById(img_icon).style.fontSize = "60px"
  }
  function out_hover_swipe(classkey,img_icon){
    document.getElementsByClassName(classkey)[0].style.opacity = "0%"
    document.getElementById(img_icon).style.fontSize = "40px"
  }

  // Youtube player functions 
  const [trailerId_Movies, settrailerId_Movies] = useState("");
  var MOVIE_ID_Movies = ""

  const [videoStatus, setVideoStatus] = useState(false);
  function show_info_Movies(){
    setVideoStatus(true)
  }

  useEffect(() => {
    if(videoStatus === true){
      for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
        document.getElementsByClassName("list_container")[x].style.zIndex = "-1"
        document.getElementsByClassName("list_container")[x].style.position = "static"
      }
      
      document.getElementById("youtube_modal_Movies").style.display = "flex"
      document.getElementById("progress_bar_Movies").style.display = "flex"
  
      var title = document.getElementById("name_key_Movies").value
      var genre = document.getElementById("genre_key_Movies").value
      var date = document.getElementById("date_key_Movies").value
      var overview = document.getElementById("overview_key_Movies").value
  
      document.getElementById("modal_movie_title_Movies").textContent = title
      genre = genre.replace(/,/g, " ● ");
      document.getElementById("modal_movie_genre_Movies").textContent = genre
      var dateFormat =  moment(date).format('LL');
      document.getElementById("modal_movie_date_Movies").textContent = dateFormat
      document.getElementById("modal_movie_overview_Movies").textContent = overview
  
      MOVIE_ID_Movies = document.getElementById("movie_id_Movies").value;
      setTimeout(function () {
        document.getElementById("progress_bar_Movies").style.display = "none"
        document.getElementById("my_modal_Movies").style.display = "block"
        loadTrailer_Movies();
        if(loaded === true){
          playVideo_Movies()
        }
        document.getElementById("trailer_video").muted = true
        document.getElementById("unmute_icon").style.display = "block"
        document.getElementById("replay_icon").style.display = "none"
        document.getElementById("mute_icon").style.display = "none"
        localStorage.setItem("trailer_ctr", 1)
      }, 700);
    }
  }, [videoStatus]);

  function close_info(){
    setVideoStatus(false)
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "1"
    }
    if(loaded === true){
      stopVideo_Movies()
    }
    settrailerId_Movies(null);
    setLoaded(false)
    document.getElementById("youtube_modal_Movies").style.display = "none"
    document.getElementById("progress_bar_Movies").style.display = "block"
    document.getElementById("my_modal_Movies").style.display = "none"
  }

  const [loaded, setLoaded] = useState(false);
  const loadTrailer_Movies = async () => {
    const res = await axios.get(`${props.api_base_url}/movie/${MOVIE_ID_Movies}/videos?api_key=${props.api_key}`);
    if(res.data.results.length !== 0){
      for(var i = 0 ; i < res.data.results.length ; i++){
        if (res.data.results[i].name.toUpperCase().indexOf('TRAILER') > -1)
        {
          setLoaded(true)
          settrailerId_Movies(res.data.results[i].key);
          break;
        }
        else{
          setLoaded(false)
          settrailerId_Movies(res.data.results[0].key);
        }
      }
    }
  };

  // Youtube Video Configuration
  const [playerMovies, setPlayerMovies] = useState(null);
  const onReady_Movies = (event) => {
    setPlayerMovies(event.target);
  };
  const stopVideo_Movies = () => {
    playerMovies.stopVideo();
  };
  const playVideo_Movies = () => {
    playerMovies.playVideo();
  };

  function sub_close(){
    if(event.srcElement.id === "youtube_modal_Movies"){
      close_info()
    }
  }
  
  return (
    <div className='list_container Movies_now_container' id="Movies_now_container">
        <p className='title for_margin_left'>Movies</p>
        <div className='image_carousel_container for_margin_left image_carousel_container_Movies'>
        <div className='left_btn left_btn_Movies' 
            onClick={swipe_left}  
            onMouseOver={() => { hover_swipe('left_btn_Movies','image_swipe_icon_left_Movies');}} 
            onMouseOut={() => { out_hover_swipe('left_btn_Movies','image_swipe_icon_left_Movies');}}
        >
            <KeyboardArrowLeftIcon id="image_swipe_icon_left_Movies"/>
        </div>
        <div className='right_btn right_btn_Movies' 
            onClick={swipe_right} 
            onMouseOver={() => { hover_swipe('right_btn_Movies','image_swipe_icon_right_Movies');}} 
            onMouseOut={() => { out_hover_swipe('right_btn_Movies','image_swipe_icon_right_Movies');}}
        >
            <KeyboardArrowRightIcon id="image_swipe_icon_right_Movies"/>
        </div>

        {/* Carousel Using React Swiper */}
        <Swiper
          mousewheel={true}
          slidesPerView={7}
          grabCursor={false}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
            {myList_mapping}
        </Swiper>
    </div>

      {/* Modal for clicking each_item */}
      {
      videoStatus ?
        <VideoModal_Movies
          close_info = {close_info}
          trailerId = {trailerId_Movies}
          onReady = {onReady_Movies}
          sub_close = {sub_close}
        /> : ""
      }

      {/* Movie Id Key Value */}
      <input type="hidden" id="movie_id_Movies"/>
      <input type="hidden" id="name_key_Movies"/>
      <input type="hidden" id="genre_key_Movies"/>
      <input type="hidden" id="date_key_Movies"/>
      <input type="hidden" id="overview_key_Movies"/>

  </div>
  )
}
