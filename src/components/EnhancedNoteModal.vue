<template>
  <div class="bg-white rounded-lg shadow-lg w-[480px] mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900" style="font-family: 'Poppins', sans-serif;">
        {{ note ? 'Edit Note' : 'Create Note' }}
      </h2>
      <button
        @click="handleCancel"
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
        <!-- Title Field -->
        <div>
          <div class="flex items-center gap-1 mb-2">
            <span class="text-red-500 text-sm" style="font-family: 'Poppins', sans-serif;">*</span>
            <label class="text-sm text-gray-600" style="font-family: 'Poppins', sans-serif;">Title</label>
          </div>
          <Input
            v-model:value="formData.title"
            placeholder="Input"
            :status="errors.title ? 'error' : ''"
            style="font-family: 'Poppins', sans-serif;"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
        </div>

        <!-- Description Field -->
        <div>
          <div class="flex items-center gap-1 mb-2">
            <span class="text-red-500 text-sm" style="font-family: 'Poppins', sans-serif;">*</span>
            <label class="text-sm text-gray-600" style="font-family: 'Poppins', sans-serif;">Description</label>
          </div>
          <textarea
            v-model="formData.description"
            placeholder="Textarea"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm transition-all duration-200"
            style="font-family: 'Poppins', sans-serif; height: 96px; border-width: 1px;"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        </div>

        <!-- Category Field -->
        <div>
          <div class="flex items-center gap-1 mb-2">
            <span class="text-red-500 text-sm" style="font-family: 'Poppins', sans-serif;">*</span>
            <label class="text-sm text-gray-600" style="font-family: 'Poppins', sans-serif;">Category</label>
          </div>
          <a-select
            v-model:value="formData.category"
            placeholder="Select category"
            class="w-full"
            :status="errors.category ? 'error' : ''"
            size="middle"
          >
            <a-select-option value="General">General</a-select-option>
            <a-select-option value="Medical">Medical</a-select-option>
            <a-select-option value="Financial">Financial</a-select-option>
            <a-select-option value="Legal">Legal</a-select-option>
            <a-select-option value="Administrative">Administrative</a-select-option>
          </a-select>
          <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
        </div>

        <!-- Attachments Field -->
        <div>
          <label class="text-sm text-gray-600 mb-2 block" style="font-family: 'Poppins', sans-serif;">
            Attachments
          </label>
          
          <Upload
            v-model:file-list="uploadedFiles"
            :before-upload="handleFileSelect"
            :on-remove="handleFileRemove"
            multiple
            :show-upload-list="true"
            :max-count="10"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
          >
            <button
              class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style="font-family: 'Poppins', sans-serif;"
            >
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">
                Upload
              </span>
            </button>
          </Upload>
          
          <p class="text-sm text-gray-500 mt-1" style="font-family: 'Poppins', sans-serif;">
            Support: PDF, Word, Excel, Images (Max 15MB per file)
          </p>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="flex items-center justify-end gap-2 px-6 py-6 border-t border-gray-200">
      <button
        @click="handleCancel"
        class="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg text-sm font-normal hover:bg-gray-50 transition-colors"
        style="font-family: 'Poppins', sans-serif;"
      >
        Cancel
      </button>
      <button
        @click="handleSubmit"
        :disabled="isSubmitting"
        class="px-4 py-2 text-white rounded-lg text-sm font-normal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        style="font-family: 'Poppins', sans-serif; background-color: #004299;"
      >
        {{ isSubmitting ? (note ? 'Updating...' : 'Creating...') : (note ? 'Update Note' : 'Create Note') }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'
import { Input, Upload } from 'ant-design-vue'

export default {
  name: 'EnhancedNoteModal',
  components: {
    Input,
    Upload,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    note: {
      type: Object,
      default: null,
    },
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
  emits: ['note-saved', 'close'],
  setup(props, { emit }) {
    const fileInput = ref(null)
    const isSubmitting = ref(false)
    const uploadedFiles = ref([])

    const formData = reactive({
      title: '',
      description: '',
      category: '',
    })

    const errors = reactive({
      title: '',
      description: '',
      category: '',
    })

    // Watch for note prop changes to populate form when editing
    watch(() => props.note, (newNote) => {
      if (newNote) {
        formData.title = newNote.title || ''
        formData.description = newNote.description || ''
        formData.category = newNote.category || ''
        uploadedFiles.value = newNote.attachments ? [...newNote.attachments] : []
      } else {
        // Reset form for new note
        formData.title = ''
        formData.description = ''
        formData.category = ''
        uploadedFiles.value = []
      }
    }, { immediate: true })

    // Validation
    const validateForm = () => {
      let isValid = true
      
      // Clear previous errors
      errors.title = ''
      errors.description = ''
      errors.category = ''

      // Title validation
      if (!formData.title.trim()) {
        errors.title = 'Title is required'
        isValid = false
      }

      // Description validation
      if (!formData.description.trim()) {
        errors.description = 'Description is required'
        isValid = false
      }

      // Category validation
      if (!formData.category) {
        errors.category = 'Category is required'
        isValid = false
      }

      return isValid
    }

    // File handling
    const validateFile = (file) => {
      const allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif']
      const fileExtension = file.name.split('.').pop().toLowerCase()
      
      if (!allowedTypes.includes(fileExtension)) {
        return `File type .${fileExtension} is not supported. Please upload PDF, Word, Excel, or Image files.`
      }
      
      const isLt15M = file.size / 1024 / 1024 < 15
      if (!isLt15M) {
        return 'File must be smaller than 15MB'
      }
      
      return null
    }

    const handleFileSelect = (file) => {
      const error = validateFile(file)
      if (error) {
        alert(error)
        return false // Prevent upload
      }
      
      const fileSize = (file.size / 1024 / 1024).toFixed(1) + ' MB'
      const fileType = file.name.split('.').pop().toLowerCase()
      
      // Add file info to the file object for Ant Design Upload
      file.id = Math.random().toString(36).substr(2, 9)
      file.size = fileSize
      file.type = fileType
      file.status = 'done'
      
      return false // Prevent actual upload, we handle it manually
    }

    const handleFileRemove = (file) => {
      const index = uploadedFiles.value.findIndex(f => f.uid === file.uid)
      if (index > -1) {
        uploadedFiles.value.splice(index, 1)
      }
    }

    // Form submission
    const handleSubmit = async () => {
      if (!validateForm()) {
        return
      }

      isSubmitting.value = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const noteData = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          attachments: uploadedFiles.value.map(file => ({
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
          })),
        }

        emit('note-saved', noteData)
        
        // Reset form
        formData.title = ''
        formData.description = ''
        formData.category = ''
        uploadedFiles.value = []
        
      } catch (error) {
        console.error('Error creating note:', error)
        alert('Failed to create note. Please try again.')
      } finally {
        isSubmitting.value = false
      }
    }

    const handleCancel = () => {
      // Reset form
      formData.title = ''
      formData.description = ''
      formData.category = ''
      uploadedFiles.value = []
      
      // Clear errors
      errors.title = ''
      errors.description = ''
      errors.category = ''
      
      emit('close')
    }

    return {
      fileInput,
      isSubmitting,
      uploadedFiles,
      formData,
      errors,
      handleFileSelect,
      handleFileRemove,
      handleSubmit,
      handleCancel,
    }
  },
}
</script>