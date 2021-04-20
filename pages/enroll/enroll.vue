<template>
    <view>
      
                <view class="action">
					<image :src="imgList.portraitUri" ></image>
                    {{imgList.portraitUri}}/4
                </view>
       
    </view>
</template>
<script>
    export default { 
        data() {
            return {
                imgList: [{portraitUri}],
            };
        },
       
    }
</script>