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
import VideoModal_List from './VideoModals/VideoModal_List';
import {useQuery} from '@tanstack/react-query'

export default function MyList(props) {

  // Generates Random Number from 1 - 20   
  var random_keyList =  Math.floor(Math.random() * 1) + 1;
  const {data: trending, isLoading,isFetched} = useQuery(["trending"], ()=>{
    return axios.get(`${props.api_base_url}/movie/popular?api_key=${props.api_key}&language=en-US&page=${random_keyList}`).then((res) => res.data.results);
  });

  // if(isLoading){
  //   console.log("loading")
  // }
  // if(isFetched){
  //   console.log("Fetched")
  // }

  var key_mapping = -1; 
  const myList_mapping = trending?.map((res) => {
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
           class_key = {"list"+key_mapping}
           genres = {genres_array}
           title = {res.title}
           name = {res.name}
           date = {res.release_date}
           first_air_date = {res.first_air_date}
           overview = {res.overview}
           click_funtion = {show_info}
           index_id = {"list_container"}
           mv_id = {"movie_id_List"}
           nm_id = {"name_key_List"}
           gr_id = {"genre_key_List"}
           dk_id = {"date_key_List"}
           ov_id = {"overview_key_List"}
          />
        </SwiperSlide>
      )
  });

  function swipe_right() {
    document.getElementsByClassName("swiper-button-next")[0].click();

    document.getElementsByClassName("left_btn")[0].style.display = "flex"
    document.getElementsByClassName("left_btn")[0].style.left = "0"
    document.getElementsByClassName("image_carousel_container")[0].style.marginLeft = "0"
  }
  function swipe_left() {
    document.getElementsByClassName("swiper-button-prev")[0].click();
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
  const [trailerId, setTrailerId] = useState("");
  var MOVIE_ID = ""

  const [videoStatus, setVideoStatus] = useState(false);
  function show_info(){
    setVideoStatus(true)
  }

  useEffect(() => {
    if(videoStatus === true){
      for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
        document.getElementsByClassName("list_container")[x].style.zIndex = "-1"
        document.getElementsByClassName("list_container")[x].style.position = "static"
      }
      
      document.getElementById("youtube_modal").style.display = "flex"
      document.getElementById("progress_bar").style.display = "flex"
  
      var title = document.getElementById("name_key_List").value
      var genre = document.getElementById("genre_key_List").value
      var date = document.getElementById("date_key_List").value
      var overview = document.getElementById("overview_key_List").value
  
      document.getElementById("modal_movie_title").textContent = title
      genre = genre.replace(/,/g, " ● ");
      document.getElementById("modal_movie_genre").textContent = genre
      var dateFormat =  moment(date).format('LL');
      document.getElementById("modal_movie_date").textContent = dateFormat
      document.getElementById("modal_movie_overview").textContent = overview
  
      MOVIE_ID = document.getElementById("movie_id_List").value;
      setTimeout(function () {
        document.getElementById("progress_bar").style.display = "none"
        document.getElementById("my_modal").style.display = "block"
          loadTrailer();
          if(loaded === true){
            playVideo()
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
      stopVideo()
    }
    setTrailerId(null)
    setLoaded(false)
    document.getElementById("youtube_modal").style.display = "none"
    document.getElementById("progress_bar").style.display = "block"
    document.getElementById("my_modal").style.display = "none"
  }

  const [loaded, setLoaded] = useState(false);
  const loadTrailer = async () => {
    const res = await axios.get(`${props.api_base_url}/movie/${MOVIE_ID}/videos?api_key=${props.api_key}`);
    if(res.data.results.length !== 0){
      for(var i = 0 ; i < res.data.results.length ; i++){
        if (res.data.results[i].name.toUpperCase().indexOf('OFFICIAL TRAILER') > -1)
        {
          setLoaded(true)
          setTrailerId(res.data.results[i].key);
          break;
        }
        else{
          setLoaded(false)
          setTrailerId(res.data.results[0].key);
        }
      }
    }
  };

  // Youtube Video Configuration
  const [player, setPlayer] = useState(null);
  const onReady = (event) => {
    setPlayer(event.target);
  };
  const stopVideo = () => {
    player.stopVideo();
  };
  const playVideo = () => {
    player.playVideo();
  };

  function sub_close(){
    if(event.srcElement.id === "youtube_modal"){
      close_info()
    }
  }
  
  return (
    <div className='list_container' id="list_container">
        <p className='title for_margin_left'>My List</p>
        <div className='image_carousel_container for_margin_left'>
            <div className='left_btn' 
                onClick={swipe_left}  
                onMouseOver={() => { hover_swipe('left_btn','image_swipe_icon_left');}} 
                onMouseOut={() => { out_hover_swipe('left_btn','image_swipe_icon_left');}}
            >
                <KeyboardArrowLeftIcon id="image_swipe_icon_left"/>
            </div>
            <div className='right_btn' 
                onClick={swipe_right} 
                onMouseOver={() => { hover_swipe('right_btn','image_swipe_icon_right');}} 
                onMouseOut={() => { out_hover_swipe('right_btn','image_swipe_icon_right');}}
            >
                <KeyboardArrowRightIcon id="image_swipe_icon_right"/>
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
        <VideoModal_List
          close_info = {close_info}
          trailerId = {trailerId}
          onReady = {onReady}
          sub_close = {sub_close}
        /> : ""
    }


    {/* Movie Id Key Values */}
    <input type="hidden" id="movie_id_List"/>
    <input type="hidden" id="name_key_List"/>
    <input type="hidden" id="genre_key_List"/>
    <input type="hidden" id="date_key_List"/>
    <input type="hidden" id="overview_key_List"/>
    
    </div>
  )
}
