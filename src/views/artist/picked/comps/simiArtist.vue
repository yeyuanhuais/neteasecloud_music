<script setup lang="ts">
import Title from "@/components/title.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Artist } from "@/models/artist";
import { useArtistStore } from "@/stores/artist";

const props = defineProps<{ id: number }>();
const { getSimiArtist } = useArtistStore();
const router = useRouter();
const artists = ref<Artist[]>([]);
const getData = async () => {
  try {
    const { artists: data } = await getSimiArtist(props.id);
    artists.value = data;
  } catch (e) {}
};

onMounted(async () => {
  await getData();
});
</script>
<template>
  <Title title="相似歌手" class="mt-4" />

  <div class="grid grid-flow-row grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-5">
    <div v-for="artist in artists" :key="artist.id" class="flex items-center flex-col hover-text" @click="router.push({ name: 'artistDetail', query: { id: artist.id } })">
      <img :src="artist.img1v1Url + '?param=120y120'" alt="" class="rounded-full cursor-pointer w-full aspect-square object-cover bg-dc" />
      <div class="mt-2 text-sm">{{ artist.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
