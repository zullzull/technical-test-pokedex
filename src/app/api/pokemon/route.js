import { NextResponse } from 'next/server'
import Pokemon from '../../../../models/pokemon'
import { GraphQLClient, gql } from 'graphql-request'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const endpoint = 'https://beta.pokeapi.co/graphql/v1beta'
  const type = searchParams.get('type')
  const search = searchParams.get('search')
  const limit = searchParams.get('limit') ? searchParams.get('limit') : 10
  const offset = searchParams.get('offset') ? searchParams.get('offset') : 0
  
  var params = ''

  if (type && search == '') {
    params = `pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: "${type}"}}}`
  }

  if (search && type == '') {
    params = `name: {_eq: "${search}"}`
  }

  if (type && search) {
    params = `name: {_eq: "${search}"}, pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: "${type}"}}}`
  }

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  const query = gql`
    query samplePokeAPIquery {
      pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}, where: { ${params} }) {
        name
        id
      }
    }   
   `
  const graphs = await graphQLClient.request(query)

  const { pokemon_v2_pokemon } = graphs
  
  if (pokemon_v2_pokemon.length > 0) {
    const res = await Promise.all(pokemon_v2_pokemon.map(async (item, i) => {
      return {
        name: item.name,
        ...await Pokemon.fetchByName(item.name)
      }
    }))
    return NextResponse.json({ items: res, success: true })
  }else{
    return NextResponse.json({ success: false, items: [], error: {} })
  }
}