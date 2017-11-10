//App Component
import React from 'react';
import { Form, FormGroup, FormControl, InputGroup, Button, Glyphicon} from 'react-bootstrap';
import classNames from 'classnames';

import { Layout } from '../Components/Layout.js';
import { Profile } from '../Components/Profile.js';
import  { APIRequests as Spotify } from '../APICalls.js';

import '../../css/App.css';



//to handle key such as Enter input, use 2 if statements (event.key, event.keyCode)

export class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchQuery: '',
			artist: null,
			tracks: [],
			invalidArtist: false
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onClickSearch = this.onClickSearch.bind(this);
	}

	onChangeInput(e){
		this.setState({
			searchQuery: e.target.value
		});
	}

	onKeyPress(e){
		if (e.key === 'Enter'){
			e.preventDefault();
			this.onClickSearch();
		} else if (e.keyCode === 13){
			e.preventDefault();
			this.onClickSearch();
		}
	}

	onClickSearch(){
		Spotify.getArtist(this.state.searchQuery)
			.then(artistInfo => {
				if (artistInfo.artists.items.length > 0){
					this.setState({
						artist: artistInfo.artists,
						invalidArtist: false
					});
				} else{
					 throw new Error('Cannot find artist');
				}
				return this.state.artist;
				console.log(this.state.artist);
			})
			.then(artist => {
				Spotify.getTopTracks(artist.items[0].id)
					.then(tracks => {
						this.setState({
							tracks: tracks.tracks
						});
						// console.log('tracks:', this.state.tracks);
					});
			})
			.catch(error => {
				console.error(error);
				this.setState({
					artist: null,
					invalidArtist: true
				});
			});
		
	}

	render(){
		let searchBarClasses = classNames({
			"search-bar": true,
			"search-error": this.state.invalidArtist
		});

		return(
			<Layout>
				<div className="artist-section-wrapper">
					<Form className="search-bar">
						<FormGroup>
							<InputGroup>
								<FormControl 
									type="text"
									className = {searchBarClasses}
									placeholder="Search for an artist"
									onChange = {e => this.onChangeInput(e)}
									onKeyPress={e => this.onKeyPress(e)}
								/>
								<InputGroup.Addon className="search-button" onClick={this.onClickSearch}>
									<Glyphicon glyph="search"></Glyphicon>
								</InputGroup.Addon>
							</InputGroup>
						</FormGroup>
					</Form>
					{(this.state.artist) ? <Profile artist={this.state.artist} tracks={this.state.tracks}/> : ''}
					{(this.state.invalidArtist) ? <h4 className="error-msg"><Glyphicon glyph="exclamation-sign"></Glyphicon> Cannot Find Artist</h4> : ''}
				</div>
			</Layout>
		);
	}
}