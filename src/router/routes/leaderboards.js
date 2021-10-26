export default [
  {
    path: '/leaderboards',
    name: 'leaderboards',
    component: () => import('@/views/leaderboards/Leaderboards.vue'),
    meta: {
      pageTitle: 'Leaderboards',
      breadcrumb: [
        {
          text: 'Leaderboards',
          active: true,
        },
      ],
    },
  },
]
