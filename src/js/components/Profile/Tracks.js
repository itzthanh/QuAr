//Tracks Component

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import '../../../css/App.css';

export class Tracks extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			trackUrl: '',
			audio: null,
			trackPlaying: false
		}
	}

	
	groupTracksIntoRows(tracksArray){
		let middleIndex = Math.floor(tracksArray.length/2);
		let tracksGrouped = [];
		tracksGrouped.push(tracksArray.slice(0,middleIndex), tracksArray.slice(middleIndex));
		return tracksGrouped;
	}

	playTrack(trackUrl){	
		let track = new Audio(trackUrl);
		//Play new track
		if (!this.state.trackPlaying && this.state.audio === null){
			track.play();
			this.setState({
				trackPlaying: true,
				audio: track,
				trackUrl
			});
		//Play paused track
		} else if (!this.state.trackPlaying && this.state.trackUrl === trackUrl){
			this.state.audio.play();
			this.setState({
				trackPlaying: true,
			});
		} else{
			//Pause track
			if (this.state.trackUrl === trackUrl){
				this.state.audio.pause();
				this.setState({
					trackPlaying: false
				});
			//Pause track and play new chosen track
			} else {
				this.state.audio.pause();
				track.play();
				this.setState({
					trackPlaying: true,
					audio: track,
					trackUrl
				});
			}
		}
	}

	render(){
		return(
			<Col md={9} className="tracks-wrapper">
				<Row>
					<h3 className="text-center" style={{margin: '0px 0px', paddingBottom: '5px'}}>Top 10 Tracks</h3>
				</Row>
				<Row className="tracks-row">	
					{this.groupTracksIntoRows(this.props.tracks)[0].map((track, index) => {
						return(
							<Col sm={2} md={2}className="track-img-wrapper" key={index} onClick={() => {this.playTrack(track.preview_url)}}>
								<img className="track-img img-responsive" src={track.album.images[0].url}/>
								<div className="track-name">
									{track.name}
								</div>
								<div className="play-track-wrapper">
									<div className="play-track">
										{
											this.state.trackUrl === track.preview_url && this.state.trackPlaying ? <span className="pause">&#10074;&#10074;</span> : <span>&#9654;</span>
										}
									</div>
								</div>
							</Col>
						);
					})}	
				</Row>
				<Row className="tracks-row">
					{this.groupTracksIntoRows(this.props.tracks)[1].map((track, index) => {
						return(
							<Col sm={2} md={2} className="track-img-wrapper" key={index} onClick={() => {this.playTrack(track.preview_url)}}>
								<img className="track-img img-responsive" src={track.album.images[0].url}/>
								<div className="track-name">
									{track.name}
								</div>
								<div className="play-track-wrapper">
									<div className="play-track">
										{
											this.state.trackUrl === track.preview_url && this.state.trackPlaying ? <span className="pause">&#10074;&#10074;</span> : <span>&#9654;</span>
										}
									</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</Col>
		);
	}
	
};
