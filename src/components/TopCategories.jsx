import React from 'react'
import '../styles/TopCategories.css'
import { Link, useNavigate } from 'react-router-dom'

export default function TopCategories() {
  return (
    <div className='TopCategories'>
        <h1>Top Categories</h1>
        <div className='CategoryContainer'>
            <Link className='Category Business' to="/articles" state={{q:"business"}}>
                <h3>Business</h3>
            </Link>
            <Link className='Category Tech' to="/articles" state={{q:"tech"}}>
                <h3>Tech</h3>
            </Link>
            <Link className='Category Sports' to="/articles" state={{q:"sport"}}>
                <h3>Sports</h3>
            </Link>
            <Link className='Category Health' to="/articles" state={{q:"health"}}>
                <h3>Health</h3>
            </Link>
        </div>
    </div>
  )
}
