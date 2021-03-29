import React, { Component } from 'react';
import { connect } from "react-redux";

import PhotoComp from '../components/image';

import '../css/style.css';

import { getPhotos, getUserName } from "../actions/indexAction";

import {
    userAccessToken,
    unsplashGetUser,
    unsplashLoadPhotos,
} from "../api/unsplash";

let itemsWereLoaded = false;

class ImagesList extends Component {

	constructor(props) {
	  super(props);
	  console.log(props);

      this.loadPhotos = this.loadPhotos.bind(this);
      this.getUserName = this.getUserName.bind(this);

	  if (!localStorage.getItem("token")) {
        userAccessToken(window.location.search.split("code=")[1]);
      }
	}


    componentDidMount() {
	  if (!itemsWereLoaded) {
		this.loadPhotos();
		itemsWereLoaded = true;
	  }
	
	    this.getUserName();
	}


    loadPhotos() {
      let page = localStorage.getItem("page");
	  let perPage = localStorage.getItem("perPage");

      unsplashLoadPhotos(page, localStorage.getItem("token"))
        .then((photos) => {
          this.props.getPhotos(photos);
        })
        .then(() => {
          localStorage.setItem("page", +page + 1);
		  localStorage.setItem("perPage", +perPage + 10);
        });
    }

    getUserName() {
      unsplashGetUser(localStorage.getItem("token")).then((user) => {
	  //unsplashGetUser().then((user) => {
        this.props.getUserName(user);
      });
    }


	render() {
	  const {imagesPage} = this.props;
	  const {photos} = imagesPage;

	  if (photos === null) {
		return (
		  <div>Loading...</div>
		);
	  } else {
		  return (
			<div>
			  <div className="gallery">

			    <ul className="gallery__ul">
				  {photos.map(photos => (
				    <li key={photos.id} className="gallery__li">
					  <PhotoComp key={photos.id} photos={photos} />
				    </li>
				  ))}
			    </ul>
			  </div>

			  <button className="gallery__btn-show-more"
				onClick={(e) => {
				  this.loadPhotos();
				}}
			  >
				Показать ещё...
			  </button>

			</div>
		  );
	  }
	}
}

const mapStateToProps = (store) => {
  return {
	imagesPage: store.imagesPage,
    imageUser: store.imageUser,
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
	getPhotos: (photos) => dispatch(getPhotos(photos)),
	getUserName: (user) => dispatch(getUserName(user)),
  }
}

ImagesList = connect(
	mapStateToProps,
	mapDispatchToProps
)(ImagesList);

export default ImagesList;
