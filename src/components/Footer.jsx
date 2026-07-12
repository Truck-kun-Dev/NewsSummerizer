import React from 'react'
import '../styles/Footer.css'; // Adjust the path as necessary

export default function Footer() {
  return (
    <>
        <footer>
            <h1>Article</h1>
            <div className="socialMedia">
                <a href="https://www.linkedin.com/in/debojit-mukherjee-451180309/" target="_blank" rel="noopener noreferrer"><img src="/Images/social/linkedin.png" alt="LinkedIn logo" /></a>
                <a href="https://github.com/TRUCK-KUN-1" target="_blank" rel="noopener noreferrer"><img src="/Images/social/github.png" alt="Github logo" /></a>            
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src="/Images/social/facebook.png" alt="Facebook logo" /></a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><img src="/Images/social/twitter.png" alt="Twitter logo" /></a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src="/Images/social/instagram.png" alt="Instagram logo" /></a>
            </div>
            <hr className="footerhr1" />
            <div className="links">
                <a href="https://legislative.gov.in/constitution-of-india/" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                <a href="https://policies.google.com/privacy?hl=en-US" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </div>
            <hr className="footerhr2" />
            <p>&copy; 2025 Article. All rights reserved.</p>
            <p>Made with ❤️ by TRUCK KUN</p>
        </footer>
    </>
  )
}
