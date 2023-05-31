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
import VideoModal_suspenseful from './VideoModals/VideoModal_suspensful';
import {useQuery} from '@tanstack/react-query'

export default function Susepenseful(props) {
  // Generates Random Number from 1 - 20   
  var random_keySus =  Math.floor(Math.random() * 20) + 1;
  const {data: suspenseful} = useQuery(["suspenseful"], ()=>{
    return axios.get(`${props.api_base_url}/tv/popular?api_key=${props.api_key}&language=en-US&page=${random_keySus}`).then((res) => res.data.results);
  });

  var key_mapping = -1; 
  const myList_mapping = suspenseful?.map((res) => {
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
           class_key = {"suspenseful"+key_mapping}
           genres = {genres_array}
           title = {res.title}
           name = {res.name}
           date = {res.release_date}
           first_air_date = {res.first_air_date}
           overview = {res.overview}
           click_funtion = {show_info_suspenseful}
           index_id = {"suspenseful_now_container"}
           mv_id = {"movie_id_suspenseful"}
           nm_id = {"name_key_suspenseful"}
           gr_id = {"genre_key_suspenseful"}
           dk_id = {"date_key_suspenseful"}
           ov_id = {"overview_key_suspenseful"}
          />
        </SwiperSlide>
      )
  });


  function swipe_right() {
    document.getElementsByClassName("swiper-button-next")[2].click();

    document.getElementsByClassName("left_btn_suspenseful")[0].style.display = "flex"
    document.getElementsByClassName("left_btn_suspenseful")[0].style.left = "0"
    document.getElementsByClassName("image_carousel_container_suspenseful")[0].style.marginLeft = "0"
  }
  function swipe_left() {
    document.getElementsByClassName("swiper-button-prev")[2].click();
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
  const [trailerId_suspenseful, settrailerId_suspenseful] = useState("");
  var MOVIE_ID_suspenseful = ""

  const [videoStatus, setVideoStatus] = useState(false);
  function show_info_suspenseful(){
    setVideoStatus(true)
  }

  useEffect(() => {
    if(videoStatus === true){
      for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
        document.getElementsByClassName("list_container")[x].style.zIndex = "-1"
        document.getElementsByClassName("list_container")[x].style.position = "static"
      }
      
      document.getElementById("youtube_modal_suspenseful").style.display = "flex"
      document.getElementById("progress_bar_suspenseful").style.display = "flex"
  
      var title = document.getElementById("name_key_suspenseful").value
      var genre = document.getElementById("genre_key_suspenseful").value
      var date = document.getElementById("date_key_suspenseful").value
      var overview = document.getElementById("overview_key_suspenseful").value
  
      document.getElementById("modal_movie_title_suspenseful").textContent = title
      genre = genre.replace(/,/g, " ● ");
      document.getElementById("modal_movie_genre_suspenseful").textContent = genre
      var dateFormat =  moment(date).format('LL');
      document.getElementById("modal_movie_date_suspenseful").textContent = dateFormat
      document.getElementById("modal_movie_overview_suspenseful").textContent = overview
  
      MOVIE_ID_suspenseful = document.getElementById("movie_id_suspenseful").value;
      setTimeout(function () {
        document.getElementById("progress_bar_suspenseful").style.display = "none"
        document.getElementById("my_modal_suspenseful").style.display = "block"
        loadTrailer_suspenseful();
        if(loaded === true){
          playVideo_suspenseful()
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
      stopVideo_suspenseful()
    }
    settrailerId_suspenseful(null);
    setLoaded(false)
    document.getElementById("youtube_modal_suspenseful").style.display = "none"
    document.getElementById("progress_bar_suspenseful").style.display = "block"
    document.getElementById("my_modal_suspenseful").style.display = "none"
  }

  const [loaded, setLoaded] = useState(false);
  const loadTrailer_suspenseful = async () => {
    const res = await axios.get(`${props.api_base_url}/tv/${MOVIE_ID_suspenseful}/videos?api_key=${props.api_key}`);
    if(res.data.results.length !== 0){
      for(var i = 0 ; i < res.data.results.length ; i++){
        if (res.data.results[i].name.toUpperCase().indexOf('TRAILER') > -1)
        {
          setLoaded(true)
          settrailerId_suspenseful(res.data.results[i].key);
          break;
        }
        else{
          setLoaded(false)
          settrailerId_suspenseful(res.data.results[0].key);
        }
      }
    }
  };

  // Youtube Video Configuration
  const [playersuspenseful, setPlayersuspenseful] = useState(null);
  const onReady_suspenseful = (event) => {
    setPlayersuspenseful(event.target);
  };
  const stopVideo_suspenseful = () => {
    playersuspenseful.stopVideo();
  };
  const playVideo_suspenseful = () => {
    playersuspenseful.playVideo();
  };

  function sub_close(){
    if(event.srcElement.id === "youtube_modal_suspenseful"){
      close_info()
    }
  }

  return (
    <div className='list_container suspenseful_now_container' id="suspenseful_now_container">
        <p className='title for_margin_left'>Critically Acclaimed US TV Shows</p>
        <div className='image_carousel_container for_margin_left image_carousel_container_suspenseful'>
        <div className='left_btn left_btn_suspenseful' 
            onClick={swipe_left}  
            onMouseOver={() => { hover_swipe('left_btn_suspenseful','image_swipe_icon_left_suspenseful');}} 
            onMouseOut={() => { out_hover_swipe('left_btn_suspenseful','image_swipe_icon_left_suspenseful');}}
        >
            <KeyboardArrowLeftIcon id="image_swipe_icon_left_suspenseful"/>
        </div>
        <div className='right_btn right_btn_suspenseful' 
            onClick={swipe_right} 
            onMouseOver={() => { hover_swipe('right_btn_suspenseful','image_swipe_icon_right_suspenseful');}} 
            onMouseOut={() => { out_hover_swipe('right_btn_suspenseful','image_swipe_icon_right_suspenseful');}}
        >
            <KeyboardArrowRightIcon id="image_swipe_icon_right_suspenseful"/>
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
          <VideoModal_suspenseful
            close_info = {close_info}
            trailerId = {trailerId_suspenseful}
            onReady = {onReady_suspenseful}
            sub_close = {sub_close}
          /> : ""
      }
   

      {/* Movie Id Key Value */}
      <input type="hidden" id="movie_id_suspenseful"/>
      <input type="hidden" id="name_key_suspenseful"/>
      <input type="hidden" id="genre_key_suspenseful"/>
      <input type="hidden" id="date_key_suspenseful"/>
      <input type="hidden" id="overview_key_suspenseful"/>

  </div>
  )
}
