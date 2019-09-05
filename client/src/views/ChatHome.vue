<template>
    <div class="chat-home">
        <chat-head></chat-head>
        <mu-list class="msg-list">
            <Message v-for="item in msgList" :key="item.id" v-bind="item"></Message>
        </mu-list>
        <mu-bottom-nav class="mag-input" :value="bottomNav">
            <mu-text-field v-model="msgInput" class="inputFiled" label="Input your message here" labelFloat />
            <mu-raised-button id="sendBtn" icon="send" @click="sendText"/>
        </mu-bottom-nav>


    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import ChatHead from '@/components/ChatHead.vue';
    import { mapState, mapMutations, mapGetters } from 'vuex';
    import Message from '@/components/Message.vue'

    @Component({
        components: {
            ChatHead,
        },
        computed: {
            ...mapState(['ws', 'msgList', 'user']),
        },
        methods: {
            ...mapMutations(['toggleLogin', 'initWS', 'addMsg', 'sendMsg']),
        },
    })
    export default class ChatHome extends Vue {
        public msgInput: string = '';
        public bottomNav: string = '';
        public sendText(this: any) {
            if (this.msgInput === '') return false;
            const user = this.user;
            const content = this.msgInput;
            this.sendMsg({
                type: 'addMsg',
                from: user,
                content,
            });
            this.msgInput = '';
        }
    }
</script>

<style lang="scss">
    @import "../style/commonStyle";
    .chat-home{
        max-width: $max-width;
        width: 100%;
        height: $max-height;
        position: relative;
        margin: 0 auto;
        .msg-list {
            height: calc(100vh - 120px);
            margin: 0 auto 50px;
            overflow: auto;
        }
        .msg-input {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 0;
            width: 80%;
            left: 50%;
            transform: translate(-50%, -20%);
        }
    }
</style>
