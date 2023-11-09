const http = require('http');
const zlib = require('zlib');


const HOST = 'http://localhost',
	PORT = 3000,
	ZIP = true,
	DATA = [
		{ key: 'a' },
		{ key: 'b' },
		{ key: 'c' }
	];


const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 'no-cache')
	res.setHeader('Connection', 'keep-alive')
	res.setHeader('Transfer-Encoding', 'chunked')
	if (ZIP) res.setHeader('Content-Encoding', 'gzip')
	res.flushHeaders()

	DATA.forEach(obj => {
		const str = JSON.stringify(obj) + '\n',
			payload = ZIP ? zlib.gzipSync(str) : str;

		res.write(payload);
	});

	res.end();
});


server.listen(PORT, () => {
	console.log(`Server is running on ${HOST}:${PORT}`);
});
