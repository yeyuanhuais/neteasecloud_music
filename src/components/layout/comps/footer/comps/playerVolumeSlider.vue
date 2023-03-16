<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { toRefs } from "vue";
import IconPark from "@/components/iconPark.vue";
import { VolumeMute, VolumeSmall } from "@icon-park/vue-next";

const { volume, muted, toggleMuted, setVolume } = toRefs(usePlayerStore());
</script>
<template>
  <div class="player-volmue flex flex-col items-center pt-2">
    <div>
      <el-slider vertical height="100px" :showTooltip="false" v-model="volume" :max="100" :min="0" size="small" :disabled="muted" @input="setVolume" />
    </div>
    <div class="text-sm mt-3">{{ volume }}</div>
    <div class="mt-2">
      <IconPark :icon="muted ? VolumeMute : VolumeSmall" size="16" theme="filled" class="hover-text" @click="toggleMuted" />
    </div>
  </div>
</template>

<style lang="scss">
.el-popover.el-popper {
  min-width: auto;
}
</style>
