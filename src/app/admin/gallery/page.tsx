"use client"

import { useEffect, useRef, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ChevronUp, ChevronDown, Trash2, ImagePlus, Video, X } from 'lucide-react'
import { addGalleryItem, deleteGalleryItem, moveGalleryItem } from './actions'
import type { GalleryItem } from '@/db/schema'

const STREAM_HOST = `https://${process.env.NEXT_PUBLIC_STREAM_SUBDOMAIN ?? 'customer-evsgrse8zm7f6r0v'}.cloudflarestream.com`

export default function ManageGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [imageModal, setImageModal] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const [imageForm, setImageForm] = useState({ src: '', alt: '', hint: '' })
  const [imageUploading, setImageUploading] = useState(false)

  const [videoForm, setVideoForm] = useState({ alt: '', hint: '' })
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoUploading, setVideoUploading] = useState(false)
  const [videoStreamId, setVideoStreamId] = useState('')
  const videoInputRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch('/api/admin/gallery')
    setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload/image', { method: 'POST', body: fd })
      const { url } = await res.json()
      setImageForm(f => ({ ...f, src: url }))
    } finally {
      setImageUploading(false)
    }
  }

  async function handleVideoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setVideoUploading(true)
    setVideoProgress(0)
    setVideoStreamId('')

    try {
      // Step 1: get a direct upload URL from Cloudflare Stream
      const initRes = await fetch('/api/upload/video/init', { method: 'POST' })
      const { uploadUrl, streamId } = await initRes.json()

      // Step 2: upload directly to Cloudflare using tus
      const { Upload } = await import('tus-js-client')
      await new Promise<void>((resolve, reject) => {
        const upload = new Upload(file, {
          endpoint: uploadUrl,
          retryDelays: [0, 1000, 3000],
          onProgress(bytes, total) {
            setVideoProgress(Math.round((bytes / total) * 100))
          },
          onSuccess() { resolve() },
          onError(err) { reject(err) },
        })
        upload.start()
      })

      setVideoStreamId(streamId)
    } catch (err) {
      console.error(err)
      alert('Video upload failed. Please try again.')
    } finally {
      setVideoUploading(false)
    }
  }

  function saveImage() {
    if (!imageForm.src) return
    startTransition(async () => {
      await addGalleryItem({ type: 'image', src: imageForm.src, alt: imageForm.alt, hint: imageForm.hint, sortOrder: items.length })
      setImageModal(false)
      setImageForm({ src: '', alt: '', hint: '' })
      load()
    })
  }

  function saveVideo() {
    if (!videoStreamId) return
    startTransition(async () => {
      const src = `${STREAM_HOST}/${videoStreamId}/manifest/video.m3u8`
      await addGalleryItem({ type: 'video', src, streamId: videoStreamId, alt: videoForm.alt, hint: videoForm.hint, sortOrder: items.length })
      setVideoModal(false)
      setVideoForm({ alt: '', hint: '' })
      setVideoStreamId('')
      setVideoProgress(0)
      load()
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this item from the gallery?')) return
    startTransition(async () => { await deleteGalleryItem(id); load() })
  }

  function handleMove(id: string, dir: 'up' | 'down') {
    startTransition(async () => { await moveGalleryItem(id, dir); load() })
  }

  function thumbUrl(item: GalleryItem) {
    if (item.type === 'image') return item.src
    return `${STREAM_HOST}/${item.streamId}/thumbnails/thumbnail.jpg`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setImageModal(true)}><ImagePlus className="h-4 w-4 mr-2" />Add Image</Button>
          <Button onClick={() => setVideoModal(true)}><Video className="h-4 w-4 mr-2" />Add Video</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, i) => (
          <div key={item.id} className="group relative border rounded-lg overflow-hidden bg-muted">
            <img src={thumbUrl(item)} alt={item.alt ?? ''} className="w-full aspect-video object-cover" />
            <Badge variant={item.type === 'video' ? 'default' : 'secondary'} className="absolute top-1 left-1 text-xs">
              {item.type}
            </Badge>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <div className="flex gap-1">
                <button onClick={() => handleMove(item.id, 'up')} disabled={i === 0 || isPending} className="bg-white/10 rounded p-1 disabled:opacity-30"><ChevronUp className="h-4 w-4 text-white" /></button>
                <button onClick={() => handleMove(item.id, 'down')} disabled={i === items.length - 1 || isPending} className="bg-white/10 rounded p-1 disabled:opacity-30"><ChevronDown className="h-4 w-4 text-white" /></button>
              </div>
              <button onClick={() => handleDelete(item.id)} className="bg-red-500/80 rounded p-1"><Trash2 className="h-4 w-4 text-white" /></button>
            </div>
            {item.alt && <p className="text-xs p-1 truncate text-muted-foreground">{item.alt}</p>}
          </div>
        ))}
      </div>

      {/* Add Image Modal */}
      <Dialog open={imageModal} onOpenChange={setImageModal}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Image</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Image file</Label>
              {imageForm.src
                ? <div className="relative inline-block">
                    <img src={imageForm.src} alt="" className="h-32 w-32 object-cover rounded-lg border" />
                    <button onClick={() => setImageForm(f => ({ ...f, src: '' }))} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"><X className="h-3 w-3" /></button>
                  </div>
                : <label className="flex flex-col items-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-muted-foreground/60">
                    <ImagePlus className="h-6 w-6 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">{imageUploading ? 'Uploading…' : 'Click to upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
                  </label>
              }
            </div>
            <div className="space-y-2">
              <Label>Alt text</Label>
              <Input value={imageForm.alt} onChange={e => setImageForm(f => ({ ...f, alt: e.target.value }))} placeholder="Describe the image" />
            </div>
            <div className="space-y-2">
              <Label>Hint</Label>
              <Input value={imageForm.hint} onChange={e => setImageForm(f => ({ ...f, hint: e.target.value }))} placeholder="e.g. office interior modern" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setImageModal(false)}>Cancel</Button>
              <Button onClick={saveImage} disabled={!imageForm.src || isPending}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Video Modal */}
      <Dialog open={videoModal} onOpenChange={setVideoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Video</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Video file</Label>
              {videoStreamId
                ? <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-700">
                    Video uploaded successfully (ID: {videoStreamId})
                  </div>
                : <>
                    <label className="flex flex-col items-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-muted-foreground/60" onClick={() => !videoUploading && videoInputRef.current?.click()}>
                      <Video className="h-6 w-6 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        {videoUploading ? `Uploading… ${videoProgress}%` : 'Click to select video'}
                      </span>
                    </label>
                    {videoUploading && <Progress value={videoProgress} className="h-2" />}
                    <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoFile} />
                  </>
              }
            </div>
            <div className="space-y-2">
              <Label>Alt text</Label>
              <Input value={videoForm.alt} onChange={e => setVideoForm(f => ({ ...f, alt: e.target.value }))} placeholder="Describe the video" />
            </div>
            <div className="space-y-2">
              <Label>Hint</Label>
              <Input value={videoForm.hint} onChange={e => setVideoForm(f => ({ ...f, hint: e.target.value }))} placeholder="e.g. office event lawyers" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setVideoModal(false)}>Cancel</Button>
              <Button onClick={saveVideo} disabled={!videoStreamId || isPending || videoUploading}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
