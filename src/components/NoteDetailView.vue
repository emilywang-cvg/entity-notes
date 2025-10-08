<template>
  <div class="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900" style="font-family: 'Poppins', sans-serif;">
        Note Details
      </h2>
      <button
        @click="$emit('close')"
        class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="px-6 py-6">
      <div class="space-y-6">
        <!-- Title and ID -->
        <div>
          <h1 class="text-lg font-semibold text-gray-900 mb-1" style="font-family: 'Poppins', sans-serif;">
            {{ note.title }}
          </h1>
          <p class="text-sm text-gray-500" style="font-family: 'Poppins', sans-serif;">
            {{ note.id }}
          </p>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Created by -->
          <div>
            <div class="mb-1">
              <span class="text-sm text-gray-500" style="font-family: 'Poppins', sans-serif;">Created by</span>
            </div>
            <p class="text-sm text-gray-900" style="font-family: 'Poppins', sans-serif;">{{ note.createdBy }}</p>
          </div>

          <!-- Created at -->
          <div>
            <div class="mb-1">
              <span class="text-sm text-gray-500" style="font-family: 'Poppins', sans-serif;">Created at</span>
            </div>
            <p class="text-sm text-gray-900" style="font-family: 'Poppins', sans-serif;">{{ formatDate(note.createdAt) }}</p>
          </div>

          <!-- Last updated at -->
          <div>
            <div class="mb-1">
              <span class="text-sm text-gray-500" style="font-family: 'Poppins', sans-serif;">Last updated at</span>
            </div>
            <p class="text-sm text-gray-900" style="font-family: 'Poppins', sans-serif;">{{ formatDate(note.updatedAt) }}</p>
          </div>

          <!-- Category -->
          <div>
            <div class="mb-1">
              <span class="text-sm text-gray-500" style="font-family: 'Poppins', sans-serif;">Category</span>
            </div>
            <div 
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-normal border"
              :class="getCategoryTagClass(note.category)"
              style="font-family: 'Poppins', sans-serif;"
            >
              {{ note.category }}
            </div>
          </div>
        </div>

        <!-- Description -->
        <div>
          <div class="mb-1">
            <span class="text-sm text-gray-500" style="font-family: 'Poppins', sans-serif;">Description</span>
          </div>
          <p class="text-sm text-gray-900 leading-relaxed" style="font-family: 'Poppins', sans-serif;">
            {{ note.description }}
          </p>
        </div>

        <!-- Attachments -->
        <div v-if="note.attachments && note.attachments.length > 0">
          <div class="mb-1">
            <span class="text-sm text-gray-500" style="font-family: 'Poppins', sans-serif;">Attachments</span>
          </div>
          <div class="space-y-2">
            <div
              v-for="attachment in note.attachments"
              :key="attachment.id"
              class="flex items-center justify-between py-1"
            >
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
                <span class="text-sm text-gray-900" style="font-family: 'Poppins', sans-serif;">
                  {{ attachment.name }}
                </span>
              </div>
              <button 
                @click="downloadAttachment(attachment)"
                class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                style="font-family: 'Poppins', sans-serif;"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="flex items-center justify-end gap-2 px-6 py-6 border-t border-gray-200">
      <button
        @click="handleDelete"
        class="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-normal hover:bg-red-50 transition-colors"
        style="font-family: 'Poppins', sans-serif;"
      >
        Delete
      </button>
      <button
        v-if="canEditNotes"
        @click="handleEdit"
        class="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg text-sm font-normal hover:bg-gray-50 transition-colors"
        style="font-family: 'Poppins', sans-serif;"
      >
        Edit Note
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import dayjs from 'dayjs'

export default {
  name: 'NoteDetailView',
  props: {
    note: {
      type: Object,
      required: true,
    },
    canEditNotes: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'edit', 'delete'],
  setup(props, { emit }) {
    const formatDate = (dateString) => {
      return dayjs(dateString).format('YYYY-MM-DD')
    }

    const getCategoryTagClass = (category) => {
      const classes = {
        'General': 'bg-gray-50 border-gray-300 text-gray-900',
        'Medical': 'bg-pink-50 border-pink-300 text-pink-600',
        'Financial': 'bg-orange-50 border-orange-300 text-orange-600',
        'Legal': 'bg-green-50 border-green-300 text-green-600',
        'Administrative': 'bg-blue-50 border-blue-300 text-blue-600'
      }
      return classes[category] || 'bg-gray-50 border-gray-300 text-gray-900'
    }

    const downloadAttachment = (attachment) => {
      // In a real app, this would trigger a download
      console.log('Downloading attachment:', attachment)
      alert(`Downloading ${attachment.name}`)
    }

    const handleEdit = () => {
      emit('edit', props.note)
    }

    const handleDelete = () => {
      if (confirm('Are you sure you want to delete this note?')) {
        emit('delete', props.note.id)
      }
    }

    return {
      formatDate,
      getCategoryTagClass,
      downloadAttachment,
      handleEdit,
      handleDelete,
    }
  },
}
</script>