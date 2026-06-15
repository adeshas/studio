"use client"

import { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronUp, ChevronDown, Pencil, Trash2, Plus, X } from 'lucide-react'
import ImageUpload from '@/components/admin/image-upload'
import { saveExpertise, deleteExpertise, moveExpertise } from './actions'
import type { Expertise } from '@/db/schema'

const emptyForm = {
  id: undefined as string | undefined,
  slug: '', title: '', shortDescription: '', image: '', hint: '',
  longDescription: [''] as string[],
  sortOrder: 0,
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ManageExpertisePage() {
  const [items, setItems] = useState<Expertise[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ ...emptyForm })
  const [isPending, startTransition] = useTransition()

  async function load() {
    const res = await fetch('/api/admin/expertise')
    setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setForm({ ...emptyForm, sortOrder: items.length })
    setOpen(true)
  }

  function openEdit(item: Expertise) {
    setForm({
      id: item.id, slug: item.slug, title: item.title,
      shortDescription: item.shortDescription ?? '',
      image: item.image ?? '', hint: item.hint ?? '',
      longDescription: item.longDescription?.length ? item.longDescription : [''],
      sortOrder: item.sortOrder,
    })
    setOpen(true)
  }

  function handleSave() {
    startTransition(async () => {
      await saveExpertise({ ...form, longDescription: form.longDescription.filter(p => p.trim()) })
      setOpen(false)
      load()
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this practice area?')) return
    startTransition(async () => { await deleteExpertise(id); load() })
  }

  function handleMove(id: string, dir: 'up' | 'down') {
    startTransition(async () => { await moveExpertise(id, dir); load() })
  }

  function setParagraph(index: number, value: string) {
    setForm(f => {
      const updated = [...f.longDescription]
      updated[index] = value
      return { ...f, longDescription: updated }
    })
  }

  function addParagraph() {
    setForm(f => ({ ...f, longDescription: [...f.longDescription, ''] }))
  }

  function removeParagraph(index: number) {
    setForm(f => ({ ...f, longDescription: f.longDescription.filter((_, i) => i !== index) }))
  }

  function moveParagraph(index: number, dir: 'up' | 'down') {
    setForm(f => {
      const arr = [...f.longDescription]
      const swapIdx = dir === 'up' ? index - 1 : index + 1
      if (swapIdx < 0 || swapIdx >= arr.length) return f;
      [arr[index], arr[swapIdx]] = [arr[swapIdx], arr[index]]
      return { ...f, longDescription: arr }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Practice Areas</h1>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Area</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Order</TableHead>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Title</TableHead>
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
                {item.image && <img src={item.image} alt={item.title} className="h-10 w-16 rounded object-cover" />}
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? 'Edit' : 'Add'} Practice Area</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: toSlug(e.target.value) }))} />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Textarea rows={3} value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload label="Cover Image" value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} />
              <div className="space-y-2">
                <Label>Image Hint</Label>
                <Input value={form.hint} onChange={e => setForm(f => ({ ...f, hint: e.target.value }))} placeholder="e.g. gavel court justice" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Full Description (one paragraph per block)</Label>
              <div className="space-y-3">
                {form.longDescription.map((para, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex flex-col gap-1 pt-2">
                      <button type="button" onClick={() => moveParagraph(i, 'up')} disabled={i === 0} className="disabled:opacity-30"><ChevronUp className="h-3 w-3" /></button>
                      <button type="button" onClick={() => moveParagraph(i, 'down')} disabled={i === form.longDescription.length - 1} className="disabled:opacity-30"><ChevronDown className="h-3 w-3" /></button>
                    </div>
                    <Textarea rows={4} value={para} onChange={e => setParagraph(i, e.target.value)} className="flex-1 text-sm" />
                    <button type="button" onClick={() => removeParagraph(i)} className="pt-2 text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addParagraph}><Plus className="h-3 w-3 mr-1" />Add Paragraph</Button>
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
