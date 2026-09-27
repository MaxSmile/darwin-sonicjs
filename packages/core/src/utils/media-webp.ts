export function isWebpConvertibleImage(file: File): boolean {
  return !!file && file.type.startsWith('image/') && !file.type.includes('svg') && file.type !== 'image/webp'
}

export function replaceExtension(filename: string, extension: string): string {
  const normalized = filename.trim()
  if (!normalized) return extension
  const hasExtension = /\.[A-Za-z0-9]+$/.test(normalized)
  return hasExtension ? normalized.replace(/\.[^/.]+$/, `.${extension.replace(/^\./, '')}`) : `${normalized}.${extension.replace(/^\./, '')}`
}

export async function convertImageFileToWebp(file: File): Promise<File> {
  if (!isWebpConvertibleImage(file)) {
    return file
  }

  if (typeof document === 'undefined' || typeof Image === 'undefined' || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
    return file
  }

  const objectUrl = URL.createObjectURL(file)

  try {
    const imageElement = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = objectUrl
    })

    const canvas = document.createElement('canvas')
    const width = Math.max(1, Math.round(imageElement.naturalWidth || imageElement.width))
    const height = Math.max(1, Math.round(imageElement.naturalHeight || imageElement.height))

    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      return file
    }

    context.clearRect(0, 0, width, height)
    context.drawImage(imageElement, 0, 0, width, height)

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/webp', 0.82)
    })

    if (!blob) {
      return file
    }

    const convertedFile = new File([blob], replaceExtension(file.name, 'webp'), {
      type: 'image/webp',
      lastModified: Date.now(),
    })
    return convertedFile
  } catch (error) {
    console.warn('WebP conversion failed, using original file instead:', error)
    return file
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

export async function convertImageFilesToWebp(files: File[]): Promise<File[]> {
  return Promise.all(files.map((file) => convertImageFileToWebp(file)))
}
