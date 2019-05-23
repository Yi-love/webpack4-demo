<i18n>
{
    "cn":{
        "去PageB页面":"去PageB页面",
        "多刷几次看看多语言":"多刷几次看看多语言"
    },
    "en":{
        "去PageB页面":"go to pageB",
        "多刷几次看看多语言":"这里应该会是英文"
    }
}
</i18n>
<template>
    <div class="row">
        <h1 class="title"> {{$t('多刷几次看看多语言')}}</h1>
        <a class="link" href="/pageb">{{$t('去PageB页面')}}</a>
        <child-page></child-page>
    </div>
</template>

<script>
import childPage from './child.vue';
export default {
    name: 'pagea',
    components:{childPage}
};
</script>

<style lang="scss" scoped>

.row {
    box-sizing: border-box;
    padding: 20px;
    .title{
        background: #ccc;
        margin: 0;
        box-sizing: border-box;
        padding: 1rem;
    }
    .link{
        margin-top: 20px;
        display: inline-block;
    }
}
</style>
