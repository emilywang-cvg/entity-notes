<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <!-- Sidebar Navigation -->
      <div class="w-64 bg-white shadow-sm border-r min-h-screen">
        <div class="p-4">
          <div class="flex items-center mb-8">
            <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span class="text-white font-bold text-sm">CG</span>
            </div>
            <span class="ml-2 text-lg font-semibold text-gray-800">CoverGo</span>
          </div>
          
          <nav class="space-y-1">
            <div 
              v-for="item in navigationItems" 
              :key="item.name"
              :class="[
                'flex items-center px-3 py-2 text-sm rounded-md cursor-pointer transition-colors',
                item.active 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              ]"
            >
              <component :is="item.icon" class="w-4 h-4 mr-3" />
              {{ item.name }}
              <span 
                v-if="item.badge" 
                class="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
              >
                {{ item.badge }}
              </span>
            </div>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1">
        <!-- Header -->
        <div class="bg-white border-b px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-xl font-semibold text-gray-900">Member Information</h1>
              <p class="text-sm text-gray-500 mt-1">{{ memberData.name }}</p>
            </div>
            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span class="text-gray-600 text-sm font-medium">U</span>
            </div>
          </div>
        </div>

        <!-- Tab Navigation and Content -->
        <div class="bg-white border-b">
          <div class="px-6">
            <div class="flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="p-6 bg-gray-50">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Content (2/3 width) -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Viewing Master Profile -->
              <div class="bg-white rounded-lg shadow-sm border">
                <div class="p-4 border-b flex items-center justify-between">
                  <span class="font-medium text-gray-900">VIEWING MASTER PROFILE</span>
                  <div class="relative">
                    <button class="flex items-center text-gray-500 hover:text-gray-700">
                      <span class="mr-1">Master Profile</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Member Details Form -->
              <div class="bg-white rounded-lg shadow-sm border">
                <div class="p-4 border-b flex items-center justify-between">
                  <h3 class="font-medium text-gray-900">MEMBER DETAIL</h3>
                  <div class="flex items-center space-x-2">
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">
                      ACTIVE MEMBER
                    </span>
                    <button class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      EDIT
                    </button>
                  </div>
                </div>
                
                <div class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Left Column -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <p class="text-gray-900">{{ memberData.name }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
                        <p class="text-gray-900">{{ memberData.memberId }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">National ID</label>
                        <p class="text-gray-900">{{ memberData.nationalId }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <p class="text-gray-900">{{ memberData.address }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Boolean</label>
                        <p class="text-gray-900">{{ memberData.boolean }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Number</label>
                        <p class="text-gray-900">{{ memberData.number }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Passport No.</label>
                        <p class="text-gray-900">{{ memberData.passportNo }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <p class="text-gray-900">{{ memberData.dateOfBirth }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Staff No.</label>
                        <p class="text-gray-900">{{ memberData.staffNo }}</p>
                      </div>
                    </div>

                    <!-- Right Column -->
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <p class="text-gray-900">{{ memberData.gender }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                        <p class="text-gray-900">{{ memberData.maritalStatus }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <p class="text-gray-900">{{ memberData.phone }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p class="text-gray-900">{{ memberData.email }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                        <p class="text-gray-900">{{ memberData.employmentStatus }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <p class="text-gray-900">{{ memberData.department }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <p class="text-gray-900">{{ memberData.position }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                        <p class="text-gray-900">{{ memberData.salary }}</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                        <p class="text-gray-900">{{ memberData.joinDate }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar (1/3 width) -->
            <div class="space-y-6">
              <!-- Quick Actions -->
              <div class="bg-white rounded-lg shadow-sm border">
                <div class="p-4 border-b">
                  <h3 class="font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div class="p-4 space-y-2">
                  <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    View Documents
                  </button>
                  <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Schedule Meeting
                  </button>
                  <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Send Email
                  </button>
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="bg-white rounded-lg shadow-sm border">
                <div class="p-4 border-b">
                  <h3 class="font-medium text-gray-900">Recent Activity</h3>
                </div>
                <div class="p-4 space-y-3">
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-900">Profile updated</p>
                      <p class="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-900">Insurance claim submitted</p>
                      <p class="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-900">Document uploaded</p>
                      <p class="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button for Notes - Pure Tailwind CSS -->
    <div 
      class="fixed z-50"
      style="right: 40px; bottom: 40px;"
    >
      <div 
        class="relative cursor-pointer"
        @click="openNotesDrawer()"
        :title="`View ${memberNotesCount} Entity Notes for ${memberData.name}`"
        style="overflow: visible;"
      >
        <!-- Main Button - Exact Figma specs -->
        <div class="bg-white box-border content-stretch flex flex-col items-center justify-center relative rounded-full shadow-lg hover:shadow-xl transition-shadow w-10 h-10"
             style="overflow: visible; box-shadow: 0px 6px 16px 0px rgba(0,0,0,0.08), 0px 3px 6px -4px rgba(0,0,0,0.12), 0px 9px 28px 8px rgba(0,0,0,0.05);">
          <!-- Icon Container -->
          <div class="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.2359 20.0297L22.2797 14.9859C22.4203 14.8453 22.5 14.6555 22.5 14.4562L22.5 4.5C22.5 4.08516 22.1648 3.75 21.75 3.75L2.25 3.75C1.83516 3.75 1.5 4.08516 1.5 4.5L1.5 19.5C1.5 19.9148 1.83515 20.25 2.25 20.25L16.7039 20.25C16.9031 20.25 17.0953 20.1703 17.2359 20.0297ZM16.3594 18.5203L16.3594 14.1094L20.7703 14.1094L16.3594 18.5203ZM3.1875 18.5625L3.1875 5.4375L20.8125 5.4375L20.8125 12.5156L15.75 12.5156C15.4889 12.5156 15.2385 12.6193 15.0539 12.8039C14.8693 12.9885 14.7656 13.2389 14.7656 13.5L14.7656 18.5625L3.1875 18.5625Z" fill="#47576B"/>
              <path d="M14.575 8.1875L14.575 9.3125C14.575 9.41562 14.4906 9.5 14.3875 9.5L5.38745 9.5C5.28433 9.5 5.19995 9.41562 5.19995 9.3125L5.19995 8.1875C5.19995 8.08437 5.28433 8 5.38745 8L14.3875 8C14.4906 8 14.575 8.08437 14.575 8.1875Z" fill="#47576B"/>
              <path d="M5.19995 11.5625C5.19995 11.4594 5.28433 11.375 5.38745 11.375L9.69995 11.375C9.80308 11.375 9.88745 11.4594 9.88745 11.5625L9.88745 12.6875C9.88745 12.7906 9.80308 12.875 9.69995 12.875L5.38745 12.875C5.28433 12.875 5.19995 12.7906 5.19995 12.6875L5.19995 11.5625Z" fill="#47576B"/>
            </svg>
          </div>
        </div>
        
        <!-- Badge - Exact CSS specs from Figma -->
        <div 
          v-if="memberNotesCount >= 0"
          class="absolute bg-blue-600 border border-white rounded-xl flex flex-col justify-center items-center"
          style="
            width: 20px;
            height: 14px;
            right: -6px;
            top: -4px;
            background: #006AF5;
            border: 1px solid #FFFFFF;
            border-radius: 12px;
            z-index: 10;
            overflow: visible;
          "
        >
          <div 
            class="flex flex-col justify-center items-center text-center text-white"
            style="
              font-family: 'Poppins', sans-serif;
              font-size: 12px;
              font-weight: 400;
              line-height: 20px;
              text-align: center;
              white-space: nowrap;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            {{ memberNotesCount }}
          </div>
        </div>
      </div>
    </div>

    <!-- Notes Side Panel Drawer - Pure Tailwind CSS -->
    <div 
      v-if="showNotesDrawer"
      class="fixed inset-0 z-50 overflow-hidden"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black bg-opacity-50"
        @click="closeNotesDrawer"
      ></div>
      
      <!-- Drawer Panel -->
      <div class="absolute right-0 top-0 h-full w-[600px] bg-white shadow-xl">
        <!-- Custom Header -->
        <div class="border-b border-gray-200 flex items-center relative w-full" style="padding: 16px 24px;">
          <!-- Close Icon -->
          <div class="w-5 h-5 flex items-center justify-center cursor-pointer" @click="closeNotesDrawer">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          
          <!-- Title Section -->
          <div class="flex-1 flex flex-col gap-1 items-start justify-center" style="margin-left: 16px; margin-right: 16px; ">
            <p class="font-semibold leading-6 text-gray-900 text-base" style="font-family: 'Poppins', sans-serif; margin-bottom: 0em;">
              Notes for {{ memberData.name }}
            </p>
            <p class="font-normal leading-5 text-gray-500 text-xs whitespace-nowrap" style="font-family: 'Poppins', sans-serif;">
              {{ memberData.name }} ID: {{ memberData.memberId }}
            </p>
          </div>
          
          <!-- Create Note Button -->
          <button 
            @click="showCreateNoteModal = true"
            class="px-4 py-1 text-sm text-white rounded-md hover:opacity-90 transition-opacity"
            style="
              background-color: #004299;
              border-radius: 6px;
              height: 32px;
              padding-left: 16px;
              padding-right: 16px;
              font-family: 'Poppins', sans-serif;
              font-size: 14px;
              font-weight: 400;
              line-height: 22px;
            "
          >
            Create Note
          </button>
        </div>
        
        <div class="h-full">
          <EntityNotesDrawerContent 
            ref="drawerContentRef"
            :entity-type="'Member'"
            :entity-id="memberData.memberId"
            :entity-name="memberData.name"
            :can-edit-notes="canEditNotes"
            :can-create-notes="canCreateNotes"
            @note-created="handleNoteCreated"
            @update:note-count="handleNotesCountUpdate"
          />
        </div>
      </div>
    </div>

    <!-- Create Note Modal - Pure Tailwind CSS -->
    <div 
      v-if="showCreateNoteModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black bg-opacity-50"
        @click="showCreateNoteModal = false"
      ></div>
      
      <!-- Modal Panel -->
      <div class="relative z-10">
        <EnhancedNoteModal
          :visible="showCreateNoteModal"
          :note="null"
          :entity-type="'Member'"
          :entity-id="memberData.memberId"
          :entity-name="memberData.name"
          :can-edit-notes="canEditNotes"
          :can-create-notes="canCreateNotes"
          @note-saved="handleNoteSaved"
          @close="showCreateNoteModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import EntityNotesDrawerContent from '../components/EntityNotesDrawerContent.vue'
import EnhancedNoteModal from '../components/EnhancedNoteModal.vue'

// Simple icon components using SVG
const HomeIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>
  `
}

const FileTextIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
  `
}

const TeamIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  `
}

const InsuranceIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    </svg>
  `
}

const DollarIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
    </svg>
  `
}

const SettingIcon = {
  template: `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  `
}

export default {
  name: 'MemberDetail',
  components: {
    HomeIcon,
    FileTextIcon,
    TeamIcon,
    InsuranceIcon,
    DollarIcon,
    SettingIcon,
    EntityNotesDrawerContent,
    EnhancedNoteModal,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeTab = ref('details')
    const drawerContentRef = ref(null)

    const navigationItems = [
      { name: 'Home', icon: HomeIcon, active: false },
      { name: 'Entity Notes', icon: FileTextIcon, active: false },
      { name: 'Insureds', icon: TeamIcon, active: true, badge: 3 },
      { name: 'Policies', icon: InsuranceIcon, active: false },
      { name: 'Claims', icon: DollarIcon, active: false },
      { name: 'Settings', icon: SettingIcon, active: false },
    ]

    const tabs = [
      { key: 'details', label: 'Member Details' },
      { key: 'policies', label: 'Policies' },
      { key: 'claims', label: 'Claims' },
      { key: 'documents', label: 'Documents' },
    ]

    const memberData = ref({
      name: 'John Doe',
      memberId: 'U00117501-00',
      nationalId: '1234567890',
      address: '123 Main Street, City, State 12345',
      boolean: 'Yes',
      number: '12345',
      passportNo: 'AB1234567',
      dateOfBirth: '1990-01-15',
      staffNo: 'EMP001',
      gender: 'Male',
      maritalStatus: 'Single',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      employmentStatus: 'Active',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: '$75,000',
      joinDate: '2020-03-15',
    })

    const showNotesDrawer = ref(false)
    const showCreateNoteModal = ref(false)
    const canEditNotes = ref(true)
    const canCreateNotes = ref(true)

    const openNotesDrawer = () => {
      console.log('Opening notes drawer...')
      showNotesDrawer.value = true
    }

    const closeNotesDrawer = () => {
      showNotesDrawer.value = false
    }

    const handleNoteCreated = (noteData) => {
      console.log('Note created:', noteData)
    }

    const handleNoteSaved = (noteData) => {
      showCreateNoteModal.value = false
      // Add the new note to the drawer content
      if (drawerContentRef.value && drawerContentRef.value.addNewNote) {
        drawerContentRef.value.addNewNote(noteData)
      }
      console.log('Note saved for member:', memberData.value.name, noteData)
    }

    // Notes count from drawer content
    const notesCount = ref(0)

    // Count notes for current member
    const memberNotesCount = computed(() => {
      return notesCount.value
    })

    // Handle notes count update from drawer
    const handleNotesCountUpdate = (count) => {
      console.log('Notes count updated:', count)
      notesCount.value = count
    }

    return {
      activeTab,
      navigationItems,
      tabs,
      memberData,
      showNotesDrawer,
      showCreateNoteModal,
      openNotesDrawer,
      closeNotesDrawer,
      handleNoteCreated,
      handleNoteSaved,
      memberNotesCount,
      handleNotesCountUpdate,
      drawerContentRef,
      canEditNotes,
      canCreateNotes,
    }
  }
}
</script>