<script setup lang="ts">
import Title from "@/components/title.vue";
import { useExclusiveStore } from "@/stores/exclusive";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";

const { personalizedPrivateContent } = toRefs(useExclusiveStore());
const { getPersonalizedPrivateContent } = useExclusiveStore();
const router = useRouter();
onMounted(() => {
  getPersonalizedPrivateContent();
});
</script>
<template>
  <Title routeName="exclusive" title="独家放送" class="mt-2" />
  <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
    <div v-for="item in personalizedPrivateContent" :key="item.id" @click="router.push({ name: 'mvDetail', query: { id: item.id } })">
      <CoverPlay :picUrl="item.sPicUrl" video :name="item.name" />
      <div class="truncate text-xs mt-2">{{ item.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
