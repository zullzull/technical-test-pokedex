import Link from "next/link"

export default function Header() {
   return (
      <div className="w-full max-w-7xl m-auto sticky top-0 z-50 lg:py-2">
         <div className="flex flex-row justify-between items-center p-4 lg:rounded-md bg-gray-800">
            <Link href="/" rel="preload" className="text-2xl font-black lowercase text-orange-600">pokedex</Link>
            <div className="block">
               <div className="relative flex flex-col space-y-1.5">
                  <div className="w-7 h-0.5 bg-gray-100"></div>
                  <div className="w-4 h-0.5 bg-gray-100"></div>
                  <div className="w-7 h-0.5 bg-gray-100"></div>
               </div>
            </div>
         </div>
      </div>
   )
}