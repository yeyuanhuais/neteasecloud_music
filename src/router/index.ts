import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/components/layout/index.vue"),
      redirect: { name: "music" },
      children: [
        {
          path: "discover",
          name: "discover",
          component: () => import("@/views/discover/index.vue"),
          meta: {
            menu: "discover",
            keepAlive: true,
          },
        },
        {
          path: "music",
          name: "music",
          component: () => import("@/views/music/index.vue"),
          redirect: { name: "picked" },
          meta: {
            menu: "music",
          },
          children: [
            {
              path: "picked",
              name: "picked",
              component: () => import("@/views/music/picked/index.vue"),
              meta: {
                menu: "music",
                title: "精选",
                keepAlive: true,
              },
            },
            {
              path: "dj",
              name: "dj",
              component: () => import("@/views/music/dj/index.vue"),
              meta: {
                menu: "music",
                title: "有声电台",
                keepAlive: true,
              },
            },
            {
              path: "toplist",
              name: "toplist",
              component: () => import("@/views/music/toplist/index.vue"),
              meta: {
                menu: "music",
                title: "排行",
                keepAlive: true,
              },
            },
            {
              path: "artist",
              name: "artist",
              component: () => import("@/views/music/artist/index.vue"),
              meta: {
                menu: "music",
                title: "歌手",
                keepAlive: true,
              },
            },
            {
              path: "category",
              name: "category",
              component: () => import("@/views/music/category/index.vue"),
              meta: {
                menu: "music",
                title: "分类歌单",
                keepAlive: true,
              },
            },
            {
              path: "digital",
              name: "digital",
              component: () => import("@/views/music/digital/index.vue"),
              meta: {
                menu: "music",
                title: "数字专辑",
                keepAlive: true,
              },
            },
          ],
        },
        {
          path: "mvDetail",
          name: "mvDetail",
          component: () => import("@/views/music/exclusive/mvDetail.vue"),
          meta: {
            menu: "music",
            title: "MV详情",
            keepAlive: true,
          },
        },
        {
          path: "playlist",
          name: "playlist",
          component: () => import("@/views/playlist/index.vue"),
        },
        {
          path: "album",
          name: "album",
          component: () => import("@/views/album/index.vue"),
        },
        {
          path: "djProgram",
          name: "djProgram",
          component: () => import("@/views/dj/index.vue"),
        },
        {
          path: "video",
          name: "video",
          component: () => import("@/views/video/index.vue"),
          meta: {
            menu: "video",
            title: "视频",
            keepAlive: true,
          },
        },
        {
          path: "video",
          name: "video",
          component: () => import("@/views/video/index.vue"),
          meta: {
            menu: "video",
            title: "视频",
            keepAlive: true,
          },
          redirect: { name: "videoPicked" },
          children: [
            {
              path: "videoPicked",
              name: "videoPicked",
              component: () => import("@/views/video/videoPicked/index.vue"),
              meta: {
                menu: "video",
                title: "精选",
                keepAlive: true,
              },
            },
            {
              path: "toplist",
              name: "toplist",
              component: () => import("@/views/video/toplist/index.vue"),
              meta: {
                menu: "video",
                title: "排行榜",
                keepAlive: true,
              },
            },
            {
              path: "library",
              name: "library",
              component: () => import("@/views/video/library/index.vue"),
              meta: {
                menu: "video",
                title: "视频库",
                keepAlive: true,
              },
            },
          ],
        },
      ],
    },
  ],
});

export default router;
