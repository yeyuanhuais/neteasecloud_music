<script setup lang="ts">
import Title from "@/components/title.vue";
import { toRefs } from "@vueuse/shared";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/coverPlay.vue";
import { useFmStore } from "@/stores/fm";
import { useNumberFormat } from "@/plugins/utils";
import IconPark from "@/components/iconPark.vue";
import { Headset } from "@icon-park/vue-next";
const subtitle = [
  { label: "热播", value: "hot" },
  { label: "飙升", value: "new" },
];
const { toplist } = toRefs(useFmStore());
const { getToplist } = useFmStore();
const router = useRouter();
onMounted(() => {
  getToplist();
});
</script>
<template>
  <Title routeName="fm" title="电台排行榜" class="mt-4" :subtitle="subtitle" :onSubtitleClick="getToplist" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5">
    <template v-for="(item, index) in toplist" :key="item.id">
      <div v-if="index < 10" @click="router.push({ name: 'fm', query: { id: item.id } })" class="relative">
        <CoverPlay :picUrl="item.picUrl" :name="item.name" />
        <div class="truncate text-xs mt-2">{{ item.name }}</div>
        <div class="absolute right-1 bottom-9 bg-white bg-opacity-70 rounded-lg text-xs py-0.5 px-1.5 flex items-center">
          <IconPark :icon="Headset" class="mr-0.5" />
          {{ useNumberFormat(item.playCount) }}
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
