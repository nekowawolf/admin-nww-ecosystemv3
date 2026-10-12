"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState, useRef } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'
import { VscFileMedia } from 'react-icons/vsc'
import { useUploadImage } from '@/hooks/images-resources/useAddImage'
import { toast } from 'sonner'

export default function AddImagesForm() {
  useAuthGuard()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null)
  
  const { isUploading, uploadProgress, uploadImageFile } = useUploadImage()

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024  // 5MB
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')

    if (!isImage && !isVideo) {
      toast.error('Please select a valid image or video file')
      return
    }

    if (isImage && file.size > MAX_IMAGE_SIZE) {
      toast.error('Image size must be less than 5MB')
      return
    }

    if (isVideo && file.size > MAX_VIDEO_SIZE) {
      toast.error('Video size must be less than 50MB')
      return
    }

    setSelectedFile(file)
    setFileType(isImage ? 'image' : 'video')

    if (isImage) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const clearSelection = () => {
    if (fileType === 'video' && preview) {
      URL.revokeObjectURL(preview)
    }
    setSelectedFile(null)
    setPreview(null)
    setFileType(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    const mediaUrl = await uploadImageFile(selectedFile)
    if (mediaUrl) {
      toast.success(`Media uploaded successfully! URL: ${mediaUrl}`)
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
      <div className="text-center sm:text-left sm:w-5/6 sm:mx-auto">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Upload Media
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Upload images and videos to Cloudflare CDN
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-[var(--fill-color)] border border-border-divider rounded-xl p-6 shadow-lg w-full sm:w-5/6 mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Upload New Media</h3>
          
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
              accept="image/*,video/*"
              className="hidden"
              disabled={isUploading}
            />
            
            {!selectedFile ? (
              <div className="space-y-3">
                <div className="flex justify-center gap-3">
                  <VscFileMedia className="w-10 h-10 text-muted mx-auto" />
                </div>
                <div>
                  <p className="text-primary font-medium">Click to upload or drag and drop</p>
                  <p className="text-secondary text-sm mt-1">Images (PNG, JPG, GIF up to 5MB) • Videos (MP4, MOV up to 50MB)</p>
                  <p className="text-secondary text-xs mt-1">Images are automatically converted to WebP</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  {fileType === 'image' && preview ? (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-16 h-16 object-cover rounded-lg border border-border-divider"
                    />
                  ) : fileType === 'video' && preview ? (
                    <video 
                      src={preview}
                      className="w-16 h-16 object-cover rounded-lg border border-border-divider"
                      muted
                    />
                  ) : (
                    <FiUpload className="w-12 h-12 text-muted" />
                  )}
                  <div className="text-left">
                    <p className="text-primary font-medium">{selectedFile.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-secondary text-sm">{formatFileSize(selectedFile.size)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        fileType === 'image' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {fileType}
                      </span>
                    </div>
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
                Upload {fileType === 'video' ? 'Video' : 'Image'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}