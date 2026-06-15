"use client"

import { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronUp, ChevronDown, Pencil, Trash2, Plus } from 'lucide-react'
import ImageUpload from '@/components/admin/image-upload'
import { saveTeamMember, deleteTeamMember, moveTeamMember } from './actions'
import type { TeamMember } from '@/db/schema'

const emptyForm = {
  id: undefined as string | undefined,
  name: '', slug: '', role: '', description: '', email: '', linkedin: '',
  image: '', maskedImage: '', blackedImage: '', hint: '', sortOrder: 0,
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ManageTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ ...emptyForm })
  const [isPending, startTransition] = useTransition()

  async function load() {
    const res = await fetch('/api/admin/team')
    setMembers(await res.json())
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setForm({ ...emptyForm, sortOrder: members.length })
    setOpen(true)
  }

  function openEdit(m: TeamMember) {
    setForm({
      id: m.id, name: m.name, slug: m.slug, role: m.role,
      description: m.description ?? '', email: m.email ?? '',
      linkedin: m.linkedin ?? '', image: m.image ?? '',
      maskedImage: m.maskedImage ?? '', blackedImage: m.blackedImage ?? '',
      hint: m.hint ?? '', sortOrder: m.sortOrder,
    })
    setOpen(true)
  }

  function handleSave() {
    startTransition(async () => {
      await saveTeamMember(form)
      setOpen(false)
      load()
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this team member?')) return
    startTransition(async () => { await deleteTeamMember(id); load() })
  }

  function handleMove(id: string, dir: 'up' | 'down') {
    startTransition(async () => { await moveTeamMember(id, dir); load() })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Member</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Order</TableHead>
            <TableHead className="w-16">Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m, i) => (
            <TableRow key={m.id}>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <button onClick={() => handleMove(m.id, 'up')} disabled={i === 0 || isPending} className="disabled:opacity-30"><ChevronUp className="h-4 w-4" /></button>
                  <button onClick={() => handleMove(m.id, 'down')} disabled={i === members.length - 1 || isPending} className="disabled:opacity-30"><ChevronDown className="h-4 w-4" /></button>
                </div>
              </TableCell>
              <TableCell>
                {m.image && <img src={m.image} alt={m.name} className="h-10 w-10 rounded object-cover object-top" />}
              </TableCell>
              <TableCell className="font-medium">{m.name}</TableCell>
              <TableCell className="text-muted-foreground">{m.role}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(m)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(m.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? 'Edit' : 'Add'} Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: toSlug(e.target.value) }))} />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role / Title</Label>
                <Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Bio / Description</Label>
              <p className="text-xs text-muted-foreground">Use **bold** for bold text. Start lines with - for bullet points. Use **SECTION NAME** on its own line for section headers (EDUCATION, EXPERTISE, etc.)</p>
              <Textarea rows={16} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="font-mono text-sm" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <ImageUpload label="Main Photo" value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} />
              <ImageUpload label="Masked Photo (PNG)" value={form.maskedImage} onChange={url => setForm(f => ({ ...f, maskedImage: url }))} />
              <ImageUpload label="B&W Photo" value={form.blackedImage} onChange={url => setForm(f => ({ ...f, blackedImage: url }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image Hint</Label>
                <Input value={form.hint} onChange={e => setForm(f => ({ ...f, hint: e.target.value }))} placeholder="e.g. man portrait lawyer" />
              </div>
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: Number(e.target.value) }))} />
              </div>
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
