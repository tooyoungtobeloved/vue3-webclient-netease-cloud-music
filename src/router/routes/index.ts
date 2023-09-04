import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: 'Home',
    },
    redirect: '/discover',
    children: [
      {
        path: 'discover',
        name: 'discover',
        meta: {
          title: 'discover',
        },
        component: () => import('@/views/discover/template/template.vue'),
        redirect: '/discover/recommend',
        children: [
          {
            alias: 'recommend',
            path: 'recommend',
            component: () => import('@/views/discover/recommend/recommend.vue'),
          },
          {
            path: 'toplist',
            component: () => import('@/views/discover/toplist/toplist.vue'),
          },
          {
            path: 'playlist',
            name: 'playlist',
            component: () => import('@/views/discover/playlist/playlist.vue'),
            meta: {
              title: 'playlist',
            },
          },
          {
            path: 'djradio',
            name: 'djradio',
            component: () => import('@/views/discover/djradio/djradio.vue'),
            meta: {
              title: 'djradio',
            },
          },
          {
            path: 'artist',
            name: 'artist',
            component: () => import('@/views/discover/artist/artist.vue'),
            meta: {
              title: 'artist',
            },
          },
          {
            path: 'album',
            name: 'album',
            component: () => import('@/views/discover/album/album.vue'),
            meta: {
              title: 'album',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/my',
    name: 'my',
    alias: '/',
    component: () => import('@/views/my/my.vue'),
  },
]

export default routes
