import { createRouter, createWebHistory } from 'vue-router'
import EntityNotes from '../components/EntityNotes.vue'
import MemberDetail from '../views/MemberDetail.vue'

const routes = [
  {
    path: '/',
    name: 'EntityNotes',
    component: EntityNotes,
    meta: {
      title: 'Entity Notes'
    }
  },
  {
    path: '/member/:id',
    name: 'MemberDetail',
    component: MemberDetail,
    meta: {
      title: 'Member Details'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title based on route
router.beforeEach((to) => {
  document.title = to.meta.title || 'CoverHealth'
})

export default router




