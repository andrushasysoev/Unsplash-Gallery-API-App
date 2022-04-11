import { combineReducers } from 'redux';

import { photosReducer } from './imagesPage';
import { photoUserName } from './imageUser';
import { photoFullReducer } from './imageFull';


export const rootReducer = combineReducers({
	imagesPage: photosReducer,
	imageUser: photoUserName,
	imageFull: photoFullReducer,
});