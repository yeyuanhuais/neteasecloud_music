<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { PlaylistHighqualityTag } from "@/models/playlist";
import _axios from "@/plugins/axios";

const emit = defineEmits<{(e: "catChange", cat: string): void }>();

const catClick = (cat: string) => {
  if (cat === "全部") {
    subTags.value = [];
    tagsActive.value = "全部";
  }
  subTagsActive.value = cat;
  emit("catChange", cat);
};
const tagClick = (tag: PlaylistHighqualityTag) => {
  tagsActive.value = tag.name;
  subTags.value = tag.children;
  catClick(tag.name);
};

const tags = ref<PlaylistHighqualityTag[]>();
const subTags = ref<PlaylistHighqualityTag[]>([]);
const tagsActive = ref("全部");
const subTagsActive = ref("");

onMounted(async () => {
  const { categories, sub } = await _axios.get<{
    all: PlaylistHighqualityTag;
    categories: { number: string };
    sub: PlaylistHighqualityTag[];
  }>("/playlist/catlist");
  let catList: PlaylistHighqualityTag[] = [];
  for (const key in categories) {
    catList.push({ category: -1, name: categories[key], childId: Number(key), children: [] });
  }
  sub.forEach((element: PlaylistHighqualityTag) => {
    catList = catList.map(item => {
      if (element.category === item.childId) {
        item.children.push(element);
      }
      return item;
    });
  });
  tags.value = catList;
});
</script>
<template>
  <div class="grid grid-flow-row grid-cols-8 2xl:grid-cols-12 gap-2.5">
    <div class="button-dc" @click="catClick('全部')" :class="{ 'text-emerald-400': tagsActive === '全部' }">全部</div>
    <div v-for="(tag, index) in tags" :key="index" class="button-dc" :class="{ 'text-emerald-400': tagsActive === tag.name }" @click="tagClick(tag)">{{ tag.name }}</div>
  </div>
  <div v-if="subTags.length > 0" class="mt-2 grid grid-flow-row grid-cols-8 2xl:grid-cols-12 gap-2.5">
    <div v-for="(tag, index) in subTags" :key="index" class="button-dc" :class="{ 'text-emerald-400': subTagsActive === tag.name }" @click="catClick(tag.name)">{{ tag.name }}</div>
  </div>
</template>

<style lang="scss">
.t {
}
</style>
