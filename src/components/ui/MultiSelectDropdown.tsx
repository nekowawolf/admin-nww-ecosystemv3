import { useRef, useEffect, useState } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { SearchInput } from "@/components/ui/SearchInput";

interface MultiSelectDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

export function MultiSelectDropdown({ options, selected, onChange, placeholder = "Select options", required = false }: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selected);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTempSelected(selected);
    } else {
      setSearchTerm('');
    }
  }, [isOpen, selected]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckbox = (value: string, checked: boolean) => {
    setTempSelected((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  };

  const applyFilters = () => {
    onChange(tempSelected);
    setIsOpen(false);
  };

  const clearAndClose = () => {
    onChange([]);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full text-left card-color2 border border-border-divider rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-between"
      >
        <span className={selected.length > 0 ? "text-primary truncate mr-4" : "text-muted"}>
          {selected.length > 0 ? selected.join(', ') : placeholder}
        </span>
        <FiChevronDown className={`h-4 w-4 text-muted transition-transform duration-200 ${isOpen ? 'transform rotate-0' : 'transform rotate-180'}`} />
      </button>

      {/* Hidden input for native HTML5 form validation */}
      <input 
        type="text"
        value={selected.length > 0 ? "filled" : ""}
        onChange={() => {}}
        required={required}
        className="opacity-0 absolute inset-0 w-full h-full z-[-1]"
      />

      <div className={`z-10 absolute top-full left-0 right-0 mt-1 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
        
        <div className="p-2 border-b border-border-divider dropdown-bg">
          <SearchInput
            placeholder="Search..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="px-3 py-2 text-sm"
            clearButtonClassName="right-2"
            iconClassName="w-4 h-4"
            wrapperClassName="max-w-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          <ul className="py-2 text-sm text-primary">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option}>
                  <Checkbox 
                    label={option} 
                    checked={tempSelected.includes(option)} 
                    onChange={(c) => handleCheckbox(option, c)} 
                  />
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-muted text-center text-sm">No options found.</li>
            )}
          </ul>
        </div>

        <div className="p-3 flex gap-2 border-t border-border-divider dropdown-bg">
          <button
            type="button"
            onClick={clearAndClose}
            className="cursor-pointer flex-1 px-3 py-2 rounded-lg text-xs font-medium text-primary hover:hover-bg transition-colors border border-border-divider"
            disabled={tempSelected.length === 0 && selected.length === 0}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={applyFilters}
            className="cursor-pointer flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string | React.ReactNode, checked: boolean, onChange: (checked: boolean) => void }) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group select-none px-4 py-2 hover:hover-bg w-full text-left ${checked ? 'hover-bg-accent text-accent' : ''}`}>
      <div className={`
          w-4 h-4 rounded-sm border flex items-center justify-center transition-all duration-200 shrink-0
          ${checked ? 'bg-blue-500 border-blue-500 text-white' : 'border-border-divider group-hover:border-blue-500'}
      `}>
          {checked && <FiCheck className="w-3 h-3" />}
      </div>
      <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm">
          {label}
      </span>
    </label>
  );
}