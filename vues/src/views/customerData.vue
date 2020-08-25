<template>
	<div class="data">
		<div class='total'>
			<div class='total-all'>
				<span class='gray'>今日到访</span>
				<span>12</span>
			</div>
			<div class='total-all'>
				<span class='gray'>到访总数</span>
				<span>512</span>
			</div>
		</div>
		<div class='profile'>
			<div class='profile-item'>
				<img class='profile-item-avatar' src="http://qiniu.tongkeapp.com/appletouchicon.png">
				<div class='profile-item-content'>
					<div class='profile-item-text'>
						<div class='profile-item-info'>
							<span class='user-name'>杨腾</span>
							<span class='user-tel'>182****9987</span>
						</div>
						<div class='profile-item-time'>8月23 12:22</div>
					</div>
					<div class='profile-item-button'>暂时没意向</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
	.data{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
	}
	.total{
		width:100%;
		height: 70px;
		box-shadow: 0 0 8px 0 rgba(0,0,0,0.10), 0 0 10px 0 rgba(0,0,0,0.1), 0px 1px 1px 2px rgba(222,222,222,0.10);
		// background-color: #1476fe;
		display: flex;
		flex-direction: row;
		margin-bottom: 20px;
		
	}
	.total-all{
		width:50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #1476fe;
		font-weight:700;
	}
	.gray{
		color: #808080;
	}
	.profile-item{
		width:100vw;
		height: 60px;
		display: flex;
		padding:5px 20px 0 20px;
	}
	.profile-item-avatar{
		width:42px;
		height:42px;
		border-radius: 21px;
		
	}
	.profile-item-content{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width:calc(100vw - 82px);
		padding:0px 5px 5px 6px;
		border-bottom: 1px dashed #ccc;
	
	}
	.profile-item-text{
		width:calc(100vw - 216px);
	}
	.profile-item-button{
		width:120px;
		height: 30px;
		background-color: #1476fe;
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 14px;
		margin-top: 5px;
	}
	.user-name,.user-tel{
		font-size: 14px;
		color: #333333;
		font-weight: 700;
		margin-right: 10px;
	}
	.profile-item-time{
		font-size: 12px;
		color: #999;
	}
	
</style>
