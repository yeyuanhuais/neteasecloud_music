<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const props = defineProps<{ text: string; end: number }>();

const show = ref(false);
if (props.text && props.text.length > props.end) {
  show.value = true;
}
</script>
<template>
  <div class="leading-5">
    <template v-if="show">
      <span visible>{{ text.substring(0, end) }}...</span>
      <span class="ml-5 text-gray-700 hover-text" @click="visible = true">[ {{ visible ? "收起" : "详情" }} ]</span>
    </template>
    <template v-else>{{ text }}</template>
  </div>
  <el-drawer v-model="visible" title="简介" direction="rtl" size="30%">
    <p class="whitespace-pre-line text-sm">{{ text }}</p>
  </el-drawer>
</template>
