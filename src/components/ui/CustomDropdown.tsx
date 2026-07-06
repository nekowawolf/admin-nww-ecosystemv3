import { useState, useRef, useEffect } from 'react'
import { IoIosArrowUp } from "react-icons/io"

export interface DropdownOption {
  value: string
  label: string
}

export interface CustomDropdownProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  required?: boolean
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        id={`${id}-button`}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full text-left card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-between"
      >
        <span className={value ? "text-primary" : "text-muted"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IoIosArrowUp 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-0' : 'transform rotate-180'
          }`}
        />
      </button>

      <div 
        id={id}
        className={`z-10 absolute top-full left-0 right-0 mt-1 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider overflow-hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          <ul className="py-2 text-sm text-primary" aria-labelledby={`${id}-button`}>
            {options.map(option => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`cursor-pointer block w-full text-left px-4 py-2 hover:hover-bg ${
                    value === option.value ? 'hover-bg-accent text-accent' : ''
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />
    </div>
  )
}
