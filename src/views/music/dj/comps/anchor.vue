<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useDjStore } from "@/stores/dj";
import { useNumberFormat } from "@/plugins/utils";
import IconPark from "@/components/iconPark.vue";
import { Headset } from "@icon-park/vue-next";
const { toplistAnchor } = toRefs(useDjStore());
const { getToplistAnchor } = useDjStore();
const router = useRouter();
onMounted(() => {
  getToplistAnchor();
});
</script>
<template>
  <Title routeName="dj" title="人气主播" class="mt-4" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5">
    <template v-for="(item, index) in toplistAnchor" :key="item.id">
      <div v-if="index < 10" @click="router.push({ name: 'dj', query: { id: item.id } })" class="flex flex-col justify-center items-center cursor-pointer">
        <img :src="item.avatarUrl" :alt="item.nickName" class="rounded-full" />
        <div class="truncate text mt-2  hover-text">{{ item.nickName }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
