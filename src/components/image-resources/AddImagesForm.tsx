"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState, useRef } from 'react'
import { FiUpload, FiImage, FiX } from 'react-icons/fi'
import { useUploadImage } from '@/hooks/images-resources/useAddImage'
import { toast } from 'sonner'

export default function AddImagesForm() {
  useAuthGuard()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const { isUploading, uploadProgress, uploadImageFile } = useUploadImage()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB')
        return
      }

      setSelectedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    const imageUrl = await uploadImageFile(selectedFile)
    if (imageUrl) {
      toast.success(`Image uploaded successfully! URL: ${imageUrl}`)
      clearSelection()
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Upload Image
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Upload images to GitHub CDN
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 shadow-lg w-full sm:w-5/6 mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Upload New Image</h3>
          
          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed border-border-divider rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 hover:border-blue-500 ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />
            
            {!selectedFile ? (
              <div className="space-y-3">
                <FiUpload className="w-12 h-12 text-muted mx-auto" />
                <div>
                  <p className="text-primary font-medium">Click to upload or drag and drop</p>
                  <p className="text-secondary text-sm mt-1">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={imagePreview!} 
                    alt="Preview" 
                    className="w-16 h-16 object-cover rounded-lg border border-border-divider"
                  />
                  <div className="text-left">
                    <p className="text-primary font-medium">{selectedFile.name}</p>
                    <p className="text-secondary text-sm">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    clearSelection()
                  }}
                  className="cursor-pointer text-red-500 hover:text-red-700 text-sm font-medium flex items-center justify-center mx-auto"
                >
                  <FiX className="w-4 h-4 mr-1" />
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-secondary mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {selectedFile && !isUploading && (
            <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-border-divider">
              <button
                type="button"
                onClick={clearSelection}
                className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
              >
                <FiUpload className="w-4 h-4 mr-2" />
                Upload Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}