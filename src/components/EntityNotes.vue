<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900" style="font-family: 'Poppins', sans-serif;">Entity Notes</h1>
          <p class="text-gray-600 mt-1" style="font-family: 'Poppins', sans-serif;">Manage notes for all entities in CoverHealth</p>
        </div>
        <div class="flex items-center gap-3">
          <button 
            @click="navigateToMemberDetail"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style="font-family: 'Poppins', sans-serif;"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            View Member Detail
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-6">
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6">
          <div class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2" style="font-family: 'Poppins', sans-serif;">Entity Notes Dashboard</h2>
            <p class="text-gray-600 mb-6" style="font-family: 'Poppins', sans-serif;">
              This is the main Entity Notes interface. To view notes for a specific entity, 
              navigate to the entity's detail page and use the floating action button.
            </p>
            <button 
              @click="navigateToMemberDetail"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              style="font-family: 'Poppins', sans-serif;"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Go to Member Detail Page
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'EntityNotes',
  setup() {
    const router = useRouter()

    const navigateToMemberDetail = () => {
      router.push('/member/U00117501-00')
    }

    return {
      navigateToMemberDetail,
    }
  },
}
</script>