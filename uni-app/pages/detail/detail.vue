<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(data, index) in dataInfo.slides" :key='index'>
				<view class="swiper-item">
					<image :src="'http://localhost:3000'+data" mode="widthFix"
					@tap="handlePrev(data)"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="">
			{{dataInfo.name}}
		</view>
		<view class="">
			{{dataInfo.price}}
		</view>
		<button @click="handleAdd">加入购物车</button>
		<button @click="handleGoto">跳转购物车</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				dataInfo: null
			};
		},
		methods:{
			handlePrev(img){
				uni.previewImage({
				  current: 'http://localhost:3000'+img, // 当前显示图片的http链接
				  urls: this.dataInfo.slides.map(item=>'http://localhost:3000'+item) // 需要预览的图片http链接列表
				})
			},
			handleAdd(){
				// 如果登陆不成功 跳转至我的页面
				if(uni.getStorageSync('isLogin')){
					// post 添加数据
					uni.request({
						url: `http://localhost:3000/carts?goodId=${this.dataInfo.id}`,
						success: (res) => {
							console.log(res.data)
							res.data.length==0 ? this.Add() : this.updata(res.data[0])
						}
					})
					uni.showToast({
					  title: '加入购物车成功',
					  icon: 'success',
					  duration: 2000
					})
				}else{
					uni.switchTab({
						url: '/pages/my/my'
					})
				}
			},
			Add(){
				uni.request({
					url: `http://localhost:3000/carts`,
					method: 'POST',
					data: {
						goodId: this.dataInfo.id,
						number: 1,
						checked: false,
						username: uni.getStorageSync('users').nickName
						
					},
					success: (res) => {
						console.log(res.data)
					}
				})
			},
			updata(obj){
				uni.request({
					url: `http://localhost:3000/carts/${obj.id}`,
					method: 'PUT',
					data: {
						goodId: obj.id,
						number: obj.number + 1,
						checked: obj.checked,
						username: obj.username
						
					},
					success: (res) => {
						console.log(res.data)
					}
				})
			},
			handleGoto(){
				uni.switchTab({
					url: '../shopcar/shopcar'
				})
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.id = options.id
		},
		onReady() {
			console.log(this.id)
			uni.request({
				url: `http://localhost:3000/goods/${this.id}`,
				success: (res) => {
					console.log(res.data)
					this.dataInfo = res.data
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	swiper{
		height: 750rpx;
		image{
			width: 100%;
		}
	}
</style>
