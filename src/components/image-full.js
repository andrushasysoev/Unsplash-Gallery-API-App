import React, { Fragment } from 'react';
import currentDate from "../utils/index";

import { connect, useDispatch } from "react-redux";

import unliked from "../img/unlike.png";
import liked from "../img/like.png";

import { toggleLike } from "../actions/toggleLike";


const ImagesFullSize = ({ imageFull	}) => {
	const { photo } = imageFull;
	const { id, user, urls, created_at, liked_by_user, likes } = photo;
	
	
	const dispatch = useDispatch();

	const bgImages = {
	  unliked: {
		backgroundImage: "url(" + unliked + ")",
	  },
	  liked: {
		backgroundImage: "url(" + liked + ")",
	  },
	};

	const toggleLikes = (e) => {
	  e.preventDefault();
	  dispatch(toggleLike(photo, id))
	}

	return (
		<Fragment>
		  <a
		    className="gallery__a gallery-full__a"
		    target="_blank"
			rel="noreferrer"
		    href={`https://unsplash.com/@${user.username}`}
		  >
		    {user.name}
		  </a>
		  <img className="gallery-full__img" src={urls.small} alt=''/>
		  <span className="gallery-full__span-date">{currentDate(created_at)}</span>
		  <button
			className="gallery-full__like-button"
            style={liked_by_user ? bgImages.liked : bgImages.unliked}
			onClick={toggleLikes}
          ></button>
		<span className="gallery-full__span-likes">{likes} Нравится</span>
	  </Fragment>
	);
};


export function mapStateToProps(store) {

	return {
	  imagesPage: store.imagesPage,
	  imageFull: store.imageFull,
	}
  }

export default connect(mapStateToProps)(ImagesFullSize);