import type { TabsPaneContext } from "element-plus";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

interface IMusicMenu {
  label: string;
  name: string;
}

export function useMusicMenu() {
  const menus: IMusicMenu[] = [
    {
      label: "精选",
      name: "picked",
    },
    {
      label: "有声电台",
      name: "dj",
    },
    {
      label: "排行",
      name: "toplist",
    },
    {
      label: "歌手",
      name: "artist",
    },
    {
      label: "分类歌单",
      name: "category",
    },
    {
      label: "数字专辑",
      name: "digital",
    },
  ];
  const router = useRouter();
  const route = useRoute();
  const currentMenu = ref<string>(route.name as string);
  watch(
    () => route.name,
    m => {
      currentMenu.value = m as string;
    }
  );
  const onTabClick = ({ props }: TabsPaneContext) => {
    router.push({ name: props.name as string, replace: true });
  };
  return {
    menus,
    currentMenu,
    onTabClick,
  };
}
