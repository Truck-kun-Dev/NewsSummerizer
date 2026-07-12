import React, { useState, useEffect } from 'react';
import '../styles/Articles.css';
import NewsCard from './NewsCard.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import NoResults from './NoResults.jsx';

export default function Articles(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const q = location.state?.q;
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const searchQuery = props.q ?? q;

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [page, setPage] = useState(0); // pagination state

    const PAGE_SIZE = 20;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!searchQuery) return;

                setLoading(true);
                setErrorMsg('');
                setArticles([]);
                setPage(0); // reset page on query change

                const url = `https://newsapi.org/v2/everything?q=${searchQuery}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

                const data = await response.json();
                if (data.status !== 'ok') {
                    throw new Error(`NewsAPI Error: ${data.message}`);
                }

                setArticles(data.articles || []);
            } catch (error) {
                console.error('NewsAPI fetch failed:', error);
                setErrorMsg('Something went wrong while fetching the news.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchQuery, apiKey]);

    useEffect(() => {
        if (!props.q && !q && location.pathname !== '/') {
            navigate('/', { replace: true });
        }
    }, [props.q, q, navigate, location.pathname]);

    const startIndex = page * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const pagedArticles = articles.slice(startIndex, endIndex);

    const handleNext = () => {
        if (endIndex < articles.length) setPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        if (page > 0) setPage(prev => prev - 1);
    };

    return (
        <div className="Articles">
            <h1>{searchQuery}</h1>

            {loading && (
                <div className="loading-dots">
                    <span>Loading</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                </div>
            )}

            {!loading && errorMsg && (
                <h3 className="status-message error">{errorMsg}</h3>
            )}

            {!loading && !errorMsg && articles.length === 0 && (
                <NoResults query={searchQuery} />
            )}


            <div className="ArticleContainer">
                {!loading && !errorMsg && pagedArticles.map((article, index) => (
                    <NewsCard
                        key={index}
                        q={searchQuery}
                        thumbnail={article.urlToImage}
                        title={article.title}
                        source={article.source.name}
                        description={article.description}
                        author={article.author}
                        publishedAt={article.publishedAt}
                        url={article.url}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            {!loading && articles.length > PAGE_SIZE && (
                <div className="pagination-controls">
                    <button
                        className="btn"
                        onClick={handlePrevious}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {page + 1} of {Math.ceil(articles.length / PAGE_SIZE)}
                    </span>
                    <button
                        className="btn"
                        onClick={handleNext}
                        disabled={endIndex >= articles.length}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
