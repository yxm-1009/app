<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(data, index) in looplist" :key="index">
				<view class="swiper-item">
					<image :src="'http://localhost:3000'+data.url" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="list" v-for="data in datalist" :key="data.id" @tap="handleItem(data.id)">
			<view class="leftBox">
				<image :src="'http://localhost:3000'+data.poster" mode="widthFix"></image>
			</view>
			<view class="rightBox">
				<text>{{data.name}}</text>
				<view>
					价格：{{data.price}}
				</view>
				<text>好评率：{{data.goodcomment}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				looplist: [],
				datalist: [],
				current: 1,
				total: 0
			};
		},
		methods:{
			handleItem(dataID){
				uni.navigateTo({
					url: `/pages/detail/detail?id=${dataID}`
				})
			}
		},
		// vue 的生命周期
		mounted(){
			// ajax
			/**
			 * uni 在微信中 === wx
			 * baidu === swan
			 * zhifubao === my
			 * 头条 === tt
			*/ 
		   // console.log('mounted')
			uni.request({
				url: "http://localhost:3000/recommends",
				success: (res) => {
					console.log(res.data)
					this.looplist = res.data
				}
			})
			uni.request({
				url: "http://localhost:3000/goods?_page=1&_limit=5", //_page: 页数 _limit: 条数
				success: (res) => {
					console.log(res.header)
					// 网页版 x-total-count
					this.datalist = res.data;
					// 如果在 h5 x-total-count，微信 X-Total-Count
					// this.total = res.header["X-Total-Count"] || res.header["x-total-count"]
					this.total = res.header["x-total-count"]
					//不同平台的解决方案 条件编译来做
					// #ifdef H5
						this.total = res.header["x-total-count"]
					// #endif
					
					// 除了 h5 平台 其他皆可
					// #ifndef H5
						this.total = res.header["X-Total-Count"]
					// #endif
				}
			})
		},
		// 小程序的生命周期
		// 监听页面加载
		onLoad(){
			
		},
		// 监听页面初次渲染完成
		onReady(){
			
		},
		// 触底事件的处理函数
		onReachBottom(){
			console.log(this.total, this.datalist.length) 
			// 网页版发现 this.total 的值是 undefined 
			if(Number(this.total) == this.datalist.length){
				return;
			}
			console.log('到底了')
			this.current++;
			uni.request({
				url: `http://localhost:3000/goods?_page=${this.current}&_limit=5`, //_page: 页数 _limit: 条数
				success: (res) => {
					console.log(res.data)
					this.datalist = [...this.datalist, ...res.data]
				}
			})
		},
		// 下拉事件
		onPullDownRefresh() {
			console.log("下拉事件")
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			})
		}
	}
</script>

<style scoped lang="scss">
swiper{
	height: 300rpx;
	image{
		width: 100%;
	}
}
.list{
	display: flex;
	padding: 10rpx 0;
	margin:  0 0 0 20rpx;
	border-bottom: 1px solid #cccccc;
	image{
		width: 200rpx;
		height: 200rpx;
	}
}
</style>
