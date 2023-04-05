import { type FormEvent, useState } from 'react'
import { createLink } from '../services'

export function Root (): JSX.Element {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortenUrl, setShortenUrl] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const { data } = await createLink(originalUrl)
    setShortenUrl(data.shortenUrl)
  }

  return (
    <main>
      <h1>URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={originalUrl}
          onChange={({ target }) => { setOriginalUrl(target.value) }}
        />
      </form>

      {shortenUrl && <a href={shortenUrl} target='_blank' rel="noreferrer">{shortenUrl}</a>}
    </main>
  )
}

export default Root
