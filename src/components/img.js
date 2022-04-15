import React, { Component } from 'react';
import { Link } from "react-router-dom";

import close from "../assets/left-arrow.png";

import ImagesFullSize from '../components/image-full';

import { connect } from "react-redux";
import { getPhoto } from "../actions/indexAction";
import { unsplashGetPhoto } from "../api/unsplash";

import '../css/style.css';

class ImageGet extends Component {

	constructor(props) {
	  super(props);
	  console.log(props);

	  const id = window.location.pathname.split("photos/")[1];
	  this.props.getImageFromStore(id);
	}
  
	
	render() {
	  const {imageFull} = this.props;
	  const photo = imageFull;

	  const bgImages = {
		backgroundImage: "url(" + close + ")",
	  }

	  if (photo === null) {
		return (<div>Loading...</div>);
	  } else {
		  return (
			<div className="gallery-full">

			  <Link to="/photos" className="gallery-full__link">
			    <button className="gallery-full__close-button" style={bgImages}>
				</button>
			    <span className="gallery-full__close-text">Вернуться назад</span>
			  </Link>

			  <div className="gallery-full__wrap-photo">
			    <ImagesFullSize key={photo.id} photo={photo} />
			  </div>
			</div>
		  );
	    }
    }
};

function mapStateToProps(store) {
  return {
	imagesPage: store.imagesPage,
	imageFull: store.imageFull,

	getImageFromStore(id) {
	  if (store.imagesPage.photos.length > 0) {
		store.imagesPage.photos.forEach((photo) => {
		  if (photo.id === id) {
			this.getPhoto(photo);
		  }
		});
	  } else {
		  unsplashGetPhoto(id).then((photo) => {
		    this.getPhoto(photo);
		  });
	   }
    }

  }
}
  
function mapDispatchToProps(dispatch) {
  return {
    getPhoto: (photo) => {
	  return dispatch(getPhoto(photo));
	}
  }
}

ImageGet = connect(mapStateToProps, mapDispatchToProps)(ImageGet);

export default ImageGet;