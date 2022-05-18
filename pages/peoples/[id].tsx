import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const urlAPI = 'https://swapi.dev/api'

const People: NextPage = ({ people }: any) => {
  console.log(people)

  return (
    <>
      <b>{people?.name}</b>
    </>
  )
}

async function getPeoplesByID(id: number) {
  const response = await fetch(`${urlAPI}/people/${id}`)
  const data = await response.json()
  return data
}

export async function getStaticProps(context: any) {
  const people = await getPeoplesByID(context.params.id)

  return {
    props: { people }
  }
}

async function getPeoples() {
  const response = await fetch(`${urlAPI}/people`)
  const { results } = await response.json()
  return results
}

export async function getStaticPaths() {
  const peoples = await getPeoples()
  const paths = peoples.map((people: any) => ({
    params: { id: peoples.indexOf(people).toString() }
  }))
  return {
    paths,
    fallback: true // See the "fallback" section below
  }
}

export default People
