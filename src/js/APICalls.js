//apiCalls.js
//implementation for services relating to obtaining data via Spotify API calls.

export const APIRequests = function(){
	const BASE_URL = 'https://api.spotify.com/v1/';
	const AUTH = 'BQACBJ1Qr1aamhRp4wKwOY7Kukkh4VQ-FFTyvzpIDjkudhPu6hKihVhCuwcWB7emEfKerffm3E7cxN6lWvGtCQQnFgeHxHb3xqjJtrD9JGDW2vmaMD5ioBtP7wb5Uk9lHLP5SURlTq-jW_jPT100NB39b0QQh5Mq';
	const headers = new Headers({
		'Authorization': `Bearer ${AUTH}`
	});
	const init = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	};
	let FETCH_URL = '';

	//Could combine getArtist and getTracks into one function using a second argument to denote what to get.
	const getArtist = (artist) => {
		FETCH_URL = `${BASE_URL}search?q=${artist}&type=artist&limit=1`;
		return fetch(FETCH_URL, init)
			.then(response => {
				if (response.ok){
					return response.json();
				}
			})
			.then(jsonResponse =>{
				return jsonResponse;
			})
			.catch(error => {
				console.error('Network Error', error);
			})
	};

	const getTopTracks = (artistId) => {
		FETCH_URL = `${BASE_URL}artists/${artistId}/top-tracks?country=US`;
		return fetch(FETCH_URL, init)
			.then(response => {
				if (response.ok){
					return response.json();
				}
			})
			.then(jsonResponse =>{
				return jsonResponse;
			})
			.catch(error => {
				console.error('Network Error', error);
			})
	};

	const test = () => {
		console.log("worked");
	};

	return{
		getArtist: getArtist,
		getTopTracks : getTopTracks,
		test: test
	};
}();


