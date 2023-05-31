import React from 'react'

// From Mui
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// From React-youtube
import YouTube from 'react-youtube';

export default function VideoModal_Trending(props) {
    const opts = {
        playerVars: {
          autoplay: 1,
        },
    };

  return (
    <div className='modal_container' id="youtube_modal_trending" onClick={props.sub_close}>
    <Box sx={{ display: 'flex' }} id="progress_bar_trending">
      <CircularProgress sx={{color:"red"}} style={{height:"100px",width:"100px"}} />
    </Box>

   <div className='my_modal' id='my_modal_trending'>
     <div className='close_btn' onClick={props.close_info}><CloseIcon/></div>
     {/* Testing youtube player */}
     <YouTube 
       id="youtube_player"
       videoId={props.trailerId} 
       opts={opts}
       onReady={props.onReady}
     />
     <div className='details_container'>
        <p className='title' id="modal_movie_title_trending">N/A</p>
        <p className='genres' id="modal_movie_genre_trending">N/A</p>
        <p className='date'><span>Release Date : </span> <span id="modal_movie_date_trending">N/A</span></p>
        <div className='ovrview_container'>
          <p className='overview' id="modal_movie_overview_trending">N/A</p>
        </div>
     </div>
   </div>
 </div>
  )
}
