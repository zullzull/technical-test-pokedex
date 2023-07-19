import Image from "next/image"
import Link from "next/link"

export default function PokemonItem({item}) {
   return (
      <Link href={`/pokemon/${item.name}`} rel="preload" className="grid relative">
         <div className="block overflow-hidden pb-80 relative group">
            <Image
               src={item?.sprites?.other?.home?.front_default}
               blurDataURL={item?.sprites?.other?.home?.front_default}
               className="h-full w-full object-fill absolute inset-0 rounded-sm"
               priority
               width="0"
               height="0"
               sizes="320 640 750"
               quality={80}
               alt={item.name}
               blur={20}
            />
         </div>
         <div className="lg:text-2xl font-bold text-center capitalize">
            {item?.name}
         </div>
      </Link>
   )
}