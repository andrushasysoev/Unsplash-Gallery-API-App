import React, { Component } from 'react';
import { connect } from "react-redux";
import { Loader } from '../utils/loader';

import PhotoComp from '../components/image';

import '../css/style.css';

import { getPhotos, getUserInfo } from "../actions/indexAction";

import {
	unsplashLoadPhotos,
    unsplashGetUser,
} from "../api/unsplash";

let itemsWereLoaded = false;

class ImagesList extends Component {

	constructor(props) {
	  super(props);
	  console.log(props);

	  this.loadPhotos = this.loadPhotos.bind(this);
	  this.getUserName = this.getUserName.bind(this);
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

	  unsplashLoadPhotos(page, perPage)
        .then((photos) => {
          this.props.getPhotos(photos);
        })
        .then(() => {
          localStorage.setItem("page", +page + 1);
		  localStorage.setItem("perPage", +perPage + 10);
        });
    }

    getUserName() {
	  unsplashGetUser().then((user) => {
		this.props.getUserInfo(user);
      });
    }

	render() {
	  const {imagesPage} = this.props;
	  const {photos} = imagesPage;

	  if (photos.length === 0) {
		return (
		  <div><Loader /></div>
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
				  e.preventDefault();
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

function mapStateToProps(store) {
  return {
	imagesPage: store.imagesPage,
    imageUser: store.imageUser,
  }
}
  
function mapDispatchToProps(dispatch) {
  return {
	getPhotos: (photos) => {
	  return dispatch(getPhotos(photos));
	},
	getUserInfo: (user) => {
	  return dispatch(getUserInfo(user));
	}
  }
}

ImagesList = connect(mapStateToProps, mapDispatchToProps)(ImagesList);

export default ImagesList;