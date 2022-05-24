import type { NextPage } from 'next'
import React, { FormEvent } from 'react'
import supabase from './api/supabase'
import Peoples from './peoples'

const Home: NextPage = () => {
  const [email, setEmail] = React.useState('')
  const [isSaving, setIsSaving] = React.useState(false)

  const signNotification = React.useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'facebook'
      })

      console.log('user', user, 'session', session, 'error', error)
      // setIsSaving(true)
      // const { data, error, status }: any = await supabase
      //   .from('usuarios')
      //   .insert([{ email }], { returning: 'minimal' })
      // if (error) {
      //   if (status === 409) {
      //     alert('Usuário já cadastrado, Tente com outro email')
      //   } else {
      //     alert('Erro ao cadastrar usuário')
      //   }
      //   console.log(error)
      //   setIsSaving(false)
      //   return
      // }

      // alert('Usuário cadastrado com sucesso')

      // console.log(data)
      // setIsSaving(false)
      setEmail('')
    },
    [email]
  )
  return (
    <>
      <form
        className='rounded-md bg-blue-500 w-full p-5 h-72 mx-auto flex flex-col items-center justify-center'
        onSubmit={signNotification}
        style={{ textAlign: 'center' }}>
        <h3 className='text-2xl font-bold mb-3'>
          Seja notificado para o lançamento do App
        </h3>
        {email}
        <input
          type='email'
          className='w-full p-2 border-2 border-blue-500 mb-3 rounded-md'
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='Insira seu email'
        />
        <button
          type='submit'
          className='bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded-md'
          style={{ pointerEvents: isSaving ? 'none' : 'all' }}>
          Inscrever
        </button>
      </form>
    </>
  )
}

export default Home
