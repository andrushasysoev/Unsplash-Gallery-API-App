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

	  this.getPhoto = this.getPhoto.bind(this);

	  const id = window.location.pathname.split("photos/")[1];
	  this.getPhoto(id);
	  
	  console.log(id);
	}


	getPhoto(id) {
	  const {imagesPage} = this.props;
	  const {photos} = imagesPage;
	  console.log(photos);

	  if (photos > 0) {
		photos.forEach((photo) => {
		  if (photo.id === id) {
			this.props.getPhoto(photo);
		  }
		});
	  } else {
		  unsplashGetPhoto(id, localStorage.getItem("token"))
		  .then((photo) => {
		    this.props.getPhoto(photo);
		  });
	   }
	}

	
	render() {
		const {imageFull} = this.props;
		const photo = imageFull;
		console.log(photo);

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

const mapStateToProps = (store) => {
	return {
	  imagesPage: store.imagesPage,
	  imageFull: store.imageFull,
	}
  }
  
const mapDispatchToProps = (dispatch) => {
  return {
    getPhoto: (photo) => dispatch(getPhoto(photo)),
  }
}

ImageGet = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageGet);

export default ImageGet;
