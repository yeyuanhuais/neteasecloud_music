<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { toRefs } from "vue";
import IconPark from "@/components/iconPark.vue";
import { LoopOnce, PlayOnce, PauseOne, ShuffleOne, GoStart, Play, GoEnd, VolumeSmall } from "@icon-park/vue-next";
import PlayerVolumeSlider from "./playerVolumeSlider.vue";

const { toggleLoop, loopType, next, prev, togglePlay, isPause, isPlaying } = toRefs(usePlayerStore());
</script>
<template>
  <div class="flex items-center justify-center gap-x-3">
    <IconPark :icon="loopType === 0 ? PlayOnce : loopType === 1 ? LoopOnce : ShuffleOne" size="20" :stroke-width="3" class="hover-text" @click="toggleLoop" />
    <IconPark :icon="GoStart" size="28" theme="filled" class="hover-text" @click="prev" />
    <IconPark :icon="isPause || (!isPause && !isPlaying) ? Play : PauseOne" size="45" theme="filled" class="hover-text text-emerald-400" @click="togglePlay" />
    <IconPark :icon="GoEnd" size="28" class="hover-text" @click="next" />
    <el-popover placement="top" width="50px">
      <template #reference>
        <IconPark :icon="VolumeSmall" size="20" :stroke-width="3" class="hover-text" />
      </template>
      <PlayerVolumeSlider />
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.el-popover .el-popper) {
  min-width: auto;
}
</style>
