import React from 'react'

// From Mui
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function VideoModal_homepage(props) {
  function sub_close(){
    if(event.srcElement.id === "youtube_modal_homepage"){
      for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
        document.getElementsByClassName("list_container")[x].style.zIndex = "1"
      }
   
      const iframe = document.getElementById("youtube_player_hp");
      iframe.src = "";
  
      document.getElementById("youtube_modal_homepage").style.display = "none"
      document.getElementById("progress_bar_homepage").style.display = "block"
      document.getElementById("my_modal_homepage").style.display = "none"
    }
  }
  return (
    <div className='modal_container' id="youtube_modal_homepage" onClick={() => {sub_close()}}>
    <Box sx={{ display: 'flex' }} id="progress_bar_homepage">
      <CircularProgress sx={{color:"red"}} style={{height:"100px",width:"100px"}} />
    </Box>

   <div className='my_modal' id='my_modal_homepage'>
     <div className='close_btn' onClick={props.close_info}><CloseIcon/></div>
     {/* Testing youtube player */}
     <iframe 
        id="youtube_player_hp"
        frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
      </iframe>

     <div className='details_container'>
        <p className='title' id="modal_movie_title_homepage">N/A</p>
        <p className='genres' id="modal_movie_genre_homepage">N/A</p>
        <p className='date'><span>Release Date : </span> <span id="modal_movie_date_homepage">N/A</span></p>
        <div className='ovrview_container'>
          <p className='overview' id="modal_movie_overview_homepage">N/A</p>
        </div>
     </div>
   </div>
 </div>
  )
}
