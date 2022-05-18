import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const urlAPI = 'https://swapi.dev/api'

const Peoples: NextPage = ({ peoples }: any) => {
  console.log(peoples)

  return (
    <>
      <ul>
        {peoples.map((people: any, index: number) => (
          <Link key={index} href={`/peoples/${index + 1}`}>
            <li>
              <a>{people.name}</a>
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}

async function getPeoples() {
  const response = await fetch(`${urlAPI}/people`)
  const { results } = await response.json()
  return results
}

export async function getStaticProps(context: any) {
  const peoples = await getPeoples()
  return {
    props: { peoples }
  }
}

export default Peoples
