import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {

    const Navigate = useNavigate();
    const [q, setQ] = useState();

    function handleSearch(e){
        e.preventDefault();
        Navigate("/articles", {
            state: {q: q}
        })
    }

    return (

        // home, start quiz, scores, about
        // hamburger menu for mobile view
        // responsive design
        <>
            <header className="navbar">
                <div className="icon">
                    <div className="iconImg">
                        <img src="Article_logo.png" alt="logo" />
                    </div>
                    <div className="iconName">
                        <p>Article</p>
                    </div>
                </div>
                <div className="search-wrapper">
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input type="text" id="search-inp" onChange={(e) => setQ(e.target.value)} placeholder="Search by keyword, title, or topic..." />
                        <button type="submit" className="search-btn">&#128269;</button>
                    </form>
                </div>
                <input type="checkbox" id="hamburger-inp" />
                <label htmlFor="hamburger-inp" className="hamburger">☰</label>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/summary">My Summaries</Link>
                </nav>
            </header>
        </>
    )
}
