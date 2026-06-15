"use client"

import { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, ChevronUp, ChevronDown } from 'lucide-react'
import ImageUpload from '@/components/admin/image-upload'
import { saveSetting } from './actions'

interface HeroSlide { heading: string; subheading: string }

export default function SettingsPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [firmIntroImage, setFirmIntroImage] = useState('')
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings/hero_slides').then(r => r.json()).then(v => { if (Array.isArray(v)) setSlides(v) })
    fetch('/api/admin/settings/firm_intro_image').then(r => r.json()).then(v => { if (typeof v === 'string') setFirmIntroImage(v) })
  }, [])

  function updateSlide(i: number, field: keyof HeroSlide, value: string) {
    setSlides(s => s.map((slide, idx) => idx === i ? { ...slide, [field]: value } : slide))
  }

  function addSlide() { setSlides(s => [...s, { heading: '', subheading: '' }]) }

  function removeSlide(i: number) { setSlides(s => s.filter((_, idx) => idx !== i)) }

  function moveSlide(i: number, dir: 'up' | 'down') {
    setSlides(s => {
      const arr = [...s]
      const j = dir === 'up' ? i - 1 : i + 1
      if (j < 0 || j >= arr.length) return s;
      [arr[i], arr[j]] = [arr[j], arr[i]]
      return arr
    })
  }

  function handleSave() {
    startTransition(async () => {
      await Promise.all([
        saveSetting('hero_slides', slides),
        saveSetting('firm_intro_image', firmIntroImage),
      ])
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Hero Slides</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {slides.map((slide, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Slide {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={() => moveSlide(i, 'up')} disabled={i === 0} className="disabled:opacity-30"><ChevronUp className="h-4 w-4" /></button>
                  <button onClick={() => moveSlide(i, 'down')} disabled={i === slides.length - 1} className="disabled:opacity-30"><ChevronDown className="h-4 w-4" /></button>
                  <button onClick={() => removeSlide(i)} className="text-destructive ml-2"><X className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input value={slide.heading} onChange={e => updateSlide(i, 'heading', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Subheading</Label>
                <Textarea rows={2} value={slide.subheading} onChange={e => updateSlide(i, 'subheading', e.target.value)} />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSlide}><Plus className="h-4 w-4 mr-2" />Add Slide</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Firm Introduction</CardTitle></CardHeader>
        <CardContent>
          <ImageUpload label="Firm Introduction Image" value={firmIntroImage} onChange={setFirmIntroImage} />
        </CardContent>
      </Card>
    </div>
  )
}
