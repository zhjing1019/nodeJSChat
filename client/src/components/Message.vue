<template>
  <div>
    <template v-if="type === 'join'">
      <mu-list-item class="text-center" :title="from.name + ' joined to this conversation.'">
      </mu-list-item>
    </template>
    <template v-else-if="type === 'rename'">
      <mu-list-item class="text-center" :title="from.oldname + ' is now ' + from.name">
      </mu-list-item>
    </template>
    <template v-else-if="type === 'left'">
      <mu-list-item class="text-center" :title="from.name + ' left.'">
      </mu-list-item>
    </template>
    <template v-else>
      <mu-list-item :title="from.name">
        <mu-avatar :src="from.avatar" slot="leftAvatar" />
        <div slot="describe">
          <div>{{content}}</div>
        </div>
      </mu-list-item>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-center {
	text-align: center;
}
</style>
