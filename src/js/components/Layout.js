//Stateless Layout Component

import React from 'react';
import { Header } from '../Components/Header.js';
import { Footer } from '../Components/Footer.js';

export const Layout = (props) => {
	return(
		<div className="app container-fluid">
			<Header/>
			{props.children}
			<Footer/>
		</div>
	)
};