//Stateless Footer Component
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export const Footer = (props) => {
	return (
		<footer className="footer fixed-bottom">
			<Row className="social-media">
	  			<Col xs={4} sm={2} smOffset={3} lg={1} lgOffset={4} className="social-media-icon">
	  				<a href="mailto:thanhhd@uci.edu" target="_blank"><img className="icon" src="../img/icons/email.png"/></a>
	  			</Col>
	  			<Col xs={4} sm={2} lg={1} className="social-media-icon">
	  				<a href="https://www.facebook.com/ThanhDough24" target="_blank"><img className="icon" src="../img/icons/facebook.svg"/></a>
	  			</Col>
	  			<Col xs={4} sm={2} lg={1} className="social-media-icon">
	  				<a href="https://www.instagram.com/thanhd24/" target="_blank"><img className="icon" src="../img/icons/instagram.svg"/></a>
	  			</Col>
	  		</Row>
			<Row className= "contact-info">
		  		<Col lg={2} lgOffset={4} md={3} mdOffset={3} sm={4} smOffset={2}>
		  			<p className="text-center" style={{letterSpacing: '4px'}}>thanhhd@uci.edu</p>	  		
		  		</Col>
		  		<Col lg={2} md={3} sm={4}>
		  			<p className="text-center" style={{letterSpacing: '4px'}}>(408) 644-8937</p>
		  		</Col>
		  	</Row>
		  	<p className="text-center" style={{letterSpacing: '4px', marginTop: '8px'}}>&#8640;THANH DO&#8636;</p>
		</footer>
	);
};