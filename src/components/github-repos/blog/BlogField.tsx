import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

export const blogInputClass = 'w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600'
const buttonBaseClass = 'inline-flex items-center justify-center gap-2 rounded-lg border border-border-divider px-4 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
export const blogButtonClass = `${buttonBaseClass} text-secondary hover:bg-[var(--button-hover)]`
export const blogDangerButtonClass = `${buttonBaseClass} text-red-600 hover:bg-red-500/10`

type BlogFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  icon?: IconType
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'required' | 'placeholder' | 'maxLength' | 'pattern'>

export default function BlogField({ label, value, onChange, multiline, icon: Icon, type, pattern, ...props }: BlogFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-secondary">
      <span className="font-medium">{label}</span>
      {multiline ? (
        <textarea {...props} rows={4} value={value} onChange={event => onChange(event.target.value)} className={blogInputClass} />
      ) : (
        <span className="relative">
          {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />}
          <input {...props} type={type} pattern={pattern} value={value} onChange={event => onChange(event.target.value)} className={Icon ? blogInputClass.replace('px-4', 'pl-10 pr-4') : blogInputClass} />
        </span>
      )}
    </label>
  )
}