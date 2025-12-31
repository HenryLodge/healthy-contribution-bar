import { loadQuoteMode, loadMountainMode, loadFirefliesMode, loadXPMode } from '../src/modes.js';

function validPage(callback) {
  const urlParts = window.location.pathname.split('/');
  const currentUsername = urlParts[1];
  
  if (!currentUsername || urlParts.length > 2) {
    callback(false);
    return;
  }
  
  chrome.storage.sync.get(['username'], (result) => {
    const savedUsername = result.username;
    if (savedUsername && currentUsername === savedUsername) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function getContributionData() {
  const contributionBar = document.querySelector('.js-yearly-contributions');
  if (!contributionBar) {
    return defaultData();
  }
  
  let totalContributions = 0;
  const h2 = document.getElementById('js-contribution-activity-description');
  
  if (h2) {
    const cleanText = h2.textContent.replace(/\s+/g, ' ').trim();
    const match = cleanText.match(/(\d+)\s+contribution/i);
    if (match) {
      totalContributions = parseInt(match[1]);
    }
  }
  
  const contributionDays = document.querySelectorAll('.ContributionCalendar-day');
  
  if (contributionDays.length === 0) {
    return defaultData();
  }
  
  const data = Array.from(contributionDays).map(rect => ({
    date: rect.getAttribute('data-date') || '',
    count: parseInt(rect.getAttribute('data-level') || '0'),
    level: parseInt(rect.getAttribute('data-level') || '0')
  }));
  const total = totalContributions > 0 ? totalContributions : data.reduce((sum, day) => sum + day.level, 0);
  
  return {
    days: data,
    stats: {total}
  };
}

function defaultData() {
  return {
    days: [],
    stats: {
      total: 0,
      activeDays: 0,
      totalDays: 365,
      max: 0,
      average: 0,
      progressPercentage: 0
    }
  };
}

let currentMode = null;

function applyCustomBar() {
  const contributionBar = document.querySelector('.js-yearly-contributions');
  if (!contributionBar) return false;

  chrome.storage.sync.get(['mode'], (result) => {
    const savedMode = result.mode || 'quote';
    
    if (currentMode === savedMode && document.getElementById('healthy-contrib-bar')) {
      return;
    }
    
    currentMode = savedMode;
    const graphSvg = contributionBar.querySelector('.js-calendar-graph-svg');
    if (graphSvg) {
      graphSvg.style.visibility = 'hidden';
    }
    
    const contributionData = getContributionData();
    contributionBar.style.position = 'relative';
    
    let customContainer = document.getElementById('healthy-contrib-bar');
    if (!customContainer) {
      customContainer = document.createElement('div');
      customContainer.id = 'healthy-contrib-bar';
      Object.assign(customContainer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '10',
        borderRadius: '6px',
        overflow: 'hidden'
      });
      contributionBar.appendChild(customContainer);
    }
    
    customContainer.innerHTML = '';
    const modes = { quote: loadQuoteMode, mountain: loadMountainMode, fireflies: loadFirefliesMode, xp: loadXPMode };
    modes[savedMode]?.(customContainer, contributionData);
  });
  
  return true;
}

function changeContributionBar() {
  validPage((isValid) => {
    if (!isValid) {
      currentMode = null;
      return;
    }
    
    if (!applyCustomBar()) {
      let attempts = 0;
      const tryChange = () => {
        if (applyCustomBar() || ++attempts >= 10) {
          observerSetup();
          navListenerSetup();
        } else {
          setTimeout(tryChange, 200);
        }
      };
      tryChange();
    } else {
      observerSetup();
      navListenerSetup();
    }
  });
}

function observerSetup() {
  const observer = new MutationObserver(() => {
    if (document.querySelector('.js-yearly-contributions') && !document.getElementById('healthy-contrib-bar')) {
      applyCustomBar();
    }
  });
  observer.observe(document.querySelector('main') || document.body, {childList: true, subtree: true});
}

function navListenerSetup() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button')) {
      currentMode = null;
      [200, 400, 600, 800, 1000].forEach(delay => setTimeout(applyCustomBar, delay));
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', changeContributionBar);
} else {
  changeContributionBar();
}

let lastLoc = location.href;
new MutationObserver(() => {
  if (location.href !== lastLoc) {
    lastLoc = location.href;
    currentMode = null;
    changeContributionBar();
  }
}).observe(document.body, { childList: true, subtree: true });