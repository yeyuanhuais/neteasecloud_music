<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";
import { onMounted, toRefs } from "vue";
import { useDjStore } from "@/stores/dj";
import type { DjBanner } from "@/models/dj";
import { useRouter } from "vue-router";
const { djBanner } = toRefs(useDjStore());
const { getDjBanner } = useDjStore();
const router = useRouter();
onMounted(() => {
  getDjBanner();
});
const { play } = usePlayerStore();
const onClick = (banner: DjBanner) => {
  if (banner.targetType === 1) {
    play(banner.targetId);
  }
};
</script>
<template>
  <Swiper
    slides-per-group-auto
    slides-per-view="auto"
    :navigation="true"
    :grab-cursor="true"
    :modules="[Navigation, Pagination, Autoplay]"
    :pagination="{ clickable: true }"
    autoplay
    class="swiper-banner"
  >
    <SwiperSlide v-for="item in djBanner" :key="item.targetId" class="relative" @click="router.push({ name: 'djProgram', query: { id: item.targetId } })">
      <img :src="item.pic" class="banner-image" @click="onClick(item)" />
      <p class="absolute right-2.5 top-3 bg-white bg-opacity-70 rounded-l text-xs p-0.5">{{ item.typeTitle }}</p>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper-banner {
  ::v-deep(.swiper-wrapper) {
    margin-bottom: 22px;
  }
  ::v-deep(.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal) {
    bottom: var(--swiper-pagination-bottom, 0px);
  }
}
.swiper {
  @apply -mx-2.5;
  .swiper-slide {
    @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-2.5;
  }
}
.banner-image {
  @apply rounded-lg cursor-pointer transition-all object-cover;
  @apply hover:shadow hover:opacity-80;
}
</style>
