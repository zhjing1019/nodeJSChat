<template>
    <div class="chat-head">

    </div>
</template>

<script lang="ts">

    import Vue from 'vue';
    import Component from 'vue-class-component';
    @Component
    export default class ChatHead extends Vue {
        // userName: string = localStorage.getItem("user");
        // interface Person {
        //     name: string;
        // };
        // public user: Person = localStorage.getItem("user");

    }
</script>

<style lang="scss">
    @import "./../style/commonStyle.scss";
    .chat-head{
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: $default-color;
        color: #fff;
        font-size: 14px;
        padding-left: 20px;
    }

</style>
