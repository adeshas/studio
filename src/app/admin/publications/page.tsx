"use client"

import { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronUp, ChevronDown, Pencil, Trash2, Plus, FileUp } from 'lucide-react'
import { savePublication, deletePublication, movePublication } from './actions'
import type { Publication } from '@/db/schema'

const emptyForm = {
  id: undefined as string | undefined,
  title: '', description: '', link: '', sortOrder: 0,
}

export default function ManagePublicationsPage() {
  const [items, setItems] = useState<Publication[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ ...emptyForm })
  const [isPending, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)

  async function load() {
    const res = await fetch('/api/admin/publications')
    setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setForm({ ...emptyForm, sortOrder: items.length })
    setOpen(true)
  }

  function openEdit(item: Publication) {
    setForm({ id: item.id, title: item.title, description: item.description ?? '', link: item.link, sortOrder: item.sortOrder })
    setOpen(true)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload/image', { method: 'POST', body: fd })
      const { url } = await res.json()
      setForm(f => ({ ...f, link: url }))
    } finally {
      setUploading(false)
    }
  }

  function handleSave() {
    startTransition(async () => {
      await savePublication(form)
      setOpen(false)
      load()
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this publication?')) return
    startTransition(async () => { await deletePublication(id); load() })
  }

  function handleMove(id: string, dir: 'up' | 'down') {
    startTransition(async () => { await movePublication(id, dir); load() })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Publications</h1>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Publication</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Order</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>File</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <button onClick={() => handleMove(item.id, 'up')} disabled={i === 0 || isPending} className="disabled:opacity-30"><ChevronUp className="h-4 w-4" /></button>
                  <button onClick={() => handleMove(item.id, 'down')} disabled={i === items.length - 1 || isPending} className="disabled:opacity-30"><ChevronDown className="h-4 w-4" /></button>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-medium">{item.title}</p>
                {item.description && <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>}
              </TableCell>
              <TableCell>
                {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">View file</a>}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? 'Edit' : 'Add'} Publication</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>File (PDF / PPT)</Label>
              <div className="flex gap-2 items-center">
                <Input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="Paste URL or upload file below" className="flex-1" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                <FileUp className="h-4 w-4" />
                {uploading ? 'Uploading…' : 'Upload new file'}
                <input type="file" accept=".pdf,.ppt,.pptx,.doc,.docx" className="hidden" onChange={handleFileUpload} />
              </label>
              {form.link && <a href={form.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block">Current: {form.link.split('/').pop()}</a>}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isPending}>{isPending ? 'Saving…' : 'Save'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
