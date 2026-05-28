export function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function timeToSeconds(time: string): number {
  const parts = time.split(':').map(Number)
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  return 0
}

export function secondsToTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function getYoutubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
}

export function getEmbedUrl(youtubeId: string, startSeconds?: number | null, endSeconds?: number | null): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
  })
  if (startSeconds) params.set('start', String(startSeconds))
  if (endSeconds) params.set('end', String(endSeconds))
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`
}

export async function fetchYoutubeMetadata(youtubeId: string, apiKey: string) {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${apiKey}&part=snippet,contentDetails`
  const res = await fetch(url)
  const data = await res.json()
  const item = data.items?.[0]
  if (!item) return null
  return {
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url,
    description: item.snippet.description,
  }
}
