import React from 'react';

import { Link } from "react-router-dom";

import currentDate from "../utils/index";

import unliked from "../img/unlike.png";
import liked from "../img/like.png";


const PhotoComp = ({ photo }) => {
	const { id, user, urls, created_at, liked_by_user, likes } = photo;

    const bgImages = {
		unliked: {
		  backgroundImage: "url(" + unliked + ")",
		},
		liked: {
		  backgroundImage: "url(" + liked + ")",
		},
	  };

	return (
	  <li className="gallery__li">
		<a
		  className="gallery__a"
		  target="_blank"
		  rel="noreferrer"
		  href={`https://unsplash.com/@${user.username}`}
		>
		  {user.name}
	    </a>
	    <Link to={`/photos/${id}`}>
	      <img className="gallery__img" src={urls.small} alt=''/>
		</Link>
		  <span className="gallery__span-date">{currentDate(created_at)}</span>
		  <span 
		    className="gallery__span-likes"
			style={liked_by_user ? bgImages.liked : bgImages.unliked}
		  >{likes} Нравится</span>
      </li>
	);
};

export default PhotoComp;