import React from 'react';
import "../Styles/HomePage.css";
import play_icon from '../Assets/play_icon.png'
import info_icon from '../Assets/info_icon.svg'

// Cover Photo
import lhf from "../Assets/Cover_Photo/lhf.jpg"
import lucifer_cover from "../Assets/Cover_Photo/lucifer_cover.jpg"
import nfs from "../Assets/Cover_Photo/nfs.png"
import ds from "../Assets/Cover_Photo/ds.png"

// Trailer Viedo
import lhf_video from "../Assets/Trailer_Videos/lhf.mp4"
import lucifer_video from "../Assets/Trailer_Videos/lucifer.mp4"
import nfs_video from "../Assets/Trailer_Videos/nfs.mp4"
import ds_video from "../Assets/Trailer_Videos/ds.mp4"

// Movie Title
import lhf_title from "../Assets/Movie_Titles/lhf_title.png"
import lucifer_title from "../Assets/Movie_Titles/lucifer_title.png"
import nfs_title from "../Assets/Movie_Titles/nfs_title.png"
import ds_title from "../Assets/Movie_Titles/ds_title.png"
import VideoModal_homepage from './VideoModals/VideoModal_homepage';

export default function HomePage() {

  // Generates Random Number from 0 - 4 
  var random_Number =  Math.floor(Math.random() * 4) + 0;
  const cover_photo_array = [lhf, lucifer_cover, nfs, ds]
  const trailer_video_array = [lhf_video, lucifer_video, nfs_video, ds_video] 
  const movie_title_array = [lhf_title, lucifer_title, nfs_title, ds_title] 
  const movie_description = [
    "Hell-bent on revenge, terrorists attack a group of world leaders in London. Now, it's up to agent Banning to save the US president.",
    "Lucifer has decided he's had enough of being dutiful servant in Hell and decides to spend time on Earth to understand humanity.",
    "Fresh from prison, a street racer who was framed by a wealthy business associate joins a cross-country race with revenge in mind.",
    "A Cabinet member becomes President of the United States after catastrophic attack kill everyone above him in the line of succession."
  ]
  const age_restriction_array = ["15+","18+","13+","15+"]

  var isVideoloaded = false;
  function check_video_is_loaded(){
    const videoElement = document.getElementById("trailer_video");
    videoElement.addEventListener('loadeddata', (e) => {
      //Video should now be loaded but we can add a second check
      if(videoElement.readyState >= 3){
        isVideoloaded = true
      }
    });
  }
  var myInterval = setInterval(check_video_is_loaded, 10);
  

  function toClear_interval(){
    if(isVideoloaded === true){
      clearInterval(myInterval);
      clearInterval(clear_Interval);

      setTimeout(function () {
        document.getElementById("CoverPhoto_container").style.opacity = "0%"
        document.getElementById("controls_btn").style.opacity = "100%"
        document.getElementById("controls_btn").style.pointerEvents = "auto"
        document.getElementById("trailer_video").style.pointerEvents = "auto"
      }, 4000);

      document.getElementById("trailer_video").play();

      document.getElementById("trailer_video").onended = function(e) {
        localStorage.setItem("trailer_ctr", 3)
        document.getElementById("unmute_icon").style.display = "none"
        document.getElementById("mute_icon").style.display = "none"
        document.getElementById("replay_icon").style.display = "block"
        
        document.getElementById("CoverPhoto_container").style.opacity = "100%"
        document.getElementById("CoverPhoto_container").style.transition = ".1s%"
        document.getElementById("description").style.display = "block"
      };
    }
  }
  var clear_Interval = setInterval(toClear_interval, 10);

  setTimeout(function () {
    const mq701 = window.matchMedia("(max-width: 701px)");
    const mq351 = window.matchMedia("(max-width: 351px)");
    if (mq351.matches) {
      document.getElementById("title_img").style.width = "150px"
      document.getElementById("btn_container").style.marginTop = "20px"
    }
    else if (mq701.matches) {
      document.getElementById("title_img").style.width = "250px"
      document.getElementById("btn_container").style.marginTop = "20px"
    }
    else{
      document.getElementById("title_img").style.width = "300px"
      document.getElementById("btn_container").style.marginTop = "40px"
    }
    document.getElementById("description").style.display = "none"
  }, 8000);


  // Trailer Controls
  localStorage.setItem("trailer_ctr", 1)
  function trailer_controls(){
    if(localStorage.getItem("trailer_ctr") === "1"){// With sounds
      document.getElementById("trailer_video").muted = false
      document.getElementById("unmute_icon").style.display = "none"
      document.getElementById("replay_icon").style.display = "none"
      document.getElementById("mute_icon").style.display = "block"
      localStorage.setItem("trailer_ctr", 2)
    }
    else if(localStorage.getItem("trailer_ctr") === "2"){// No sounds
      document.getElementById("trailer_video").muted = true
      document.getElementById("unmute_icon").style.display = "block"
      document.getElementById("replay_icon").style.display = "none"
      document.getElementById("mute_icon").style.display = "none"
      localStorage.setItem("trailer_ctr", 1)
    }  
    else if (localStorage.getItem("trailer_ctr") === "3"){
      document.getElementById("CoverPhoto_container").style.opacity = "0%"
      document.getElementById("CoverPhoto_container").style.transition = ".1s%"
      document.getElementById("trailer_video").muted = false
      document.getElementById("trailer_video").play()
      document.getElementById("unmute_icon").style.display = "none"
      document.getElementById("replay_icon").style.display = "none"
      document.getElementById("mute_icon").style.display = "block"
      localStorage.setItem("trailer_ctr", 2)
    }
  }
  
  // Youtube player functions 
  function play_youtube(videoId){
    document.getElementById("trailer_video").muted = true
    document.getElementById("unmute_icon").style.display = "block"
    document.getElementById("replay_icon").style.display = "none"
    document.getElementById("mute_icon").style.display = "none"
    localStorage.setItem("trailer_ctr", 1)

    const iframe = document.getElementById("youtube_player_hp");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
  }

  var myVideo = ""
  function show_info(){
      if(random_Number === 0){
        myVideo = "3AsOdX7NcJs"
        document.getElementById("modal_movie_title_homepage").textContent = "London Has Fallen"
        document.getElementById("modal_movie_genre_homepage").textContent = "Action ● Thriller"
        document.getElementById("modal_movie_date_homepage").textContent = "March 9, 2016"
        document.getElementById("modal_movie_overview_homepage").textContent = "In London for the Prime Minister's funeral, Mike Banning discovers a plot to assassinate all the attending world leaders."
      }
      else if(random_Number === 1){
        myVideo = "X4bF_quwNtw"
        document.getElementById("modal_movie_title_homepage").textContent = "Lucifer"
        document.getElementById("modal_movie_genre_homepage").textContent = "Crime ● Sci-Fi & Fantasy"
        document.getElementById("modal_movie_date_homepage").textContent = "January 25, 2016"
        document.getElementById("modal_movie_overview_homepage").textContent = "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape."
      }
      else if(random_Number === 2){
        myVideo = "H_5t589hePA"
        document.getElementById("modal_movie_title_homepage").textContent = "Need For Speed"
        document.getElementById("modal_movie_genre_homepage").textContent = "Action ● Crime ● Drama ● Thriller"
        document.getElementById("modal_movie_date_homepage").textContent = "March 12, 2014"
        document.getElementById("modal_movie_overview_homepage").textContent = "The film revolves around a local street-racer who partners with a rich and arrogant business associate, only to find himself framed by his colleague and sent to prison. After he gets out, he joins a New York-to-Los Angeles race to get revenge. But when the ex-partner learns of the scheme, he puts a massive bounty on the racer's head, forcing him to run a cross-country gauntlet of illegal racers in all manner of supercharged vehicles."
      }
      else if(random_Number === 3){
        myVideo = "zTJbUVjS--M"
        document.getElementById("modal_movie_title_homepage").textContent = "Designated Survivor"
        document.getElementById("modal_movie_genre_homepage").textContent = "Drama ● War & Politics"
        document.getElementById("modal_movie_date_homepage").textContent = "September 21, 2016"
        document.getElementById("modal_movie_overview_homepage").textContent = "Tom Kirkman, a low-level cabinet member is suddenly appointed President of the United States after a catastrophic attack during the State of the Union kills everyone above him in the Presidential line of succession."
      }
      for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
        document.getElementsByClassName("list_container")[x].style.zIndex = "-1"
        document.getElementsByClassName("list_container")[x].style.position = "static"
      }
      document.getElementById("youtube_modal_homepage").style.display = "flex"
      document.getElementById("progress_bar_homepage").style.display = "flex"
  
  
      setTimeout(function () {
        document.getElementById("progress_bar_homepage").style.display = "none"
        document.getElementById("my_modal_homepage").style.display = "block"
        play_youtube(myVideo);
      }, 700);
  }
  function close_info(){
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "1"
    }
    const iframe = document.getElementById("youtube_player_hp");
    iframe.src = "";
    document.getElementById("youtube_modal_homepage").style.display = "none"
    document.getElementById("progress_bar_homepage").style.display = "block"
    document.getElementById("my_modal_homepage").style.display = "none"
  }

  return (
    <div className='HomePage' id="HomePage">

        {/* For Cover Photo */}
        <div className='CoverPhoto_container' id="CoverPhoto_container">
            <img src={cover_photo_array[random_Number]} alt='Movie Banner'/>
        </div>

        {/* For Trailer Video */}
        <div className='TrailerVideo_container'>
            <video src={trailer_video_array[random_Number]} id="trailer_video" muted/>
        </div>

        {/* Movie Primary Details */}
        <div className='Primary_Details'>
            <img src={movie_title_array[random_Number]} alt='Title' className='title_img' id="title_img"/>
            <p className='description' id="description">{movie_description[random_Number]}</p>

            <div className='btn_container' id="btn_container">
              <div className='btn' onClick={show_info}>
                <img src={play_icon} alt="Play Icon" loading="lazy"/>
                <span>Play</span>
              </div>

              <div className='btn' onClick={show_info}>
                <img src={info_icon} alt="Play Icon" loading="lazy"/>
                <span>More Info</span>
              </div>
            </div>
        </div>

        {/* Movie play button and age restrictions */}
        <div className='age_play'>
          <div className='controls' id="controls_btn" onClick={trailer_controls}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" id="unmute_icon"><path d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="currentColor"></path></svg>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" id="mute_icon"><path d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" fill="currentColor"></path></svg>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" id="replay_icon"><path d="M13.1747 3.07702C11.01 2.79202 8.81537 3.30372 6.99988 4.51679C5.18439 5.72987 3.8718 7.56158 3.30668 9.67065C2.74155 11.7797 2.96243 14.0223 3.92815 15.9806C4.89388 17.9389 6.53859 19.4794 8.55586 20.3149C10.5731 21.1505 12.8254 21.2242 14.893 20.5224C16.9606 19.8205 18.7025 18.391 19.7942 16.5L18.0622 15.5C17.2131 16.9708 15.8582 18.0826 14.2501 18.6285C12.642 19.1744 10.8902 19.1171 9.32123 18.4672C7.75224 17.8173 6.47302 16.6192 5.7219 15.096C4.97078 13.5729 4.79899 11.8287 5.23853 10.1883C5.67807 8.5479 6.69897 7.12324 8.11102 6.17973C9.52307 5.23623 11.23 4.83824 12.9137 5.05991C14.5974 5.28158 16.1432 6.10778 17.2629 7.3846C18.1815 8.43203 18.762 9.7241 18.9409 11.0921L17.5547 10.168L16.4453 11.8321L19.4453 13.8321C19.7812 14.056 20.2188 14.056 20.5547 13.8321L23.5547 11.8321L22.4453 10.168L20.9605 11.1578C20.784 9.27909 20.0201 7.49532 18.7666 6.06591C17.3269 4.42429 15.3395 3.36202 13.1747 3.07702Z" fill="currentColor"></path></svg>
          </div>
          
          <div className='age_restriction'>
            <span>{age_restriction_array[random_Number]}</span>
          </div>
        </div>

      <div className='shadowing'></div>


      {/* Modal for clicking each_item */}
      <VideoModal_homepage
        close_info = {close_info}
      />

    </div>
  )
}
