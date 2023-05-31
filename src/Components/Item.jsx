import React from 'react';
import play_icon from '../Assets/play_icon.png'
import add_icon from '../Assets/add_icon.png'
import down_icon from '../Assets/down_icon.png'
import handler_img from "../Assets/handler_img.jpg"

// From Mui
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// uuid
import uuid from 'react-uuid';

import { LazyLoadImage } from 'react-lazy-load-image-component';

// Tooltip Configuration
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: '#282828',
    boxShadow: theme.shadows[1],
    fontSize: 20,
  },
}));

export default function Item(props) {
  function hover_this_item(){
    if (window.innerWidth > 821) {
        document.getElementById(props.index_id).style.position = "relative"
        document.getElementById(props.index_id).style.zIndex = "2"
  
        document.getElementById("each_image"+props.class_key).style.marginTop = "-100px"
  
        props.class_count !== 0 ? document.getElementById("each_image"+props.class_key).style.marginLeft = "-55px" : ""
        document.getElementById("each_image"+props.class_key).style.height = "auto"
        document.getElementById("each_image"+props.class_key).style.width = "400px"
        document.getElementById("each_image"+props.class_key).style.zIndex = "1"
        document.getElementById("each_image"+props.class_key).style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px"
  
        document.getElementById("movie_cover"+props.class_key).style.height = "220px"
        document.getElementById("movie_cover"+props.class_key).style.width = "400px"
  
        for(var x = 0 ; x < document.getElementsByClassName("genres"+props.class_key).length ; x++){
          document.getElementsByClassName("genres"+props.class_key)[x].style.color = "#CECBCB"
        }
    }
  }

  function out_hover_this_item(){
    document.getElementById(props.mv_id).value = null
    document.getElementById(props.nm_id).value = null
    document.getElementById(props.gr_id).value = null
    document.getElementById(props.dk_id).value = null
    document.getElementById(props.ov_id).value = null
    if (window.innerWidth > 821) {
      document.getElementById(props.index_id).style.position = "static"
      document.getElementById(props.index_id).style.zIndex = "1"
      document.getElementById("each_image"+props.class_key).style.marginTop = "0px"

      props.class_count !== 0 ? document.getElementById("each_image"+props.class_key).style.marginLeft = "0" : ""
      document.getElementById("each_image"+props.class_key).style.height = "160px"
      document.getElementById("each_image"+props.class_key).style.width = "100%"
      document.getElementById("each_image"+props.class_key).style.zIndex = "0"
      document.getElementById("each_image"+props.class_key).style.boxShadow = "none"

      document.getElementById("movie_cover"+props.class_key).style.height = "160px"
      document.getElementById("movie_cover"+props.class_key).style.width = "280px"
    }
  }

  function set_Movie_Details(){
    document.getElementById("Search_container").style.backgroundColor = "transparent"
    document.getElementById("Search_container").style.border = "1px solid transparent"
    document.getElementById("search_input").style.width = "0px"
    document.getElementById("close_icon").style.width = "0px"
    document.getElementById("close_search").style.display = "none"

    props.media_Type !== undefined ? document.getElementById(props.mt_id).value = props.media_Type : ""
    document.getElementById(props.mv_id).value = props.movie_id
    document.getElementById(props.nm_id).value = props.title === undefined ? props.name : props.title
    document.getElementById(props.gr_id).value = props.genres
    document.getElementById(props.dk_id).value = props.date === undefined ? props.first_air_date : props.date
    document.getElementById(props.ov_id).value = props.overview
  }


  return (
    <div className="each_image" id={"each_image"+props.class_key} onMouseOver={hover_this_item} onMouseOut={out_hover_this_item}
    onClick={() => { set_Movie_Details();props.click_funtion()}}
    >

    <LazyLoadImage
      effect="blur"
      id={"movie_cover"+props.class_key}
      alt="Movie Cover"
      src={"https://image.tmdb.org/t/p/original/" + props.image}
      className='movie_cover'
      onError={(e) => { e.target.onerror = null; e.target.src = handler_img }}
    />


      <div className='btn_configuration'>
        <div className='side'>
          <div className='circle'>
            <img src={play_icon} alt="Play" loading="lazy" className='circle_icon'/>
          </div>
          <LightTooltip title={<b>Add to My List</b>} arrow sx={{'& .MuiTooltip-arrow': {color: '#ffff',},}}> 
            <div className='circle'>
              <img src={add_icon} alt="Add to my list" loading="lazy" className='circle_icon'/>
            </div>
          </LightTooltip>
        </div>

        <div className='side'>
          <LightTooltip title={<b>More info</b>} arrow sx={{'& .MuiTooltip-arrow': {color: '#ffff',},}}>
            <div className='circle_other'>
              <img src={down_icon} alt="Add to my list" loading="lazy" className='circle_icon'/>
            </div>
          </LightTooltip>
        </div>
      </div>

      <div className='title_part'>
        <p>{props.title === undefined ? props.name : props.title}</p>
      </div>

      <div className='section_part'>
        {
          props.genres.map((response) => {
            return <p key={uuid()}><b>● &nbsp;</b><span className={"genres"+props.class_key}>{response}</span></p>
          })
        }
      </div>

    </div>

  )
}
