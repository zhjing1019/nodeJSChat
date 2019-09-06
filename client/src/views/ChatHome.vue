<template>
    <div class="chat-home">
        <chat-head></chat-head>
        <div class="msg-list-div">
            <message-list v-for="item in msgList" :key="item.id" v-bind="item"></message-list>
        </div>
        <div class="msg-input">
            <input type="text" v-model="msgInput" class="msg-input-detail">
            <button class="msg-input-btn" @click="sendText">发送</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import ChatHead from '@/components/ChatHead.vue';
    import { mapState, mapMutations, mapGetters } from 'vuex';
    import MessageList from '@/components/MessageList.vue'
    import config from '../config';

    @Component({
        components: {
            ChatHead,
            MessageList
        },
        computed: {
            ...mapState(['ws', 'msgList', 'user']),
        },
        methods: {
            ...mapMutations(['initWS', 'addMsg', 'sendMsg']),
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
        sendJoin(this: any) {
            const user = this.user;
            this.sendMsg({
                type: 'join',
                from: user,
                content: '',
            });
        }
        createSocket(this: any) {
            this.initWS(new WebSocket(config.wsurl));
            this.ws.onopen = (e: any) => {
                console.log('connection established');
                this.sendJoin();
            };
            this.ws.onmessage = (e: any) => {
                const msg = JSON.parse(e.data);
                this.$store.commit('addMsg', msg);
                this.$nextTick(() => {
                    try {
                        const msgEl = document.querySelector('.msg-list > div:last-child');
                        if (msgEl) msgEl.scrollIntoView();
                    } catch (err) {
                        console.error(err);
                    }
                });
            };
            this.ws.onerror = (error: any) => {
                this.createSocket();
            };
        }
        created() {
            this.createSocket();
        }
        beforeDestroy(this: any) {
            this.ws.close();
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
        .msg-list-div {
            height: calc(100vh - 120px);
            overflow: auto;
        }
        .msg-input {
            width: 100%;
            height: 60px;
            line-height: 60px;
            padding: 0;
            box-sizing: border-box;
            border-top: 1px solid $border-color;
            .msg-input-detail{
                width: calc(100% - 60px);
                outline: 0;
                border: 0;
                padding: 0 10px;
                height: 60px;
                line-height: 60px;
            }
            .msg-input-btn{
                width: 60px;
                border: 0;
                border-left: 1px solid $border-color;
                background: $default-color;
                color: #fff;
                font-weight: bold;
                outline: 0;
                height: 60px;
                line-height: 60px;
            }

        }
    }
</style>
