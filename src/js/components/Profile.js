//Profile (Stateless)Component
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { APIRequests as Spotify } from '../APICalls.js';
import { Tracks } from './Profile/Tracks.js';
//import { ArtistPhoto } from '../Components/Profile/ArtistPhoto.js'; 

export const Profile = props => {
	let artist = {
		name: '',
		image: {},
		genres: '',
		followers: '',
		tracks: []
	};

	const setArtistInfo = () => {
		if (props.artist !== null){
			artist.name = props.artist.items[0].name;
			artist.image = props.artist.items[0].images[0];
			artist.genres = props.artist.items[0].genres.join(', ');
			artist.followers = props.artist.items[0].followers.total;
			artist.tracks = props.tracks;
		}
	};

	const formatGenres = (genres) => {
		let genreArray = genres.split(',').map((genre, index) => {
			if (genre.search(/R&B/i) !== -1){
				let index = genre.search(/R&B/i);
				genre = genre.substring(0, index) + genre.substr(index, 3).toUpperCase();
			}
			if (genre.search(/-/) !== -1){
				let index = genre.search(/-/);
				genre = genre.substring(0,index+1) + genre.charAt(index+1).toUpperCase() + genre.substring(index+2);
			}
			return genre.replace(/\w\S*/g, (matched) => {
				return matched.charAt(0).toUpperCase() + matched.substr(1);
			});
		});
		return genreArray;
	};

	const formatFollowers = (numFollowers) => {
		let numFollowersArray = numFollowers.split('');
		for (let end = numFollowers.length-3; end > 0; end-=3){
			numFollowersArray.splice(end, 0, ',');
		}
		numFollowersArray = numFollowersArray.join('');
		return numFollowersArray;
	}

	// const groupTracksIntoRows = (tracksArray) => {
	// 	let middleIndex = Math.floor(tracksArray.length/2);
	// 	let tracksGrouped = [];
	// 	tracksGrouped.push(tracksArray.slice(0,middleIndex), tracksArray.slice(middleIndex));
	// 	return tracksGrouped;
	// };

	// const generateTrackCols = (track, index) => {		
	// 	return (
	// 		<Col md={2} key={index}>{track.name}
	// 		</Col>
	// 	);
	// };

	// const generateTrackCols = (track, index) => {		
	// 	return (<Track track={track} index={index} />);
	// };

	setArtistInfo();

	return(
		<div className="artist-section">
			<div className="artist-header">
				<h1 className="artist-name">{artist.name}</h1>
				<h4 className="artist-genres"> {artist.genres.length > 0 
					? `(${formatGenres(artist.genres)})` 
					: ''}
				</h4>
				
			</div>
			<Grid fluid={true}>
				<Row>
					<Col md={3} className="artist-img-wrapper">
						<h4 className="artist-followers">{formatFollowers(artist.followers.toString())} Followers</h4>
						<img alt="Profile Image" className="artist-img img-responsive" src={artist.image.url}/>
					</Col>
					<Tracks tracks = {artist.tracks}/>
				</Row>
			</Grid>
		</div>
	);
}