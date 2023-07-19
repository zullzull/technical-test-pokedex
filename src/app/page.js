import Type from '@/components/Type'
import Pokemon from '../../models/pokemon'
import Pokemons from '@/components/Pokemons'
import Search from '@/components/Search'

export const metadata = {
  title: 'Pokedex',
  description: 'Looking Pokemon',
}


export default async function Home() {
  const params = {
    limit: 12,
    offset: 0
  }

  const response = await getPokemon(params)
  const { items, success} = response

  return (
    <section className="">
      <div className='py-28'>
        <h2 className='text-7xl text-gray-100 font-bold'>
          What Pokemon <br /> are you looking for ?
        </h2>
      </div>
      <div className='flex justify-between items-center text-gray-100'>
        <div className='flex space-x-2 w-1/2 overflow-hidden'>
          <Type />
        </div>
        <div className='w-1/2 flex justify-end'>
          <div className="w-2/3 relative">
            <Search />
          </div>
        </div>
      </div>
      <div className='flex flex-col text-white'>
          <Pokemons pokemons={items} limit={params.limit} offset={params.offset} />
      </div>
    </section>
  )
}

async function getPokemon(params) {
  const response = await Pokemon.fetch(params)
  const { items, success} = response

  if (success < 0) {
    throw new Error('Failed to fetch data')
  }
  
  return response
}