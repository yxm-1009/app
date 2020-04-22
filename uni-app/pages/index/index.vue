<template>
	<view class="box">
		<view class="child">{{myname}}</view> 
		<button type="primary" @click="handleChangeName">click</button>
		<input type="text" v-model="mytext" />
		<button @tap="handleAdd">add</button>
		<view v-for="(data, index) in list" :key="data">
			<text> {{data}}</text> --- <button size="mini"
			 @tap="handleDel(index)">del</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				myname: 'yinxiaomi',
				mytext: '',
				list: []
			}
		},
		methods:{
			handleChangeName(){
				console.log('hh')
				this.myname = '小可爱'
			},
			handleAdd(){
				// this.list = [...this.list, this.mytext]
				this.list.push(this.mytext)
				this.mytext = ''
			},
			handleDel(index){
				this.list.splice(index, 1)
			},
		}
	}
</script>
<!-- 
scoped: 当前只对当前页面有效
lang: 编程方式
   -->
<style scoped lang="scss">
.box{
	.child{
		background-color: #4CD964;
	}
}
</style>
