import React from 'react'
import '../styles/Home.css'
import TopCategories from './TopCategories'
import Articles from './Articles'

export default function Home() {
  return (
    <div className='Home'>
        <TopCategories />
        <Articles q='Today'/>
    </div>
  )
}
