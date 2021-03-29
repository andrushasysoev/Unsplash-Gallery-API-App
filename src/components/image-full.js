import React, { Fragment } from 'react';
import currentDate from "../utils/index";

import { connect } from "react-redux";

import unliked from "../assets/unlike.png";
import liked from "../assets/like.png";

import { likePhoto, unlikePhoto } from "../actions/indexAction";
import { unsplashLikePhoto, unsplashUnlikePhoto } from "../api/unsplash";


const ImagesFullSize = ({ photo }) => {

	console.log(photo);

	const { id, user, urls, created_at, liked_by_user, likes } = photo;

	const bgImages = {
	  unliked: {
		backgroundImage: "url(" + unliked + ")",
	  },
	  liked: {
		backgroundImage: "url(" + liked + ")",
	  },
	};

	const toggleLike = () => {
	  const token = localStorage.getItem("token");
  
	  if (photo.liked_by_user) {
		unsplashUnlikePhoto(id, token).then((json) =>
		  unlikePhoto(json.photo)
		);
	  } else {
		unsplashLikePhoto(id, token).then((json) =>
		  likePhoto(json.photo)
		);
	  }
	}

	return (
		<Fragment>
		  <a
		  className="gallery__a gallery-full__a"
		  target="_blank"
		  href={`https://unsplash.com/@${user.username}`}
		>
		  {user.name}
		</a>
		<img className="gallery-full__img" src={urls.small} alt=''/>
		<span className="gallery-full__span-date">{currentDate(created_at)}</span>
		<button
			className="gallery-full__like-button"
            style={liked_by_user ? bgImages.liked : bgImages.unliked}
			onClick={() => toggleLike()}
        ></button>
		<span className="gallery-full__span-likes">{likes} Нравится</span>
	  </Fragment>
	);

};


const mapStateToProps = (store) => {
	return {
	  imagesPage: store.imagesPage,
	  imageFull: store.imageFull,
	}
  }
  
  const mapDispatchToProps = (dispatch) => {
	return {
	  likePhoto: (id) => dispatch(likePhoto(id)),
	  unlikePhoto: (id) => dispatch(unlikePhoto(id)),
	}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ImagesFullSize);
