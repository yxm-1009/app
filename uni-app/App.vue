<script>
	export default {
		// 小程序的生命周期之一，小程序的初始化操作
		// 展示本地存储能力
		onLaunch: function() {
			console.log('App Launch')
		},
		// 场景值：手机用户是以何种方法进入小程序，进行数据分析，广告统计
		// 根据不同的场景值，进入不同的业务模式：在餐馆扫码进入现场下单，在家里下单外卖下单
		onShow: function() {
			console.log('App Show')
		},
		// 小程序隐藏，游戏暂停，音乐停止
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
