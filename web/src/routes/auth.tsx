// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { redirect } from 'react-router-dom'

import { register, login } from '../services'

export function AuthRoute (): JSX.Element {
  const {
    register: registerInput,
    handleSubmit: createSubmitHandler,
    formState
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = createSubmitHandler(async (values) => {
    const { data } = await register(values)
    localStorage.setItem('token', data.token)
    redirect('/')
  })

  return (
    <main className="text-center">
      <h1 className="mb-10">Login / Register</h1>

      <form className="mb-10" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Type Email here..."
          {...registerInput('email', { required: true })}
        />

        <input
          type="password"
          placeholder="Type Password here..."
          {...registerInput('password', { required: true })}
        />

        <button
          type="submit"
          disabled={formState.isSubmitting}
          >
            Login
        </button>
      </form>
    </main>
  )
}

export default AuthRoute
