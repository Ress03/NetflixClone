import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Netflix_Logo from "../Assets/Netflix_Logo.png"
import Default_Avatar from "../Assets/Default_Avatar.png"
import search_icon from "../Assets/search_icon.png"
import close_icon from "../Assets/close_icon.png"

// From Mui
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//Call jquery library
import $ from 'jquery'; 
import SearchItems from './SearchItems';
import VideoModal_Search from './VideoModals/VideoModal_Search';

// From Moment
import moment from 'moment';

export default function Navbar(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    close_search();
  };

  //Navigation bar effect when user is scrolling
  var lastScrollTop = 0;
  $(window).scroll(function(event){    
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
        document.getElementById("navbar").style.backgroundColor = "#080808"
      }
      else if($(window).scrollTop() === 0) {  
        document.getElementById("navbar").style.backgroundColor = "transparent"
      }
      lastScrollTop = st;
  }); 

  $("#Search_collection").scroll(function(event){    
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
      document.getElementById("navbar").style.backgroundColor = "#080808"
    }
    else if($(window).scrollTop() === 0) {  
      document.getElementById("navbar").style.backgroundColor = "transparent"
    }
    lastScrollTop = st;
  }); 


  //Click Search Icon
  function click_search_icon(){
      document.getElementById("Search_container").style.backgroundColor = "rgba(0, 0, 0, 0.616)"
      document.getElementById("Search_container").style.border = "1px solid #ffff"
      document.getElementById("search_input").style.width = "190px"
      document.getElementById("close_icon").style.width = "40px"
      document.getElementById("search_input").focus();
  } 
  function close_search(){
    setResults([]);
    document.getElementById("search_input").blur();
    document.getElementById("search_input").value = null
    document.getElementById("Search_collection").style.backgroundColor = "transparent"
    document.getElementById("Search_collection").style.opacity = "0"
    setTimeout(function () {
      document.getElementById("Search_collection").style.display = "none"
    }, 400);
    document.getElementById("Search_container").style.backgroundColor = "transparent"
    document.getElementById("Search_container").style.border = "1px solid transparent"
    document.getElementById("search_input").style.width = "0px"
    document.getElementById("close_icon").style.width = "0px"
    document.getElementById("close_search").style.display = "none"
  }

  // const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const handleChange = async (event) => {
    if(document.getElementById("search_input").value.length !== 0){
      document.getElementById("close_search").style.display = "block"
      document.getElementById("Search_collection").style.display = "block"
      setTimeout(function () {
        document.getElementById("Search_collection").style.backgroundColor = "#141414"
        document.getElementById("Search_collection").style.opacity = "100%"
        document.getElementById("related_title").style.opacity = "100%"
      }, 300);

      setTimeout(function () {
        // Mute trailer
        document.getElementById("trailer_video").muted = true
        document.getElementById("unmute_icon").style.display = "block"
        document.getElementById("replay_icon").style.display = "none"
        document.getElementById("mute_icon").style.display = "none"
        localStorage.setItem("trailer_ctr", 1)
      }, 500);


      const response = await fetch(`${props.api_base_url}/search/multi?page=1&api_key=${props.api_key}&query=${document.getElementById("search_input").value}`);
      const response_page2 = await fetch(`${props.api_base_url}/search/multi?page=2&api_key=${props.api_key}&query=${document.getElementById("search_input").value}`);
      const response_page3 = await fetch(`${props.api_base_url}/search/multi?page=3&api_key=${props.api_key}&query=${document.getElementById("search_input").value}`);
      const data = await response.json();
      const data_page2 = await response_page2.json();
      const data_page3 = await response_page3.json();
      setResults([...data.results, ...data_page2.results, ...data_page3.results]);
    }
    else{
      document.getElementById("Search_collection").style.backgroundColor = "transparent"
      document.getElementById("Search_collection").style.opacity = "0"
      document.getElementById("related_title").style.opacity = "0"
      setTimeout(function () {
        document.getElementById("Search_collection").style.display = "none"
      }, 400);
      setResults([]);
    }
  };

  function uniqurArray(array){
    var a = array.concat();
    for(var i=0; i<a.length; i++) {
        for(var j=i+1; j<a.length; j++) {
            if(a[i].title === a[j].title){
                a.splice(j--, 1);
            }
        }
    }
    return a;
  }

  var ctr_related_title = 0
  const related_Titles = uniqurArray(results).map((result) => {
    ctr_related_title++
    if(ctr_related_title < 6 && result.title !== undefined){
      return (
        <span id="related_searches_list" key={result.id}>
          {result.title}
          {ctr_related_title !== 5 ? " | " : ""}  
        </span>
      )
    }
  });

  // Hook for getting genres
  const [genres, setGenres] = useState([]);
  const loadGenre = async () => {
    const res = await axios.get(`${props.api_base_url}/genre/movie/list?api_key=${props.api_key}`);
    setGenres(res.data.genres);
  };
  // Use effect for all hooks
  useEffect(() => {
    loadGenre();
  }, [props.api_base_url, props.api_key]);

  function uniqurArrayID(array){
    var a = array.concat();
    for(var i=0; i<a.length; i++) {
        for(var j=i+1; j<a.length; j++) {
            if(a[i].id === a[j].id){
                a.splice(j--, 1);
            }
        }
    }
    return a;
  }

  var key_mapping = -1;
  const EachItems = uniqurArrayID(results).map((res) => {
    key_mapping++
    var genres_array = [] 
    if(res.genre_ids !== undefined){
      genres.map((response) => {
        for(var x = 0 ; x < res.genre_ids.length ; x++){
          response.id === res.genre_ids[x] ? genres_array.push(response.name) : ""
        }
      });
    }
      return (
        <div className='eachSwiper_Search' key={res.id}>
          <SearchItems
            image = {res.backdrop_path}
            movie_id = {res.id}
            class_count = {key_mapping}
            class_key = {"Search"+key_mapping}
            genres = {genres_array}
            title = {res.title}
            name = {res.name}
            date = {res.release_date}
            first_air_date = {res.first_air_date}
            overview = {res.overview}
            click_funtion = {show_info_Search}
            media_Type = {res.media_type}
            mv_id = {"movie_id_Search"}
            nm_id = {"name_key_Search"}
            gr_id = {"genre_key_Search"}
            dk_id = {"date_key_Search"}
            ov_id = {"overview_key_Search"}
            mt_id = {"mediaType_key_Search"}
          />
        </div>
      )
  });

  // Youtube player functions 
  const [trailerId_Search, settrailerId_Search] = useState("");
  var MOVIE_ID_Search = ""
  
  const [videoStatus, setVideoStatus] = useState(false);
  function show_info_Search(){
    setVideoStatus(true)
  }

  useEffect(() => {
    if(videoStatus === true){
      for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
        document.getElementsByClassName("list_container")[x].style.zIndex = "-1"
        document.getElementsByClassName("list_container")[x].style.position = "static"
      }
      
      document.getElementById("youtube_modal_Search").style.display = "flex"
      document.getElementById("progress_bar_Search").style.display = "flex"
  
      var title = document.getElementById("name_key_Search").value
      var genre = document.getElementById("genre_key_Search").value
      var date = document.getElementById("date_key_Search").value
      var overview = document.getElementById("overview_key_Search").value
  
      document.getElementById("modal_movie_title_Search").textContent = title
      genre = genre.replace(/,/g, " ● ");
      document.getElementById("modal_movie_genre_Search").textContent = genre
      var dateFormat =  moment(date).format('LL');
      document.getElementById("modal_movie_date_Search").textContent = dateFormat
      document.getElementById("modal_movie_overview_Search").textContent = overview
  
      MOVIE_ID_Search = document.getElementById("movie_id_Search").value;
      setTimeout(function () {
        document.getElementById("progress_bar_Search").style.display = "none"
        document.getElementById("my_modal_Search").style.display = "block"
        loadTrailer_Search();
        if(loaded === true){
          playVideo_Search()
        }
      }, 700);
    }
  }, [videoStatus]);


  function close_info(){
    setVideoStatus(false)
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "1"
    }
    if(loaded === true){
      stopVideo_Search()
      document.getElementById("youtube_modal_Search").style.display = "none"
      document.getElementById("progress_bar_Search").style.display = "block"
      document.getElementById("my_modal_Search").style.display = "none"
    }
    settrailerId_Search(null);
    setLoaded(false)
  }

  const [loaded, setLoaded] = useState(false);
  const loadTrailer_Search = async () => {
    const res = await axios.get(`${props.api_base_url}/${document.getElementById("mediaType_key_Search").value}/${MOVIE_ID_Search}/videos?api_key=${props.api_key}`);
    if(res.data.results.length !== 0){
      for(var i = 0 ; i < res.data.results.length ; i++){
        if (res.data.results[i].name.toUpperCase().indexOf('TRAILER') > -1)
        {
          setLoaded(true)
          settrailerId_Search(res.data.results[i].key);
          break;
        }
        else{
          setLoaded(false)
          settrailerId_Search(res.data.results[0].key);
        }
      }
    }
  };

  // Youtube Video Configuration
  const [playerSearch, setPlayerSearch] = useState(null);
  const onReady_Search = (event) => {
    setPlayerSearch(event.target);
  };
  const stopVideo_Search = () => {
    playerSearch.stopVideo();
  };
  const playVideo_Search = () => {
    playerSearch.playVideo();
  };

  function sub_close(){
    if(event.srcElement.id === "youtube_modal_Search"){
      close_info()
    }
  }


  return (
    <>
    <nav id="navbar" onClick={close_info}>
      <div className='left'>
        <img src={Netflix_Logo} alt="Netflix Logo" className='logo' loading="lazy"/>

        <div className='nav_links'>
          <a onClick={close_search} className='links active' href='#HomePage'>Home</a>
          <a onClick={close_search} className='links' href='#tvShows_now_container'>TV Shows</a>
          <a onClick={close_search} className='links' href='#Movies_now_container'>Movies</a>
          <a onClick={close_search} className='links' href='#Popular_now_container'>New & Popular</a>
          <a onClick={close_search} className='links' href='#list_container'>My List</a>

          {/* For small devices links */}
          <div className='browse_container'  onClick={handleClick}>
            <p>Browse</p>
            <ArrowDropDownIcon/>
          </div>

          {/* Menu Container on small devices */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div></div>
            <MenuItem onClick={handleClose}>
              <a className='mui_links mui_links_active' href='#HomePage'>Home</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#tvShows_now_container'>TV Shows</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#Movies_now_container'>Movies</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#Popular_now_container'>New & Popular</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#list_container'>My List</a>
            </MenuItem>
            
          </Menu>

        </div>
      </div>

      <div className='right'>
        <div className='Search_container' id="Search_container">
          <div className='search_icon' onClick={click_search_icon}>
            <img src={search_icon} alt="Search"/>
          </div>
          <input type="text" 
            id="search_input" 
            placeholder='Titles, people, genres'
            onChange={handleChange}
            autoComplete="off"
            />
          <div className='search_icon' id="close_icon">
            <img src={close_icon} alt="Close" id="close_search" onClick={close_search}/>
          </div>
        </div>
        
        <img src={Default_Avatar} alt="Avatar" className='avatar' loading="lazy"/>
      </div>
    </nav>

    {/* Search Container Collection*/}
    <div className='Search_collection' id="Search_collection">
      <div className='container'>
        <p className='related_title' id="related_title">Explore titles related to: &nbsp;
          {related_Titles}
        </p>

        <div className='item_container'>
            {EachItems}
        </div>
      </div>


      {/* Modal for clicking each_item */}
      {
      videoStatus ?
        <VideoModal_Search
          close_info = {close_info}
          trailerId = {trailerId_Search}
          onReady = {onReady_Search}
          sub_close = {sub_close}
        /> : ""
      }

      {/* Movie Id Key Value */}
      <input type="hidden" id="movie_id_Search"/>
      <input type="hidden" id="name_key_Search"/>
      <input type="hidden" id="genre_key_Search"/>
      <input type="hidden" id="date_key_Search"/>
      <input type="hidden" id="overview_key_Search"/>
      <input type="hidden" id="mediaType_key_Search"/>
    </div>
    </>
  )
}
