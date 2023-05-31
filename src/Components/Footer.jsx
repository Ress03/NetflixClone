import React from 'react'
import Netflix_Logo from "../Assets/Netflix_Logo.png"

export default function Footer() {
  return (
<div className="footer_container" id="footer_container">
   <div className="top">
    <div className="logo">
      <img alt='Logo' src={Netflix_Logo} loading="lazy"/>
    </div>

    <div className="info">
        <div className="info_content">
            <p>This site was developed by Reysan. It cannot and should not be reproduced in any forms or by any means without the consent from him.</p>
        </div>
    </div>

    <div className="footer">
        <div className="footer_nav">
            <a href="#tvShows_now_container">TV Shows</a>
            <a href="#Movies_now_container">Movies</a>
            <a href="#Popular_now_container">New & Popular</a>
            <a href="#list_container">My List</a>
        </div>
        <p>Netflix Clone by Reysan © {(new Date().getFullYear())}</p>
    </div>
   </div>
</div>
  )
}
