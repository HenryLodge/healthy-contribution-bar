import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [selectedMode, setSelectedMode] = useState('quote')

  // icons from claude
  const modes = [
    {id: 'quote', icon: '💬', title: 'Quote', description: 'daily motivation'},
    {id: 'mountain', icon: '⛰️', title: 'Mountain', description: 'climb everest'},
    {id: 'fireflies', icon: '✨', title: 'Fireflies', description: 'collect light'},
    {id: 'xp', icon: '⚡', title: 'XP Bar', description: 'level up'}
  ]

  useEffect(() => {
    chrome.storage.sync.get(['username', 'mode'], (result: {username?: string; mode?: string}) => {
      if (result.username) {
        setInput(result.username)
      }
      if (result.mode) {
        setSelectedMode(result.mode)
      }
    })
  }, [])

  const apply = () => {
    let username = input.trim()
    if (username.includes('github.com/')) {
      const match = username.match(/github\.com\/([^/]+)/)
      if (match) {
        username = match[1];
      }
    }
    
    chrome.storage.sync.set({
      username: username,
      mode: selectedMode
    })
  }

  return (
    <div className="container">
      <div className="header">
        <div className="icon">🌱</div>
        <div className="header-text">
          <h1>Healthy Contribution Bar</h1>
          <p className="subtitle">Because squares are sharp</p>
        </div>
      </div>
      
      <div className="content">
        <div className="section">
          <label className="input-label">Username</label>
          <div className="input-wrapper">
            <span className="prefix">github.com/</span>
            <input
              type="text"
              placeholder="username"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="github-input"
            />
          </div>
        </div>

        <div className="section">
          <label className="input-label">Mode</label>
          <div className="modes-grid">
            {modes.map((mode) => (
              <div
                key={mode.id}
                className={`mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
                onClick={() => setSelectedMode(mode.id)}
              >
                <div className="mode-icon">{mode.icon}</div>
                <div className="mode-content">
                  <div className="mode-title">{mode.title}</div>
                  <div className="mode-description">{mode.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={apply} className="apply-button">Apply</button>
      </div>
    </div>
  )
}

export default App