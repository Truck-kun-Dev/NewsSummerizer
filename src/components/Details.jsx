import React, { useState, useEffect } from 'react';
import '../styles/Details.css';
import { useLocation } from 'react-router-dom';

export default function Details() {
  const location = useLocation();
  const q = location.state?.q || 'Unknown';
  const thumbnail = location.state?.thumbnail || 'Default_Card.png';
  const title = location.state?.title || 'No Title';
  const source = location.state?.source || 'Unknown Source';
  const description = location.state?.description || 'No Description';
  const author = location.state?.author || 'Unknown Author';
  const publishedAt = location.state?.publishedAt || 'Unknown Date';
  const url = location.state?.url || '';

  const [display, setDisplay] = useState(true);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const GeminiapiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const summarizeWithGemini = async (link) => {
    try {
      setLoading(true);
      setErrorMsg('');
      setSummary('');

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GeminiapiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Summarize this news article in 3 bullet points (use • as bullet): ${link}`,
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text && text.length > 0) {
        setSummary(text);
      } else {
        setErrorMsg('Gemini did not return a summary.');
      }
    } catch (error) {
      console.error('Error summarizing with Gemini:', error);
      setErrorMsg('Something went wrong while summarizing the article.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) summarizeWithGemini(url);
  }, [url]);

  const handleClick = () => {
    setDisplay((prev) => !prev);
  };

  return (
    <div className="Details">
      <h1>{q} &gt;</h1>
      <div className="content">
        <h3>
          {title} <span>- {source}</span>
        </h3>
        <h4>
          Source - {source} (By - {author} On - {publishedAt})
        </h4>
        <img src={thumbnail} alt="News thumbnail" />
        <p>{description}</p>

        {!display && (
          <div className="summary">
            <h4>Summary:</h4>

            {loading && (
              <div className="loading-dots">
                <span>Loading</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            )}

            {!loading && errorMsg && (
              <p className="status-message error">{errorMsg}</p>
            )}

            {!loading && !errorMsg && summary && (
              <ul className="gemini-summary">
                {summary
                  .replace(/^\[|\]$/g, '')
                  .replace(/^\*\s*/gm, '')
                  .split(/[•]+/)
                  .map((point) => point.trim())
                  .filter((point) => point.length > 0)
                  .map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
              </ul>
            )}
          </div>
        )}

        <button className="btn" onClick={handleClick}>
          {display ? 'Show Summary' : 'Hide Summary'}
        </button>
        <a href={url} target='_blank'>
          Read Full Article
        </a>
      </div>
    </div>
  );
}
