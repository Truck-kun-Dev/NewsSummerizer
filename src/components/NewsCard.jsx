import React from 'react'
import '../styles/NewsCard.css'
import { Link, useNavigate } from 'react-router-dom'

export default function NewsCard(props) {
    return (
        <Link className='NewsCard' to={"/details"} state={{q: props.q, thumbnail: props.thumbnail, title: props.title, source: props.source, description: props.description, author: props.author, publishedAt: props.publishedAt, url: props.url}}>
            <div className="card">
                <img src={props.thumbnail === null ? "Default_Card.png" : props.thumbnail} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">-{props.source}</p>
                    </div>
            </div>
        </Link>
    )
}
