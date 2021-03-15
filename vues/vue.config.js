module.exports = {
	publicPath:'./',
	outputDir:'dist',
	assetsDir:'./assets',
	filenameHashing:false,
	productionSourceMap:false,
	lintOnSave: true,
	css: {
		requireModuleExtension: false
	},
	devServer: {
		disableHostCheck: true,
	    proxy: {
			'/api':{
				target:'http://127.0.0.1:8099',
				ws: true,
				changeOrigin: true
			}
		}
	},
	
}