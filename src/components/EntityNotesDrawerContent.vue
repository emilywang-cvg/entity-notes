<template>
  <div class="bg-white flex flex-col h-full">
    <!-- Search and Filter Bar -->
    <div class="flex flex-col gap-3 p-6">
      <!-- Search Bar -->
      <div class="bg-white border border-gray-300 rounded-lg">
        <div class="flex items-center gap-2.5 px-3 py-0 w-full">
          <div class="flex items-center gap-2.5 h-10 flex-1">
            <div class="w-4 h-4 flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              placeholder="Search by title, description, user"
              class="flex-1 text-base text-gray-900 placeholder-gray-400 border-none outline-none bg-transparent"
              style="font-family: 'Poppins', sans-serif;"
            />
          </div>
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-3 items-center">
        <!-- Category Filter -->
        <div class="relative">
          <div 
            class="bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            @click="categoryDropdownOpen = !categoryDropdownOpen"
          >
            <div class="flex items-center gap-2 h-10 px-4">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              <span class="text-sm font-normal text-gray-700" style="font-family: 'Poppins', sans-serif;">Category</span>
              <div 
                v-if="selectedCategories.length > 0"
                class="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] h-5 flex items-center justify-center font-medium"
              >
                {{ selectedCategories.length }}
              </div>
              <svg class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': categoryDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <!-- Category Dropdown -->
          <div 
            v-if="categoryDropdownOpen"
            class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 min-w-[240px]"
          >
            <div class="py-1">
              <div 
                v-for="category in ['General', 'Medical', 'Financial', 'Legal', 'Administrative']"
                :key="category"
                class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                @click="toggleCategory(category)"
              >
                <Checkbox 
                  :checked="selectedCategories.includes(category)"
                  class="mr-2"
                />
                <span class="text-sm font-normal text-gray-900" style="font-family: 'Poppins', sans-serif;">{{ category }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- User Filter -->
        <div class="relative">
          <div 
            class="bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            @click="userDropdownOpen = !userDropdownOpen"
          >
            <div class="flex items-center gap-2 h-10 px-4">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-sm font-normal text-gray-700" style="font-family: 'Poppins', sans-serif;">User</span>
              <div 
                v-if="selectedUsers.length > 0"
                class="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] h-5 flex items-center justify-center font-medium"
              >
                {{ selectedUsers.length }}
              </div>
              <svg class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': userDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <!-- User Dropdown -->
          <div 
            v-if="userDropdownOpen"
            class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 min-w-[280px] max-h-60 overflow-y-auto"
          >
            <div class="py-1">
              <div 
                v-for="user in ['Dr. Sarah Johnson', 'Mike Chen', 'John Doe', 'Legal Team', 'Finance Team', 'Dr. Emily Watson', 'Policy Admin', 'Investigation Team', 'Customer Service', 'Risk Management', 'Renewal Team', 'Medical Records']"
                :key="user"
                class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                @click="toggleUser(user)"
              >
                <Checkbox 
                  :checked="selectedUsers.includes(user)"
                  class="mr-2"
                />
                <span class="text-sm font-normal text-gray-900" style="font-family: 'Poppins', sans-serif;">{{ user }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Date Filter -->
        <div class="relative">
          <div 
            class="bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            @click="dateDropdownOpen = !dateDropdownOpen"
          >
            <div class="flex items-center gap-2 h-10 px-4">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-sm font-normal text-gray-700" style="font-family: 'Poppins', sans-serif;">Date</span>
              <div 
                v-if="selectedDate"
                class="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] h-5 flex items-center justify-center font-medium"
              >
                1
              </div>
              <svg class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': dateDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <!-- Date Dropdown -->
          <div 
            v-if="dateDropdownOpen"
            class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 min-w-[240px]"
          >
            <div class="py-1">
              <div 
                v-for="dateOption in ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Last 3 months', 'Last year']"
                :key="dateOption"
                class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                @click="selectDate(dateOption)"
              >
                <Checkbox 
                  :checked="selectedDate === dateOption"
                  class="mr-2"
                />
                <span class="text-sm font-normal text-gray-900" style="font-family: 'Poppins', sans-serif;">{{ dateOption }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Clear Filters Button -->
        <button 
          v-if="hasActiveFilters"
          @click="clearAllFilters"
          class="text-sm text-gray-500 hover:text-gray-700 underline"
          style="font-family: 'Poppins', sans-serif;"
        >
          Clear filters
        </button>
      </div>
    </div>


      <!-- Notes List -->
      <div class="flex-1 overflow-y-auto px-6" style="padding-bottom: 88px;">
      <div v-if="paginatedNotes.length === 0" class="text-center py-8">
        <div class="text-gray-500 text-sm" style="font-family: 'Poppins', sans-serif;">
          {{ searchQuery || hasActiveFilters ? 'No notes found matching your criteria' : 'No notes available' }}
        </div>
      </div>
      
      <div v-else class="space-y-0">
        <div
          v-for="note in paginatedNotes"
          :key="note.id"
          class="border-b border-gray-200 px-0 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
          @click="viewNoteDetail(note)"
        >
          <div class="flex gap-4 items-start">
            <!-- Avatar -->
            <div class="bg-gray-400 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <span class="text-white text-xs font-medium" style="font-family: 'Poppins', sans-serif;">
                {{ getInitials(note.createdBy) }}
              </span>
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <!-- Author and Date Row -->
              <div class="flex items-start justify-between mb-1">
                <span class="font-medium text-gray-900 text-xs" style="font-family: 'Poppins', sans-serif;">
                  {{ note.createdBy }}
                </span>
                <span class="text-xs text-gray-500" style="font-family: 'Poppins', sans-serif;">
                  {{ formatDate(note.createdAt) }}
                </span>
              </div>
              
              <!-- Category Tag and Title Row -->
              <div class="flex gap-1 items-center mb-1">
                <div 
                  class="px-2 py-0.5 rounded text-xs font-normal"
                  :class="getCategoryTagClass(note.category)"
                  style="font-family: 'Poppins', sans-serif;"
                >
                  {{ note.category }}
                </div>
                <h3 class="font-normal text-gray-900 text-base leading-6" style="font-family: 'Poppins', sans-serif;">
                  {{ note.title }}
                </h3>
              </div>
              
              <!-- Description -->
              <p class="text-sm text-gray-500 mb-1 leading-5 line-clamp-2" style="font-family: 'Poppins', sans-serif; margin-bottom: 8px;">
                {{ note.description }}
              </p>
              
              <!-- Attachments -->
              <div v-if="note.attachments && note.attachments.length > 0" class="flex gap-3">
                <div
                  v-for="attachment in note.attachments.slice(0, 2)"
                  :key="attachment.id"
                  class="bg-gray-100 rounded-lg px-2 py-1 flex items-center gap-2"
                >
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                  <span class="text-xs text-gray-900" style="font-family: 'Poppins', sans-serif;">
                    {{ attachment.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="filteredNotes.length > 0" class="px-6 py-4 border-t border-gray-200 bg-white sticky bottom-0">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500" style="font-family: 'Poppins', sans-serif;">
          <span class="font-medium text-gray-700">{{ filteredNotes.length }}</span> total notes • 
          Showing {{ (currentPage - 1) * 10 + 1 }} to {{ Math.min(currentPage * 10, filteredNotes.length) }} of {{ filteredNotes.length }}
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            style="font-family: 'Poppins', sans-serif;"
          >
            Previous
          </button>
          <span class="px-3 py-1 text-sm text-gray-700" style="font-family: 'Poppins', sans-serif;">
            Page {{ currentPage }} of {{ Math.ceil(filteredNotes.length / 10) }}
          </span>
          <button 
            @click="currentPage = Math.min(Math.ceil(filteredNotes.length / 10), currentPage + 1)"
            :disabled="currentPage === Math.ceil(filteredNotes.length / 10)"
            class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            style="font-family: 'Poppins', sans-serif;"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Note Detail Modal -->
    <div 
      v-if="selectedNote"
      class="fixed inset-0 z-50 overflow-y-auto"
    >
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="selectedNote = null"></div>
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <NoteDetailView
            :note="selectedNote"
            :can-edit-notes="canEditNotes"
            @close="selectedNote = null"
            @edit="handleEditNote"
            @delete="handleDeleteNote"
          />
        </div>
      </div>
    </div>

    <!-- Edit Note Modal -->
    <div 
      v-if="showEditNoteModal"
      class="fixed inset-0 z-50 overflow-y-auto"
    >
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="showEditNoteModal = false"></div>
        <div class="relative">
          <EnhancedNoteModal
            :visible="showEditNoteModal"
            :note="noteToEdit"
            :entity-type="entityType"
            :entity-id="entityId"
            :entity-name="entityName"
            :can-edit-notes="canEditNotes"
            :can-create-notes="canCreateNotes"
            @note-saved="handleNoteUpdated"
            @close="showEditNoteModal = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { Checkbox } from 'ant-design-vue'
import dayjs from 'dayjs'
import NoteDetailView from './NoteDetailView.vue'
import EnhancedNoteModal from './EnhancedNoteModal.vue'

export default {
  name: 'EntityNotesDrawerContent',
  components: {
    Checkbox,
    NoteDetailView,
    EnhancedNoteModal,
  },
  props: {
    entityType: {
      type: String,
      required: true,
    },
    entityId: {
      type: String,
      required: true,
    },
    entityName: {
      type: String,
      required: true,
    },
    canEditNotes: {
      type: Boolean,
      default: false,
    },
    canCreateNotes: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['note-created', 'update:note-count'],
  setup(props, { emit }) {
    const searchQuery = ref('')
    const selectedCategories = ref([])
    const selectedUsers = ref([])
    const selectedDate = ref('')
    const sortBy = ref('newest')
    const currentPage = ref(1)
    const selectedNote = ref(null)
    const showEditNoteModal = ref(false)
    const noteToEdit = ref(null)
    
    // Dropdown states
    const categoryDropdownOpen = ref(false)
    const userDropdownOpen = ref(false)
    const dateDropdownOpen = ref(false)

    const notes = ref([])
    const nextNoteId = ref(10000) // Start from 10000 for 5-digit IDs

    // Sample notes data
    const initializeSampleNotes = () => {
      const now = new Date()
      const sampleNotes = [
        {
          id: '10001',
          title: 'Insurance Coverage Assessment',
          description: 'Comprehensive assessment of current insurance coverage levels and recommendations for policy updates. This detailed analysis includes evaluation of coverage gaps, premium optimization strategies, and risk mitigation approaches to ensure adequate protection while maintaining cost-effectiveness.',
          category: 'General',
          createdBy: 'Mohsin Bheda',
          createdAt: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '1', name: 'coverage_assessment.pdf', type: 'pdf', size: '2.3 MB' },
            { id: '2', name: 'policy_recommendations.docx', type: 'docx', size: '1.1 MB' }
          ]
        },
        {
          id: '10002',
          title: 'Medical Examination Results',
          description: 'Latest medical examination results and health assessment for insurance underwriting purposes. The examination revealed excellent health indicators with no significant risk factors identified.',
          category: 'Medical',
          createdBy: 'Dr. Sarah Johnson',
          createdAt: new Date(now.getTime() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '3', name: 'medical_report.pdf', type: 'pdf', size: '3.2 MB' },
            { id: '4', name: 'lab_results.xlsx', type: 'xlsx', size: '1.8 MB' }
          ]
        },
        {
          id: '10003',
          title: 'Financial Statement Analysis',
          description: 'Detailed analysis of financial statements and risk assessment for premium calculation. This comprehensive review includes income verification, asset evaluation, debt-to-income ratio analysis, and creditworthiness assessment to determine appropriate coverage levels and premium rates.',
          category: 'Financial',
          createdBy: 'Emma Wilson',
          createdAt: new Date(now.getTime() - Math.random() * 21 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 21 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '5', name: 'financial_analysis.xlsx', type: 'xlsx', size: '2.1 MB' },
            { id: '6', name: 'credit_report.pdf', type: 'pdf', size: '1.5 MB' }
          ]
        },
        {
          id: '10004',
          title: 'Policy Review Meeting',
          description: 'Quarterly review of insurance policies and coverage adjustments for the upcoming period.',
          category: 'Administrative',
          createdBy: 'Sarah Johnson',
          createdAt: new Date(now.getTime() - Math.random() * 28 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 28 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '7', name: 'meeting_minutes.pdf', type: 'pdf', size: '4.2 MB' }
          ]
        },
        {
          id: '10005',
          title: 'Legal Documentation Review',
          description: 'Review of legal documents and compliance requirements for insurance coverage. This thorough examination ensures all regulatory requirements are met and identifies any potential legal risks or compliance issues that may affect coverage eligibility.',
          category: 'Legal',
          createdBy: 'James Anderson',
          createdAt: new Date(now.getTime() - Math.random() * 35 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 35 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '8', name: 'legal_docs.pdf', type: 'pdf', size: '3.8 MB' },
            { id: '9', name: 'compliance_checklist.pdf', type: 'pdf', size: '1.2 MB' }
          ]
        },
        {
          id: '10006',
          title: 'Claims Processing Update',
          description: 'Update on recent claims processing and settlement procedures.',
          category: 'General',
          createdBy: 'Lisa Martinez',
          createdAt: new Date(now.getTime() - Math.random() * 42 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 42 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '10', name: 'claims_report.pdf', type: 'pdf', size: '2.7 MB' }
          ]
        },
        {
          id: '10007',
          title: 'Risk Assessment Report',
          description: 'Comprehensive risk assessment and mitigation strategies for insurance portfolio. This detailed analysis evaluates various risk factors including market volatility, economic conditions, regulatory changes, and industry-specific challenges to develop robust risk management strategies.',
          category: 'Financial',
          createdBy: 'David Thompson',
          createdAt: new Date(now.getTime() - Math.random() * 49 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 49 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '11', name: 'risk_assessment.pdf', type: 'pdf', size: '5.1 MB' },
            { id: '12', name: 'mitigation_plan.docx', type: 'docx', size: '1.8 MB' }
          ]
        },
        {
          id: '10008',
          title: 'Customer Service Follow-up',
          description: 'Follow-up on customer inquiries and service quality improvements. This comprehensive review addresses customer feedback, identifies service gaps, and implements improvements to enhance overall customer satisfaction.',
          category: 'Administrative',
          createdBy: 'Jennifer Lee',
          createdAt: new Date(now.getTime() - Math.random() * 56 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 56 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '13', name: 'customer_feedback.xlsx', type: 'xlsx', size: '2.9 MB' }
          ]
        },
        {
          id: '10009',
          title: 'Policy Renewal Notice',
          description: 'Notice regarding upcoming policy renewal and premium adjustments.',
          category: 'General',
          createdBy: 'Robert Kim',
          createdAt: new Date(now.getTime() - Math.random() * 63 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 63 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '14', name: 'renewal_notice.pdf', type: 'pdf', size: '4.5 MB' }
          ]
        },
        {
          id: '10010',
          title: 'Medical Records Update',
          description: 'Update on medical records and health status for insurance underwriting. This comprehensive update includes recent medical examinations, laboratory results, specialist consultations, and ongoing treatment plans to ensure accurate risk assessment.',
          category: 'Medical',
          createdBy: 'Dr. Michael Chen',
          createdAt: new Date(now.getTime() - Math.random() * 70 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 70 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '15', name: 'medical_records.pdf', type: 'pdf', size: '3.7 MB' },
            { id: '16', name: 'health_assessment.pdf', type: 'pdf', size: '2.3 MB' }
          ]
        },
        {
          id: '10011',
          title: 'Compliance Audit Results',
          description: 'Results of compliance audit and recommendations for regulatory adherence.',
          category: 'Legal',
          createdBy: 'Maria Garcia',
          createdAt: new Date(now.getTime() - Math.random() * 77 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 77 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '17', name: 'audit_report.pdf', type: 'pdf', size: '6.2 MB' },
            { id: '18', name: 'compliance_recommendations.docx', type: 'docx', size: '1.9 MB' }
          ]
        },
        {
          id: '10012',
          title: 'Underwriting Decision',
          description: 'Final underwriting decision and coverage approval based on comprehensive risk assessment. This decision incorporates all available medical, financial, and legal information to determine appropriate coverage terms and conditions.',
          category: 'Administrative',
          createdBy: 'John Smith',
          createdAt: new Date(now.getTime() - Math.random() * 84 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(now.getTime() - Math.random() * 84 * 24 * 60 * 60 * 1000).toISOString(),
          entityType: props.entityType,
          entityId: props.entityId,
          entityName: props.entityName,
          attachments: [
            { id: '19', name: 'underwriting_decision.pdf', type: 'pdf', size: '2.1 MB' }
          ]
        }
      ]
      
      // Sort notes by date (newest first)
      sampleNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      
      notes.value = sampleNotes
      emitNoteCount()
    }

    // Computed properties
    const filteredNotes = computed(() => {
      let filtered = notes.value.filter(note => 
        note.entityType === props.entityType && 
        note.entityId === props.entityId
      )

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(note => 
          note.title.toLowerCase().includes(query) ||
          note.description.toLowerCase().includes(query) ||
          note.createdBy.toLowerCase().includes(query)
        )
      }

      // Category filter
      if (selectedCategories.value.length > 0) {
        filtered = filtered.filter(note => 
          selectedCategories.value.includes(note.category)
        )
      }

      // User filter
      if (selectedUsers.value.length > 0) {
        filtered = filtered.filter(note => 
          selectedUsers.value.includes(note.createdBy)
        )
      }

      // Date filter (simplified)
      if (selectedDate.value) {
        const now = dayjs()
        filtered = filtered.filter(note => {
          const noteDate = dayjs(note.createdAt)
          switch (selectedDate.value) {
            case 'Today':
              return noteDate.isSame(now, 'day')
            case 'Yesterday':
              return noteDate.isSame(now.subtract(1, 'day'), 'day')
            case 'Last 7 days':
              return noteDate.isAfter(now.subtract(7, 'day'))
            case 'Last 30 days':
              return noteDate.isAfter(now.subtract(30, 'day'))
            case 'Last 3 months':
              return noteDate.isAfter(now.subtract(3, 'month'))
            case 'Last year':
              return noteDate.isAfter(now.subtract(1, 'year'))
            default:
              return true
          }
        })
      }

      // Sort
      filtered.sort((a, b) => {
        if (sortBy.value === 'newest') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        } else if (sortBy.value === 'oldest') {
          return new Date(a.createdAt) - new Date(b.createdAt)
        } else if (sortBy.value === 'title') {
          return a.title.localeCompare(b.title)
        }
        return 0
      })

      return filtered
    })

    const paginatedNotes = computed(() => {
      const start = (currentPage.value - 1) * 10
      const end = start + 10
      return filteredNotes.value.slice(start, end)
    })

    const hasActiveFilters = computed(() => {
      return selectedCategories.value.length > 0 || 
             selectedUsers.value.length > 0 || 
             selectedDate.value !== ''
    })

    // Methods
    const emitNoteCount = () => {
      const filteredCount = notes.value.filter(note => 
        note.entityType === props.entityType && 
        note.entityId === props.entityId
      ).length
      console.log('Emitting note count:', filteredCount, 'for entity:', props.entityType, props.entityId)
      emit('update:note-count', filteredCount)
    }

    const addNewNote = (noteData) => {
      const newNote = {
        id: nextNoteId.value.toString(),
        title: noteData.title,
        description: noteData.description,
        category: noteData.category,
        createdBy: 'Current User', // You can replace this with actual user data
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        entityType: props.entityType,
        entityId: props.entityId,
        entityName: props.entityName,
        attachments: noteData.attachments || []
      }
      
      notes.value.unshift(newNote) // Add to beginning of list
      nextNoteId.value++ // Increment for next note
      emitNoteCount()
    }

    const deleteNote = (noteId) => {
      const index = notes.value.findIndex(note => note.id === noteId)
      if (index > -1) {
        notes.value.splice(index, 1)
        emitNoteCount()
      }
    }

    const toggleCategory = (category) => {
      const index = selectedCategories.value.indexOf(category)
      if (index > -1) {
        selectedCategories.value.splice(index, 1)
      } else {
        selectedCategories.value.push(category)
      }
    }

    const toggleUser = (user) => {
      const index = selectedUsers.value.indexOf(user)
      if (index > -1) {
        selectedUsers.value.splice(index, 1)
      } else {
        selectedUsers.value.push(user)
      }
    }

    const selectDate = (date) => {
      selectedDate.value = selectedDate.value === date ? '' : date
    }

    const clearAllFilters = () => {
      selectedCategories.value = []
      selectedUsers.value = []
      selectedDate.value = ''
    }

    const viewNoteDetail = (note) => {
      selectedNote.value = note
    }

    const handleEditNote = (note) => {
      noteToEdit.value = note
      showEditNoteModal.value = true
      selectedNote.value = null // Close the detail view
    }

    const handleDeleteNote = (noteId) => {
      deleteNote(noteId)
      selectedNote.value = null
    }

    const handleNoteUpdated = (updatedNoteData) => {
      if (noteToEdit.value) {
        // Update the existing note with new data
        const noteIndex = notes.value.findIndex(note => note.id === noteToEdit.value.id)
        if (noteIndex > -1) {
          notes.value[noteIndex] = {
            ...notes.value[noteIndex],
            title: updatedNoteData.title,
            description: updatedNoteData.description,
            category: updatedNoteData.category,
            attachments: updatedNoteData.attachments || [],
            updatedAt: new Date().toISOString()
          }
        }
      }
      showEditNoteModal.value = false
      noteToEdit.value = null
      emitNoteCount()
    }

    const getCategoryDotClass = (category) => {
      const classes = {
        'General': 'bg-gray-400',
        'Medical': 'bg-pink-500',
        'Financial': 'bg-orange-500',
        'Legal': 'bg-green-500',
        'Administrative': 'bg-blue-500'
      }
      return classes[category] || 'bg-gray-400'
    }

    const getCategoryTagClass = (category) => {
      const classes = {
        'General': 'bg-gray-50 border border-gray-300 text-gray-900',
        'Medical': 'bg-pink-50 border border-pink-300 text-pink-600',
        'Financial': 'bg-orange-50 border border-orange-300 text-orange-600',
        'Legal': 'bg-green-50 border border-green-300 text-green-600',
        'Administrative': 'bg-blue-50 border border-blue-300 text-blue-600'
      }
      return classes[category] || 'bg-gray-50 border border-gray-300 text-gray-900'
    }

    const getInitials = (name) => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const formatDate = (dateString) => {
      return dayjs(dateString).format('YYYY-MM-DD')
    }

    // Watchers
    watch([searchQuery, selectedCategories, selectedUsers, selectedDate, sortBy], () => {
      currentPage.value = 1
    })

    // Lifecycle
    onMounted(() => {
      initializeSampleNotes()
    })

    // Expose methods for parent component
    const expose = {
      addNewNote,
      deleteNote,
    }

    return {
      searchQuery,
      selectedCategories,
      selectedUsers,
      selectedDate,
      sortBy,
      currentPage,
      selectedNote,
      showEditNoteModal,
      noteToEdit,
      categoryDropdownOpen,
      userDropdownOpen,
      dateDropdownOpen,
      notes,
      filteredNotes,
      paginatedNotes,
      hasActiveFilters,
      toggleCategory,
      toggleUser,
      selectDate,
      clearAllFilters,
      viewNoteDetail,
      handleEditNote,
      handleDeleteNote,
      handleNoteUpdated,
      getCategoryDotClass,
      getCategoryTagClass,
      getInitials,
      formatDate,
      ...expose,
    }
  },
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>