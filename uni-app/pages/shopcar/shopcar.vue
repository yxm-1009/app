<template>
	<view>
		<view v-if="cartlist.length > 0">
			<checkbox-group @change="handleChangeChecked">
				<label>
					<checkbox value="随意的值" :checked="isAllchecked()" /><text>全选</text>
				</label>
			</checkbox-group>
			<view v-for="item in cartlist" :key="item.id" class="item" @longpress="handleShowModal(item.id)">
				<label>
					<checkbox @click="handleChecked(item.id)" :checked="item.checked"/>
				</label>
				<image :src="'http://localhost:3000'+item.good.poster" mode="widthFix"></image>
				<view class="">
					<view class="goodname">
						{{item.good.name}}
					</view>
					<view>
						{{item.good.price}}
					</view>
				</view>
				<view class="calculate">
					<text @click="handleMinus(item.id)">-</text>
					<input type="text" :value="item.number" disabled />
					<text @click="handleAdd(item.id)">+</text>
				</view>
			</view>
			<view class="">
				总金额： {{computedSum}}
			</view>
		</view>
		<view v-else>
			购物网空空如也
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartlist: []
			}
		},
		computed: {
			// 计算总金额
			computedSum(){
				let mysum = 0
				this.cartlist.forEach(item=>{
					if(item.checked){
						mysum += item.good.price * item.number
					}
				})
				return mysum
			}
		},
		methods: {
			handleChangeChecked(evt){
				console.log(evt.detail.value.length)
				if(evt.detail.value.length > 0){
					console.log('勾上了')
					this.cartlist.forEach(item=>{
						item.checked = true
					})
				}else{
					console.log('没勾')
					this.cartlist.forEach(item=>{
						item.checked = false
					})
				}
			},
			isAllchecked(){
				// every 全是true 返回true 
				if(this.cartlist.length === 0){
					return false
				}
				return this.cartlist.every(item=>item.checked)
			},
			handleShowModal(goodId){
				uni.showModal({
				  title: '提示',
				  content: '是否删除商品',
				  success: (res)=> {
				    if (res.confirm) {
				      console.log('用户点击确定')
					  // this.cartlist.splice(goodId, 1) 不可用
					  this.cartlist = this.cartlist.filter(item=>item.id !== goodId)
					  this.delete(goodId)
				    } else if (res.cancel) {
				      console.log('用户点击取消')
				    }
				  }
				})
			},
			delete(handID){
				uni.request({
					url: `http://localhost:3000/carts/${handID}`,
					method: 'DELETE',
					success: (res) => {
						uni.showToast({
						  title: '删除成功',
						  icon: 'success',
						  duration: 2000
						})
					}
				})
			},
			handleChecked(goodId){
				this.cartlist.forEach(item=>{
					if(item.id == goodId){
						item.checked = !item.checked
						this.updata(item)
					}
				})
			},
			handleMinus(goodId){
				this.cartlist.forEach(item=>{
					if(item.id == goodId){
						item.number = item.number-1 <= 1 ? 1 : (item.number-1)
						this.updata(item)
					}
				})
			},
			handleAdd(goodId){
				this.cartlist.forEach(item=>{
					if(item.id == goodId){
						item.number = item.number+1
						this.updata(item)
					}
				})
			},
			updata(obj){
				let {goodId, number, checked, username} = obj
				uni.request({
					url: `http://localhost:3000/carts/${obj.id}`,
					method: 'PUT',
					data: {
						goodId,
						number,
						checked,
						username
					},
					success: () => {
						
					}
				})
			}
		},
		onShow() {
			let user = uni.getStorageSync('users').nickName
			uni.request({
				url: `http://localhost:3000/carts?_expand=good&username=${user}`,
				success: (res) => {
					this.cartlist = res.data
					console.log(this.cartlist)
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
.item{
	padding: 20rpx 10rpx;
	display: flex;
	align-items: center;
	.goodname{
		width: 200rpx;
	}
	image{
		width: 200rpx;
	}
	.calculate{
		display: flex;
		text-align: center;
		align-items: center;
		text{
			border-radius: 50%;
			width: 40rpx;
			background-color: #4CD964;
		}
		input{
			width: 40rpx;
		}
	}
}
</style>
