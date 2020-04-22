<template>
	<view>
		<view v-if="!users">
			<!-- 条件编译 -->
			<!-- if h5 平台，走登录注册页面 -->
			<!-- open-type="getUserInfo" 
			@getuserinfo="handleUserinfo" 获取授权的操作 -->
			<!-- #ifdef H5 -->
				<!-- h5 授权流程 -->
				<input type="text" placeholder="请输入用户名" v-model="username"/>
				<input type="password" placeholder="请输入密码" v-model="password"/>
				<button type="default" @click="handleLogin">登录</button>
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
				<button type="primary" open-type="getUserInfo" @getuserinfo="handleUserinfo">授权</button>
			<!-- #endif -->
			
		</view>
		<view class="users" v-else>
			<image :src="users.avatarUrl" mode="widthFix" @click="handleClick"></image>
			<view class="">
				{{users.nickName}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// null  是 假的
				users: null,
				username: '',
				password: ''
			};
		},
		methods:{
			// h5 信息确认
			// #ifdef H5
			handleLogin(evt){
				console.log(this.username, this.password)
				uni.request({
					url: "http://localhost:3000/users",
					success: (res) => {
						// console.log(res.data)
						this.users = res.data[0]
						console.log(this.users)
						uni.setStorageSync("isLogin", true)
						uni.setStorageSync("users", this.users)
					}
				})
			},
			// #endif
			// 改变头像
			handleClick(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						console.log(res.tempFilePaths[0])
						this.users = {
							...this.users,avatarUrl: res.tempFilePaths[0]
						}
						uni.setStorageSync('users', this.users)
					}
				})
			},
			// 小程序授权信息，并且存入数据库
			handleUserinfo(evt){
				console.log(evt.detail.rawData)
				this.users = JSON.parse(evt.detail.rawData)
				console.log(this.users)
				uni.setStorageSync("isLogin", true)
				uni.setStorageSync("users", this.users)
			}
		},
		mounted() {
			this.users = uni.getStorageSync('users')
		}
	}
</script>

<style lang="scss" scoped>
.users{
	image{
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		display: block;
		margin: 20rpx auto;
	}
}
</style>
