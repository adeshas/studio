"use client"

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    setError('')
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload/image', { method: 'POST', body: form })
      if (!res.ok) throw new Error(await res.text())
      const { url } = await res.json()
      onChange(url)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}

      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="upload preview" className="h-28 w-28 object-cover rounded-lg border" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/60 transition-colors"
        >
          <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {uploading ? 'Uploading…' : 'Drop file or click to upload'}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
