<i18n>
{
    "cn":{
        "这是子组件":"这是子组件"
    },
    "en":{
        "这是子组件":"Child component"
    }
}
</i18n>
<template>
    <div class="wrapper">
        <p class="child">{{$t('这是子组件')}}</p>
        <img src="./barcode.png" alt="" srcset="">
    </div>
</template>

<script>
export default {
    name:'child'
};
</script>

<style lang="scss" scoped>
.child{
    padding-top: 20px;
    font-size: 24px;
}
</style>
