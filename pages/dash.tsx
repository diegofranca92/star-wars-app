import type { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const Dash: NextPage = ({ launches }: any) => {
  
  console.log('launches', launches);
  

  return (
    <main className="w-full p-5 h-72">
      <header>
        <h1 className="text-2xl font-bold mb-3">List of Launches</h1>
      </header>
      <div className='flex gap-2 flex-col'>
        { launches.map( (launch:any) => (
          <a key={ launch.id } href={launch.links.video_link}  className='bg-white p-3 mb-3 cursor-pointer hover:bg-slate-700 hover:text-white'>
            <b>{launch.mission_name}</b>
            <p>{launch.rocket.rocket_name}</p>
            <em>{ new Date(launch.launch_date_local).toLocaleDateString("pt-BR") }</em>
            <div className='flex gap-1 flex-wrap'>
              {launch.links.flickr_images.map( (flickrImage: any) => {
                return (
                  <Image
                    key={flickrImage.index}
                    src={flickrImage}
                    alt={`Image launch of the ${launch.rocket.rocket_name} Rocket`}
                    width={200}
                    height={200} />
                );
                })
              }
            </div>
          </a>
        ))}
      </div>
    </main>
  )

}

export async function getStaticProps() {
  const client = new ApolloClient({
    // uri: 'https://jntdbzzsqecleksmyxyc.supabase.co/graphql/v1',
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
          rocket {
            rocket_name
          }
          links {
            video_link
            flickr_images
          }
        }
      }
    `
  })

  return {
    props: {
      launches: data.launchesPast
    }
  }
}

export default Dash