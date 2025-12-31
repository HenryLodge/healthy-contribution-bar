export function loadQuoteMode(container, contributionData) {
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Quality means doing it right when no one is looking.", author: "Henry Ford" },
    { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { text: "It's not about ideas. It's about making ideas happen.", author: "Scott Belsky" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { text: "Progress, not perfection.", author: "Unknown" },
    { text: "Done is better than perfect.", author: "Sheryl Sandberg" }
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  injectCSS('quote-mode-css', `
    .hcb-quote-mode {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0d1117;
      font-family: 'Georgia', 'Times New Roman', serif;
      padding: 40px;
    }
    
    .hcb-quote-container {
      max-width: 800px;
      text-align: center;
    }
    
    .hcb-quote-text {
      font-size: 22px;
      line-height: 1.4;
      color: var(--color-fg-default);
      font-weight: 400;
      margin: 0 0 16px 0;
      font-style: italic;
      white-space: nowrap;
    }
    
    .hcb-quote-author {
      font-size: 15px;
      color: var(--color-fg-muted);
      font-weight: 400;
      margin: 0;
      font-style: normal;
    }
    
    .hcb-quote-author::before {
      content: '— ';
    }
  `);
  
  container.innerHTML = `
    <div class="hcb-quote-mode">
      <div class="hcb-quote-container">
        <p class="hcb-quote-text">"${randomQuote.text}"</p>
        <p class="hcb-quote-author">${randomQuote.author}</p>
      </div>
    </div>
  `;
}

export function loadMountainMode(container, contributionData) {
  // Use contribution data for mountain visualization
  const totalContributions = contributionData?.stats?.total || 0;
  const feetClimbed = totalContributions * 10;
  const formattedFeet = feetClimbed.toLocaleString();
  
  injectCSS('mountain-mode-css', `
    .hcb-mountain-mode {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    
    /* Snow-covered mountain peaks */
    .hcb-mountain-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
    }
    
    /* Right mountain (tallest) */
    .hcb-mountain-layer-1 {
      position: absolute;
      bottom: -10%;
      right: -5%;
      width: 60%;
      height: 130%;
      background: linear-gradient(135deg, #4A5568 0%, #2D3748 50%, #1A202C 100%);
      clip-path: polygon(100% 100%, 0% 100%, 40% 0%, 100% 20%);
      z-index: 5;
    }
    
    .hcb-mountain-snow-1 {
      position: absolute;
      bottom: -10%;
      right: -5%;
      width: 60%;
      height: 130%;
      background: linear-gradient(135deg, transparent 0%, transparent 30%, white 60%, #F7FAFC 100%);
      clip-path: polygon(100% 100%, 0% 100%, 40% 0%, 100% 20%);
      opacity: 0.9;
      z-index: 6;
    }
    
    /* Middle mountain (medium) */
    .hcb-mountain-layer-3 {
      position: absolute;
      bottom: -5%;
      left: 25%;
      width: 35%;
      height: 90%;
      background: linear-gradient(135deg, #4A5568 0%, #2D3748 100%);
      clip-path: polygon(0% 100%, 100% 100%, 50% 15%);
      z-index: 0;
    }
    
    .hcb-mountain-snow-3 {
      position: absolute;
      bottom: -5%;
      left: 25%;
      width: 35%;
      height: 90%;
      background: linear-gradient(135deg, transparent 0%, transparent 40%, white 70%, #F7FAFC 100%);
      clip-path: polygon(0% 100%, 100% 100%, 50% 15%);
      opacity: 0.9;
      z-index: 1;
    }
    
    /* Left mountain (shorter) */
    .hcb-mountain-layer-2 {
      position: absolute;
      bottom: -5%;
      left: -10%;
      width: 40%;
      height: 80%;
      background: linear-gradient(135deg, #718096 0%, #4A5568 50%);
      clip-path: polygon(0% 100%, 100% 100%, 70% 30%, 30% 0%);
      z-index: 5;
    }
    
    .hcb-mountain-snow-2 {
      position: absolute;
      bottom: -5%;
      left: -10%;
      width: 40%;
      height: 80%;
      background: linear-gradient(135deg, transparent 0%, transparent 30%, white 60%, #F7FAFC 100%);
      clip-path: polygon(0% 100%, 100% 100%, 70% 30%, 30% 0%);
      opacity: 0.9;
      z-index: 6;
    }
    
    /* Octocat climber */
    .hcb-climber {
      position: absolute;
      right: 15%;
      bottom: 35%;
      font-size: 48px;
      z-index: 7;
      animation: hcb-climb 3s ease-in-out infinite;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    }
    
    @keyframes hcb-climb {
      0%, 100% {
        transform: translateY(0) rotate(-5deg);
      }
      50% {
        transform: translateY(-8px) rotate(-8deg);
      }
    }
    
    /* Climbing rope */
    .hcb-rope {
      position: absolute;
      right: 18%;
      bottom: 45%;
      width: 3px;
      height: 60%;
      background: repeating-linear-gradient(
        0deg,
        #E53E3E,
        #E53E3E 10px,
        #C53030 10px,
        #C53030 20px
      );
      z-index: 6;
      opacity: 0.8;
      transform: rotate(-15deg);
      transform-origin: bottom;
      animation: hcb-rope-sway 3s ease-in-out infinite;
    }
    
    @keyframes hcb-rope-sway {
      0%, 100% {
        transform: rotate(-15deg);
      }
      50% {
        transform: rotate(-12deg);
      }
    }
    
    /* Text content */
    .hcb-mountain-text {
      position: absolute;
      top: 9%;
      left: 12%;
      max-width: 45%;
      z-index: 8;
    }
    
    .hcb-mountain-title {
      font-size: 18px;
      font-weight: 700;
      color: #2D3748;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }
    
    .hcb-mountain-subtitle {
      font-size: 13px;
      color: #4A5568;
      margin: 0;
      font-weight: 400;
      line-height: 1.5;
    }
    
    /* Single floating cloud */
    .hcb-cloud {
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 100px;
      z-index: 2;
      animation: hcb-float-cloud 20s ease-in-out infinite;
    }
    
    .hcb-cloud-1 {
      width: 60px;
      height: 20px;
      top: 10%;
      left: 10%;
    }
    
    .hcb-cloud-1::before {
      content: '';
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
      width: 30px;
      height: 20px;
      border-radius: 100px;
      top: -10px;
      left: 10px;
    }
    
    @keyframes hcb-float-cloud {
      0%, 100% {
        transform: translateX(0) translateY(0);
      }
      50% {
        transform: translateX(20px) translateY(-5px);
      }
    }
    
    /* Sun */
    .hcb-sun {
      position: absolute;
      top: 10%;
      right: 10%;
      width: 40px;
      height: 40px;
      background: #FBD38D;
      border-radius: 50%;
      z-index: 1;
      box-shadow: 0 0 20px rgba(251, 211, 141, 0.6);
    }
  `);
  
  container.innerHTML = `
    <div class="hcb-mountain-mode">
      <div class="hcb-sun"></div>
      <div class="hcb-cloud hcb-cloud-1"></div>
      
      <div class="hcb-mountain-bg">
        <div class="hcb-mountain-layer-1"></div>
        <div class="hcb-mountain-snow-1"></div>
        <div class="hcb-mountain-layer-3"></div>
        <div class="hcb-mountain-snow-3"></div>
        <div class="hcb-mountain-layer-2"></div>
        <div class="hcb-mountain-snow-2"></div>
      </div>
      
      <div class="hcb-rope"></div>
      <div class="hcb-climber">🐙</div>
      
      <div class="hcb-mountain-text">
        <h3 class="hcb-mountain-title">Your code could climb <span class="hcb-mountain-feet">${formattedFeet} feet</span> up Mount Everest</h3>
        <p class="hcb-mountain-subtitle">Keep pushing to new heights!</p>
      </div>
    </div>
  `;
}

export function loadFirefliesMode(container, contributionData) {
  // Use contribution data to determine number of fireflies
  const totalContributions = contributionData?.stats?.total || 0;
  const fireflyCount = Math.min(Math.max(totalContributions, 5), 50); // Min 5, max 50
  
  const fireflies = Array.from({ length: fireflyCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 2,
    moveDelay: Math.random() * 10,
    moveDuration: 8 + Math.random() * 4
  }));
  
  const firefliesHTML = fireflies.map(f => 
    `<div class="hcb-firefly-orb" style="
      left: ${f.x}%; 
      top: ${f.y}%; 
      animation-delay: ${f.delay}s, ${f.moveDelay}s;
      animation-duration: ${f.duration}s, ${f.moveDuration}s;
    "></div>`
  ).join('');
  
  injectCSS('fireflies-mode-css', `
    .hcb-fireflies-mode {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      position: relative;
      overflow: hidden;
    }
    
    /* Firefly orbs */
    .hcb-firefly-orb {
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, #d4ff00 0%, #88cc00 50%, transparent 70%);
      border-radius: 50%;
      z-index: 3;
      animation: hcb-glow 3s ease-in-out infinite, hcb-float-gentle 10s ease-in-out infinite;
    }
    
    @keyframes hcb-glow {
      0%, 100% {
        opacity: 0.2;
        box-shadow: 0 0 5px #d4ff00, 0 0 10px #d4ff00;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        box-shadow: 0 0 15px #d4ff00, 0 0 25px #d4ff00, 0 0 35px #88cc00;
        transform: scale(1.2);
      }
    }
    
    @keyframes hcb-float-gentle {
      0%, 100% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(15px, -20px);
      }
      50% {
        transform: translate(-10px, -10px);
      }
      75% {
        transform: translate(10px, 15px);
      }
    }
  `);
  
  container.innerHTML = `
    <div class="hcb-fireflies-mode">
      <div class="hcb-fireflies-bg">
        ${firefliesHTML}
      </div>
    </div>
  `;
}

export function loadXPMode(container, contributionData) {
  // Use real contribution data for progress
  const totalContributions = contributionData?.stats?.total || 0;
  
  // Define badge levels with increasing XP requirements
  const badges = [
    { name: 'Seedling', icon: '🌱', xpRequired: 50, color: '#48BB78' },
    { name: 'Sprout', icon: '🌿', xpRequired: 150, color: '#38A169' },
    { name: 'Tree', icon: '🌳', xpRequired: 500, color: '#2F855A' },
    { name: 'Forest', icon: '🌲', xpRequired: 2000, color: '#276749' }
  ];
  
  // Calculate progress for each badge
  const badgesProgress = badges.map((badge, index) => {
    const previousXP = index > 0 ? badges[index - 1].xpRequired : 0;
    const xpForThisLevel = badge.xpRequired - previousXP;
    const currentXP = Math.max(0, totalContributions - previousXP);
    const progress = Math.min(100, (currentXP / xpForThisLevel) * 100);
    const isUnlocked = totalContributions >= badge.xpRequired;
    const isInProgress = totalContributions >= previousXP && totalContributions < badge.xpRequired;
    
    return {
      ...badge,
      progress: Math.round(progress),
      isUnlocked,
      isInProgress,
      currentXP: Math.min(currentXP, xpForThisLevel),
      xpForThisLevel
    };
  });
  
  injectCSS('xp-mode-css', `
    .hcb-xp-mode {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      padding: 20px 20px;
    }
    
    .hcb-xp-header {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .hcb-xp-title {
      font-size: 18px;
      font-weight: 600;
      color: #24292e;
      margin: 0 0 4px 0;
      letter-spacing: -0.02em;
    }
    
    .hcb-xp-subtitle {
      font-size: 13px;
      color: #6a737d;
      margin: 0;
      font-weight: 400;
    }
    
    .hcb-xp-total {
      display: inline-block;
      font-weight: 600;
      color: #2bb041ff;
    }
    
    .hcb-badges-container {
      display: flex;
      gap: 12px;
      width: 100%;
      max-width: 100%;
      align-items: flex-end;
    }
    
    .hcb-badge-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    
    .hcb-badge-icon-wrapper {
      position: relative;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .hcb-badge-item.unlocked .hcb-badge-icon-wrapper {
      box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
      animation: hcb-badge-glow 2s ease-in-out infinite;
    }
    
    .hcb-badge-item.in-progress .hcb-badge-icon-wrapper {
      box-shadow: 0 3px 10px rgba(66, 153, 225, 0.2);
    }
    
    .hcb-badge-item.locked .hcb-badge-icon-wrapper {
      opacity: 0.4;
      filter: grayscale(100%);
    }
    
    @keyframes hcb-badge-glow {
      0%, 100% {
        box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
      }
      50% {
        box-shadow: 0 4px 16px rgba(72, 187, 120, 0.5);
      }
    }
    
    .hcb-badge-icon {
      font-size: 28px;
    }
    
    .hcb-badge-checkmark {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 18px;
      height: 18px;
      background: #48BB78;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .hcb-badge-info {
      text-align: center;
      width: 100%;
    }
    
    .hcb-badge-name {
      font-size: 11px;
      font-weight: 600;
      color: #24292e;
      margin: 0 0 3px 0;
    }
    
    .hcb-badge-item.locked .hcb-badge-name {
      color: #959da5;
    }
    
    .hcb-badge-xp {
      font-size: 9px;
      color: #6a737d;
      margin: 0 0 6px 0;
    }
    
    .hcb-progress-bar-container {
      width: 100%;
      height: 6px;
      background: #e1e4e8;
      border-radius: 3px;
      overflow: hidden;
      position: relative;
    }
    
    .hcb-progress-bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 1s ease-out;
      position: relative;
      overflow: hidden;
    }
    
    .hcb-badge-item.unlocked .hcb-progress-bar-fill {
      background: linear-gradient(90deg, #48BB78 0%, #68D391 100%);
    }
    
    .hcb-badge-item.in-progress .hcb-progress-bar-fill {
      background: linear-gradient(90deg, #42e14fff 0%, #63ed6fff 100%);
    }
    
    .hcb-badge-item.locked .hcb-progress-bar-fill {
      background: #cbd5e0;
    }
    
    .hcb-progress-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: hcb-shine 2s ease-in-out infinite;
    }
    
    @keyframes hcb-shine {
      0% {
        left: -100%;
      }
      100% {
        left: 200%;
      }
    }
    
    .hcb-progress-text {
      font-size: 8px;
      color: #6a737d;
      margin-top: 3px;
    }
  `);
  
  const badgesHTML = badgesProgress.map((badge) => {
    const statusClass = badge.isUnlocked ? 'unlocked' : badge.isInProgress ? 'in-progress' : 'locked';
    const checkmark = badge.isUnlocked ? '<div class="hcb-badge-checkmark">✓</div>' : '';
    const xpText = badge.isUnlocked 
      ? 'Unlocked!' 
      : `${badge.currentXP}/${badge.xpForThisLevel} XP`;
    
    return `
      <div class="hcb-badge-item ${statusClass}">
        <div class="hcb-badge-icon-wrapper">
          <div class="hcb-badge-icon">${badge.icon}</div>
          ${checkmark}
        </div>
        <div class="hcb-badge-info">
          <p class="hcb-badge-name">${badge.name}</p>
          <p class="hcb-badge-xp">${xpText}</p>
          <div class="hcb-progress-bar-container">
            <div class="hcb-progress-bar-fill" style="width: ${badge.progress}%;">
              ${badge.isInProgress ? '<div class="hcb-progress-shine"></div>' : ''}
            </div>
          </div>
          <p class="hcb-progress-text">${badge.progress}%</p>
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = `
    <div class="hcb-xp-mode">
      <div class="hcb-xp-header">
        <h3 class="hcb-xp-title">Achievement Progress</h3>
        <p class="hcb-xp-subtitle">
          <span class="hcb-xp-total">${totalContributions} XP</span> earned this year
        </p>
      </div>
      
      <div class="hcb-badges-container">
        ${badgesHTML}
      </div>
    </div>
  `;
}

export function injectCSS(id, css) {
  const oldStyle = document.getElementById(id);
  if (oldStyle) {
    oldStyle.remove();
  }
  
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}