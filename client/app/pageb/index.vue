<template>
    <div class="row">
        <h1 class="title">This is Page B</h1>
        <a href="/pagea">去PageA页面</a>
    </div>
</template>

<script>
export default {
    name: 'pageb'
};
</script>

<style lang="scss" scoped>
.title{
    background: #ccc;
    margin: 0;
    box-sizing: border-box;
    padding: 1rem;
    color: red;
    background: url(./bg.jpg);
}
</style>
