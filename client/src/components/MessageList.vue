<template>
    <div class="message-list">
        <template v-if="type === 'join'">
            <div class="msg-join">
                {{`${from.name} 加入群聊.`}}
            </div>
        </template>
        <template v-else-if="type === 'rename'">
            <div class="msg-join">
                {{`${from.oldname} 更换名字为 ${from.name} `}}
            </div>
        </template>
        <template v-else-if="type === 'left'">
            <mu-list-item class="text-center" :title="from.name + ' left.'">
            </mu-list-item>
        </template>
        <template v-else>
            <div class="msg-list">
                <div class="msg-detail-name">
                    {{from.name}}:
                </div>
                <div class="msg-detail">
                    {{ content }}
                </div>
            </div>

        </template>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        props: {
            type: {
                type: String,
                required: true,
            },
            // 包含avatar id
            from: {
                type: Object,
            },
            content: {
                type: String,
            },
        },
    })
    export default class Message extends Vue {}
</script>
<style lang="scss">
    .message-list{
        padding: 0 10px;
        font-size: 12px;
        color: rgba(0,0,0,.54);
        .msg-join{
            text-align: center;
            padding: 0 15px;
        }
        .msg-list{
            padding: 10px 10px;
            width: 100%;
            .msg-detail{
                font-size: 16px;
                color: #333;
            }
        }
    }
</style>
