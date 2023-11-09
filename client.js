const axios = require('axios');


const HOST = 'http://localhost',
	PORT = 3000;


const request = axios.create({
	baseURL: `${HOST}:${PORT}`,
	headers: {
		'Content-Type': 'application/json',
		'Accept-Encoding': 'gzip, deflate',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	},
	responseType: 'stream',
});

request.get('/').then(res => {

	res.data.on('data', (chunk) => {
		console.log(`Received: ${chunk.toString()}`);
	});

	res.data.on('end', () => { console.log('Stream ended'); });

	res.data.on('error', (err) => { console.error('Stream error:', err); });

});
