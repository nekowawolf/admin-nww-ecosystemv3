"use client"

import { useState, useEffect, useCallback } from 'react'
import { MessageData, MessageItem } from '@/types/messages'
import { getMessage, updateMessage } from '@/services/messages/messagesService'
import MessagesTable from './MessagesTable'
import MessageForm from './MessageForm'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { toast } from 'sonner'
import { FaPlus } from 'react-icons/fa'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

export default function MessagesManager() {
  useAuthGuard()

  const [messageData, setMessageData] = useState<MessageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list')
  const [selectedItem, setSelectedItem] = useState<MessageItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMessage()
      setMessageData(data || null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch messages')
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const messageItems: MessageItem[] = []
  if (messageData) {
    for (let i = 1; i <= 10; i++) {
      const key = `text_${i}` as keyof MessageData
      const content = messageData[key] as string
      if (content) {
        messageItems.push({ key, content })
      }
    }
  }

  const handleAddSubmit = async (content: string) => {
    setIsSubmitting(true)
    try {
      let newKey = ''
      const currentData = messageData || { text_1: '', text_2: '', text_3: '', text_4: '', text_5: '', text_6: '', text_7: '', text_8: '', text_9: '', text_10: '' } as MessageData;
      
      for (let i = 1; i <= 10; i++) {
        const key = `text_${i}` as keyof MessageData
        if (!currentData[key]) {
          newKey = key
          break
        }
      }

      if (!newKey) {
        throw new Error('Maximum of 10 messages reached.')
      }

      const updatedData = { ...currentData, [newKey]: content }
      
      const payload: MessageData = {
        text_1: updatedData.text_1 || '',
        text_2: updatedData.text_2 || '',
        text_3: updatedData.text_3 || '',
        text_4: updatedData.text_4 || '',
        text_5: updatedData.text_5 || '',
        text_6: updatedData.text_6 || '',
        text_7: updatedData.text_7 || '',
        text_8: updatedData.text_8 || '',
        text_9: updatedData.text_9 || '',
        text_10: updatedData.text_10 || '',
      }

      if (updatedData._id) {
          payload._id = updatedData._id
      }

      await updateMessage(payload)
      toast.success('Message added successfully')
      fetchMessages()
      setView('list')
    } catch (err: any) {
      toast.error(err.message || 'Failed to add message')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditSubmit = async (content: string) => {
    if (!selectedItem) return
    setIsSubmitting(true)
    try {
      const currentData = messageData || {} as MessageData;
      const updatedData = { ...currentData, [selectedItem.key]: content }
      
      const payload: MessageData = {
        text_1: updatedData.text_1 || '',
        text_2: updatedData.text_2 || '',
        text_3: updatedData.text_3 || '',
        text_4: updatedData.text_4 || '',
        text_5: updatedData.text_5 || '',
        text_6: updatedData.text_6 || '',
        text_7: updatedData.text_7 || '',
        text_8: updatedData.text_8 || '',
        text_9: updatedData.text_9 || '',
        text_10: updatedData.text_10 || '',
      }

      if (updatedData._id) {
          payload._id = updatedData._id
      }

      await updateMessage(payload)
      toast.success('Message updated successfully')
      fetchMessages()
      setView('list')
      setSelectedItem(null)
    } catch (err: any) {
      toast.error(err.message || 'Failed to update message')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (key: string) => {
    try {
      const currentData = messageData || {} as MessageData;
      const updatedData = { ...currentData, [key]: '' }
      
      const payload: MessageData = {
        text_1: updatedData.text_1 || '',
        text_2: updatedData.text_2 || '',
        text_3: updatedData.text_3 || '',
        text_4: updatedData.text_4 || '',
        text_5: updatedData.text_5 || '',
        text_6: updatedData.text_6 || '',
        text_7: updatedData.text_7 || '',
        text_8: updatedData.text_8 || '',
        text_9: updatedData.text_9 || '',
        text_10: updatedData.text_10 || '',
      }

      if (updatedData._id) {
          payload._id = updatedData._id
      }

      await updateMessage(payload)
      toast.success('Message deleted successfully')
      setMessageData(updatedData)
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete message')
    }
  }

  const handleEditClick = (item: MessageItem) => {
    setSelectedItem(item)
    setView('edit')
  }

  const handleCancelForm = () => {
    setView('list')
    setSelectedItem(null)
  }

  return (
    <div className="w-full mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-primary">Admin Messages</h2>
          <p className="text-sm text-secondary">Manage your system messages (up to 10)</p>
        </div>
        {view === 'list' && (
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => setView('add')}
              disabled={messageItems.length >= 10}
              className={`text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                messageItems.length >= 10 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              }`}
            >
              <FaPlus size={12} /> Add Message
            </button>
          </div>
        )}
      </div>

      {view === 'list' && (
        <>
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner variant="circle" size={40} className="text-blue-500" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-10 w-full">
              <div className="text-red-500 text-center py-4 px-6 bg-red-500/10 rounded-lg border border-red-500/20 w-full max-w-md mx-auto">
                {error}
              </div>
            </div>
          ) : (
            <MessagesTable data={messageItems} onEdit={handleEditClick} onDelete={handleDelete} />
          )}
        </>
      )}

      {view === 'add' && (
        <MessageForm
          onSubmit={handleAddSubmit}
          onCancel={handleCancelForm}
          isSubmitting={isSubmitting}
        />
      )}

      {view === 'edit' && selectedItem && (
        <MessageForm
          initialData={selectedItem.content}
          onSubmit={handleEditSubmit}
          onCancel={handleCancelForm}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}