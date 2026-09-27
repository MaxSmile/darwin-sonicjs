// @ts-nocheck
import { describe, it, expect, vi } from 'vitest'
import { convertImageFileToWebp } from '../../utils/media-webp'

describe('convertImageFileToWebp', () => {
  it('converts JPEG uploads to WebP and preserves a .webp extension', async () => {
    const originalFile = new File(['hello'], 'photo.jpg', { type: 'image/jpeg' })
    const convertedBlob = new Blob(['converted'], { type: 'image/webp' })

    const canvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => ({ drawImage: vi.fn(), clearRect: vi.fn() })),
      toBlob: vi.fn((cb) => cb(convertedBlob)),
    }

    class MockImage {
      width = 0
      height = 0
      naturalWidth = 200
      naturalHeight = 100
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      _src = ''

      set src(value: string) {
        this._src = value
        queueMicrotask(() => this.onload?.())
      }

      get src() {
        return this._src
      }
    }

    vi.stubGlobal('document', {
      createElement: vi.fn((tag) => {
        if (tag === 'canvas') return canvas
        return {}
      }),
    })

    vi.stubGlobal('Image', MockImage)
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:converted'),
      revokeObjectURL: vi.fn(),
    })

    const converted = await convertImageFileToWebp(originalFile)

    expect(converted.type).toBe('image/webp')
    expect(converted.name.endsWith('.webp')).toBe(true)
    expect(canvas.toBlob).toHaveBeenCalledWith(expect.any(Function), 'image/webp', 0.82)
  })
})
