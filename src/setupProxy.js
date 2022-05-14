const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:5000',
			changeOrigin: true,
		})
	),
	app.use(
		'/cosmonaut',
		createProxyMiddleware({
			target: 'http://0.0.0.0:1317',
			changeOrigin: true,
		})
	),
	app.use(
		'/cosmos',
		createProxyMiddleware({
			target: 'http://0.0.0.0:1317',
			changeOrigin: true,
		})
	)
	// app.use(
	// 	createProxyMiddleware('/socket.io', {
	// 		target: 'http://localhost:5000',
	// 		changeOrigin: true,
	// 		ws: true,
	// 	})
	// )
}
