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
      <h1 className='mb-10'>URL Shortener</h1>

      <form className='text-center mb-10' onSubmit={handleSubmit}>
        <input
          className="w-full outline-none rounded-xl h-12 px-3 focus:ring-2 ring-indigo-400 ring-offset-2"
          type="url"
          placeholder="Type URL here..."
          value={originalUrl}
          onChange={({ target }) => { setOriginalUrl(target.value) }}
        />

        <button
          className="px-5 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white focus:ring-2 ring-indigo-400 ring-offset-2 disabled:opacity-50"
          type="submit">
            Shorten
        </button>
      </form>

      {shortenUrl && (
        <div className='text-center'>
          <a href={shortenUrl} target='_blank' rel="noreferrer">{shortenUrl}</a>
        </div>
      )}
    </main>
  )
}

export default Root
