import Pokemon from "../../../../models/pokemon"
import Image from "next/image"

export const metadata = {
   title: 'Pokedex',
   description: 'Looking Pokemon',
 }


export default async function PokemonDetail({params}) {
   const response = await Pokemon.fetchByName(params.slug)
   const { 
      abilities, 
      base_experience, 
      froms, 
      game_indices, 
      height, 
      held_items, 
      id,
      is_default,
      location_area_encounters,
      moves,
      name,
      order,
      past_types,
      species,
      sprites,
      stats,
      types,
      weight
   } = response

   return (
      <div className="flex flex-col justify-center space-y-4">
         <div className="flex">
            <div className="flex flex-col space-y-2">
               <h1 className="text-gray-100 text-4xl font-black capitalize">{name}</h1>
               <div className="flex flex-row space-x-2">
                  {
                     types.map((item, i)=>{
                        return <div key={i} className="text-gray-100 bg-orange-600 px-4 py-1 rounded-lg">
                           {item.type.name}
                        </div>
                     } )
                  }
               </div>
            </div>
         </div>
         <div className="relative flex justify-center items-center">
            <div className="block overflow-hidden w-2/3 md:w-1/2 pb-96 lg:pb-[35rem] relative group">
               <Image
                  src={sprites?.other?.home?.front_default}
                  blurDataURL={sprites?.other?.home?.front_default}
                  className="h-full w-full object-fill absolute inset-0 rounded-sm"
                  priority
                  width="0"
                  height="0"
                  sizes="320 640 750"
                  quality={80}
                  alt={name}
                  blur={20}
               />
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
            <div className="shadow-lg bg-gray-800 flex flex-col space-y-2 p-4 rounded-lg h-max">
               <div className="text-xl font-bold text-orange-600">
                  Breeding
               </div>
               <div className="grid grid-cols-2 gap-x-2">
                  <div className="leading-8">
                     <label className="text-gray-100 font-medium">Weight</label>
                     <div className="px-4 py-1 bg-gray-500 rounded-lg">{weight/1000} kg</div>
                  </div>
                  <div className="leading-8">
                     <label className="text-gray-100 font-medium">Height</label>
                     <div className="px-4 py-1 bg-gray-500 rounded-lg">{height/100} m</div>
                  </div>
               </div>
            </div>
            <div className="shadow-lg bg-gray-800 flex flex-col space-y-2 p-4 rounded-lg">
               <div className="text-xl font-bold text-orange-600">
                  Start
               </div>
               <div className="grid gap-y-2">
                  {
                     stats.map((item,i)=> { return <Start item={item} key={i} />})
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

const Start = ({item}) => {
   const name = item?.stat?.name.split('-').join(' ')
   return (
      <div className="flex flex-col space-y-2">
         <label className="text-gray-100 font-medium capitalize">{name} ({item.base_stat})</label>
         <progress value={item.base_stat} max="100" className={`progress-bar ${item.base_stat == 100 && 'progress-bar-end'}`}/>
      </div>
   )
}