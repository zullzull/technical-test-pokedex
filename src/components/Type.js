'use client';

import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Pokemon from '../../models/pokemon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memoizeSearch } from '../../store/features/main';
import { fetchPokemons } from '../../store/features/pokemon';

export default function Abilities() {
   const [abilities, setAbilities] = useState([])
   const [loading, setLoading] = useState(false)
   const [active, setActive] = useState('all')
   const dispatch = useDispatch()
   const search = useSelector(memoizeSearch)

   async function getAbilities(){
      setLoading(true)
      const { results, ...rest } = await Pokemon.fetchType()
      if (results.length > 0) {
         const res = results.map((item)=> {
            const name = item.name.split('-').join(' ')
            return {
               name: name,
               slug: item.name,
               url: item.url
            }
         })
         const data = [
            ...[{name: 'All', slug: 'all', url: '#'}],
            ...res
         ]
         setAbilities(data)
         setLoading(false)
      }
   }

   const handleType = (item) => {
      let params = {
         type: item.slug,
         search: search,
         limit: 12,
         offset: 0
      }
      setActive(item.slug)

      if (item.name == 'All') {
         params = {
            ...params,
            type: '',
            search: search
         }
         setActive('all')
      }

      dispatch(fetchPokemons(params))
   }

   useEffect(()=>{
      getAbilities()
   },[])

   return (
      <Swiper
         className='!m-0 w-full border-b border-gray-200'
         modules={[Pagination]}
         spaceBetween={25}
         slidesPerView={'auto'}
      >
         {
            abilities?.map((item, i) =>  
               <SwiperSlide onClick={()=> handleType(item)} className={`px-4 py-2 !w-auto text-xl cursor-pointer capitalize ${active == item.slug ? 'text-orange-600' : 'text-gray-100'}`} key={i}>
                  {item.name}
               </SwiperSlide>
            )
         }
      </Swiper>
   )
}