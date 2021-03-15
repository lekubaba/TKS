<template>
	<div id="app">
		<keep-alive>
		     <router-view v-if='$route.meta.keepAlive'/>
		</keep-alive>
		<router-view v-if='!$route.meta.keepAlive'/>
	</div>
</template>
<script>
	export default {
		name: 'App',
		data () {
			return {
			}
		},
		watch: {

		},
		created () {
			
		}

	}	
</script>

<style lang="less" scoped>
</style>
