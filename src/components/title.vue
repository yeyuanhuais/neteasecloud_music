<script setup lang="ts">
import IconPark from "./iconPark.vue";
import { Right } from "@icon-park/vue-next";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const props = defineProps<{ title: string; routeName?: string; subtitle?: any; onSubtitleClick?: any }>();
const router = useRouter();
const subTitleVal = ref("");
const onClick = (val?: string) => {
  router.push({ name: val, replace: true });
};
onMounted(() => {
  if (props.subtitle && props.subtitle.length > 0) {
    subTitleVal.value = props.subtitle.first().value;
  } else {
    subTitleVal.value = "";
  }
});
</script>
<template>
  <div class="text-xl py-3 mt-2 flex items-center justify-between">
    <div>
      <span>{{ props.title }}</span>
      <template v-if="props.subtitle && props.subtitle.length > 0">
        <span
          v-for="(item, index) in props.subtitle"
          :key="index"
          class="hover-text text-sm ml-3"
          :class="subTitleVal === item.value ? 'text-emerald-400' : 'text-neutral-400'"
          @click="
            () => {
              props.onSubtitleClick(item.value);
              subTitleVal = item.value;
            }
          "
          >{{ item.label }}
        </span>
      </template>
    </div>
    <div v-if="props.routeName" class="text-sm flex items-center hover-text" @click="onClick(props.routeName)">
      <span>更多</span>
      <IconPark :icon="Right" :size="20" />
    </div>
  </div>
</template>
