import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createLink } from '../services'

export function RootRoute (): JSX.Element {
  const {
    register,
    handleSubmit: createSubmitHandler,
    formState
  } = useForm({
    defaultValues: {
      originalUrl: ''
    }
  })
  const [shortenUrl, setShortenUrl] = useState('')

  const handleSubmit = createSubmitHandler(async (values) => {
    const { data } = await createLink(values)
    setShortenUrl(data.shortenUrl)
  })

  return (
    <>
    <nav className="fixed top-0 left-0 w-full p-4">Nav</nav>

    <main className="text-center">
      <h1 className="mb-10">URL Shortener</h1>

      <form className="mb-10" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Type URL here..."
          {...register('originalUrl', { required: true })}
        />

        <button
          type="submit"
          disabled={formState.isSubmitting}
          >
            Shorten
        </button>
      </form>

      {shortenUrl && (
        <div>
          <a href={shortenUrl} target='_blank' rel="noreferrer">{shortenUrl}</a>
        </div>
      )}
    </main>
    </>
  )
}

export default RootRoute
