import { useState, useEffect, useRef } from 'react'
import { FiLoader } from 'react-icons/fi'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { LiaTimesCircleSolid } from 'react-icons/lia'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

interface ValidatedUrlInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon?: React.ReactNode;
  fetchUrls: () => Promise<string[]>;
  onValidationChange: (exists: boolean | null) => void;
  errorMessage?: string;
  successMessage?: string;
}

export function ValidatedUrlInput({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  icon,
  fetchUrls,
  onValidationChange,
  errorMessage = "This URL is already listed.",
  successMessage = "This URL is not listed yet."
}: ValidatedUrlInputProps) {
  const [existingUrls, setExistingUrls] = useState<string[]>([])
  const [isCheckingUrl, setIsCheckingUrl] = useState(false)
  const [urlExists, setUrlExists] = useState<boolean | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true;
    const loadUrls = async () => {
      try {
        const urls = await fetchUrls()
        if (mounted) {
          setExistingUrls(urls.map(u => (u || '').toLowerCase().replace(/\/$/, '')))
        }
      } catch (err) {
        console.error("Failed to load existing urls for validation", err)
      }
    }
    loadUrls()
    
    return () => {
      mounted = false;
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setShowTooltip(false)
    if (!value) {
      setUrlExists(null)
      setIsCheckingUrl(false)
      onValidationChange(null)
      return
    }

    setIsCheckingUrl(true)
    const timer = setTimeout(() => {
      const cleanUrl = value.toLowerCase().replace(/\/$/, '')
      const exists = existingUrls.includes(cleanUrl)
      setUrlExists(exists)
      setIsCheckingUrl(false)
      onValidationChange(exists)
    }, 600)

    return () => clearTimeout(timer)
  }, [value, existingUrls, onValidationChange])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="text-secondary text-sm font-medium" htmlFor={id}>
          {label}
        </label>
        {isCheckingUrl && <FiLoader className="w-3.5 h-3.5 text-blue-500 animate-spin" />}
        {!isCheckingUrl && urlExists !== null && (
          <div ref={tooltipRef} className="flex items-center gap-1.5 relative">
            {urlExists ? (
              <LiaTimesCircleSolid className="w-[17px] h-[17px] text-red-500" />
            ) : (
              <FaRegCircleCheck className="w-3.5 h-3.5 text-green-500" />
            )}
            <button 
              type="button" 
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-secondary/50 hover:text-secondary cursor-pointer transition-colors outline-none"
            >
              <AiOutlineExclamationCircle className="w-4 h-4" />
            </button>
            
            {showTooltip && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-max bg-[var(--fill-color)] border border-border-color px-3 py-2 rounded-lg shadow-lg z-50 text-xs font-medium text-primary animate-in fade-in zoom-in duration-200">
                {urlExists ? errorMessage : successMessage}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4 flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          type="url"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full card-color2 border border-border-divider rounded-lg ${icon ? 'pl-10' : 'px-4'} pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600`}
        />
      </div>
    </div>
  )
}