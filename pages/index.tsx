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
      <form onSubmit={signNotification} style={{ textAlign: 'center' }}>
        <p>Seja notificado para o lançamento do App</p>
        {email}
        <input
          type='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='Insira seu email'
        />
        <button
          type='submit'
          style={{ pointerEvents: isSaving ? 'none' : 'all' }}>
          Inscrever
        </button>
      </form>
    </>
  )
}

export default Home
