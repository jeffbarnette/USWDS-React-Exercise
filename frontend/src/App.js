import React from 'react'
import GovBanner from './components/GovBanner'
import Routes from './components/Routes'
import Header from './components/Header'


function App() {
  return (
    <>
      <a
        className="usa-skipnav"
        href="#main-content"
        onKeyPress={(e) => {
          if (e.code === 32) {
            window.location.href = '#main-content'
          }
        }}
      >
        Skip to main content
      </a>
      <GovBanner />
      <Header />
      <main id="main-content">
        <Routes />
      </main>
    </>
  )
}

export default App
