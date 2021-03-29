import { combineReducers } from 'redux';

import { photosReducer } from './imagesPage';
import { photoFullReducer } from './imageFull';
import { photoUserName } from './imageUser';


export const rootReducer = combineReducers({
	imagesPage: photosReducer,
	imageFull: photoFullReducer,
	imageUser: photoUserName,
});