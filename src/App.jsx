import React, { useState, useEffect } from 'react';
import { IOSDevice } from './IOSDevice.jsx';
import { CATEGORIES, ARTICLES } from './data.js';
import { THEME } from './theme.js';
import { Home } from './components/Home.jsx';
import { Search } from './components/Search.jsx';
import { Article } from './components/Article.jsx';
import { About } from './components/About.jsx';
import { Topic } from './components/Topic.jsx';
import { Login } from './components/Login.jsx';
import { Categories } from './components/Categories.jsx';
import { Media } from './components/Media.jsx';
import { SideMenu } from './components/SideMenu.jsx';

const PAGE_SIZE = 5;
const DARK_MODE_KEY = 'signal-dark-mode';

export default function App() {
  const [category, setCategory] = useState('All');
  const [articleId, setArticleId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [screen, setScreen] = useState('home'); // home | about | topic | login | categories | media
  const [menuOpen, setMenuOpen] = useState(false);
  const [topic, setTopic] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(DARK_MODE_KEY);
      if (saved !== null) return saved === 'true';
    } catch {}
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    try { localStorage.setItem(DARK_MODE_KEY, String(darkMode)); } catch {}
  }, [darkMode]);

  // ── Theme colors — swap between light/dark palettes ─────────────────────
  const rgbBase = darkMode ? '237,234,226' : '33,29,24';
  const textColor = (a) => `rgba(${rgbBase},${a})`;
  const textPrimary = darkMode ? '#EDEAE2' : '#211D18';
  const bodyText = darkMode ? '#D7D3C9' : '#2E2A24';
  const outerBg = darkMode ? '#000000' : '#EDE7DB';
  const appBg = darkMode ? '#151516' : '#F7F3EA';
  const inputBg = darkMode ? '#232325' : '#FBF7EF';
  const imagePlaceholder = darkMode ? '#3A3A3C' : '#DFD8C8';
  const placeholderIcon = darkMode ? '#5A5A5C' : '#C9C2B4';
  const onAccentText = '#FBF7EF';
  const accentColor = THEME.accentColor;
  const accentText = darkMode ? '#8FBBE0' : THEME.accentColor;
  const storyTheme = { accent: accentText, text: textPrimary, muted: textColor(0.5), placeholder: imagePlaceholder };

  const headlineFontFamily = `'${THEME.headlineFont}', serif`;
  const rowPad = THEME.density === 'Compact' ? '10px 0' : '14px 0';

  const rowStyle = {
    display: 'flex', gap: 14, alignItems: 'flex-start',
    padding: rowPad, cursor: 'pointer',
    borderBottom: `1px solid ${textColor(0.08)}`,
  };

  const fixedHeader = { flexShrink: 0, paddingTop: 58, boxSizing: 'border-box', background: appBg, position: 'relative', zIndex: 5 };
  const scrollArea = { flex: 1, minHeight: 0, overflowY: 'auto' };

  const theme = {
    appBg, textPrimary, bodyText, textColor, accentColor, accentText, onAccentText,
    inputBg, imagePlaceholder, placeholderIcon, headlineFontFamily, rowStyle, fixedHeader, scrollArea,
  };

  const selectCategory = (c) => { setCategory(c); setArticleId(null); setVisibleCount(PAGE_SIZE); };
  const openArticle = (id) => setArticleId(id);
  const closeArticle = () => setArticleId(null);
  const loadMore = () => setVisibleCount((v) => v + PAGE_SIZE);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const goHome = () => { setScreen('home'); setMenuOpen(false); setArticleId(null); setSearchOpen(false); };
  const goAbout = () => { setScreen('about'); setMenuOpen(false); setArticleId(null); setSearchOpen(false); };
  const goCategories = () => { setScreen('categories'); setMenuOpen(false); setArticleId(null); setSearchOpen(false); };
  const goMedia = () => { setScreen('media'); setMenuOpen(false); setArticleId(null); setSearchOpen(false); };
  const goTopic = (cat) => { setScreen('topic'); setTopic(cat); setMenuOpen(false); setArticleId(null); setSearchOpen(false); };
  const goLogin = () => { setScreen('login'); setMenuOpen(false); setArticleId(null); setSearchOpen(false); };
  const doLogin = () => { setLoggedIn(true); setScreen('home'); };
  const doLogout = () => { setLoggedIn(false); setMenuOpen(false); setScreen('home'); };
  const toggleDarkMode = () => setDarkMode((d) => !d);

  const openSearch = () => { setSearchOpen(true); setMenuOpen(false); setArticleId(null); };
  const closeSearch = () => { setSearchOpen(false); setSearchQuery(''); };

  const withHandlers = (list) => list.map((a) => ({ ...a, onClick: () => openArticle(a.id) }));

  const filtered = category === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === category);

  let featured, listSource, featuredLabel;
  if (category === 'All') {
    featured = withHandlers(ARTICLES.filter((a) => a.featured));
    listSource = filtered;
    featuredLabel = 'Featured Stories';
  } else {
    const pick = filtered.find((a) => a.featured) || filtered[0] || null;
    featured = pick ? withHandlers([pick]) : [];
    listSource = pick ? filtered.filter((a) => a.id !== pick.id) : filtered;
    featuredLabel = `Featured in ${category}`;
  }
  const recent = withHandlers(listSource.slice(0, visibleCount));
  const hasMore = listSource.length > visibleCount;
  const hasFeatured = featured.length > 0;
  const featuredSingle = featured[0] || null;

  const selected = ARTICLES.find((a) => a.id === articleId) || null;

  const topicArticlesFull = topic ? withHandlers(ARTICLES.filter((a) => a.category === topic)) : [];
  const topicFeatured = topicArticlesFull[0] || null;
  const topicArticles = topicArticlesFull.slice(1);

  const topicMenuItems = CATEGORIES.filter((c) => c !== 'All').map((c) => ({
    label: c,
    count: `(${ARTICLES.filter((a) => a.category === c).length})`,
    onClick: () => goTopic(c),
  }));

  const allCategoriesInfo = CATEGORIES.filter((c) => c !== 'All').map((c) => ({
    name: c,
    count: ARTICLES.filter((a) => a.category === c).length,
    onClick: () => goTopic(c),
  }));

  const q = searchQuery.trim().toLowerCase();
  const searchResults = q
    ? withHandlers(ARTICLES.filter((a) =>
        a.title.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      ))
    : [];

  const showArticle = articleId !== null;
  const showHome = !showArticle && !searchOpen && screen === 'home';
  const showAbout = !showArticle && !searchOpen && screen === 'about';
  const showTopic = !showArticle && !searchOpen && screen === 'topic';
  const showLogin = !showArticle && !searchOpen && screen === 'login';
  const showCategories = !showArticle && !searchOpen && screen === 'categories';
  const showMedia = !showArticle && !searchOpen && screen === 'media';
  const showSearch = !showArticle && searchOpen;

  const homeTabColor = (!searchOpen && screen === 'home') ? accentText : textColor(0.45);
  const categoriesTabColor = (!searchOpen && screen === 'categories') ? accentText : textColor(0.45);
  const mediaTabColor = (!searchOpen && screen === 'media') ? accentText : textColor(0.45);
  const searchTabColor = searchOpen ? accentText : textColor(0.45);

  return (
    <div style={{
      width: '100%', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: outerBg, padding: '48px 24px', boxSizing: 'border-box', fontFamily: "'Work Sans',sans-serif",
    }}>
      <IOSDevice width={390} height={844} dark={darkMode}>
        <div style={{ width: '100%', height: '100%', background: appBg, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

          {showHome && (
            <Home
              theme={theme} storyTheme={storyTheme} openMenu={openMenu} goLogin={goLogin}
              category={category} selectCategory={selectCategory} hasFeatured={hasFeatured}
              featuredLabel={featuredLabel} featured={featured} featuredSingle={featuredSingle}
              recent={recent} hasMore={hasMore} loadMore={loadMore}
            />
          )}

          {showSearch && (
            <Search
              theme={theme} storyTheme={storyTheme} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              closeSearch={closeSearch} searchResults={searchResults} q={q}
            />
          )}

          {showArticle && <Article theme={theme} closeArticle={closeArticle} selected={selected} />}

          {showAbout && <About theme={theme} goHome={goHome} />}

          {showTopic && (
            <Topic
              theme={theme} storyTheme={storyTheme} goHome={goHome} topic={topic}
              topicFeatured={topicFeatured} topicArticles={topicArticles} topicArticlesFull={topicArticlesFull}
            />
          )}

          {showLogin && (
            <Login theme={theme} goHome={goHome} loginName={loginName} setLoginName={setLoginName} doLogin={doLogin} />
          )}

          {showCategories && <Categories theme={theme} allCategoriesInfo={allCategoriesInfo} />}

          {showMedia && <Media theme={theme} />}

          {/* ============ BOTTOM TAB BAR ============ */}
          {!showArticle && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '9px 0 20px', borderTop: `1px solid ${textColor(0.1)}`, background: appBg, flexShrink: 0 }}>
              <div onClick={goHome} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none"><path d="M1.5 8.5L10.5 1L19.5 8.5" stroke={homeTabColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 7V17.5H17V7" stroke={homeTabColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 10.5, fontWeight: 600, color: homeTabColor }}>Home</div>
              </div>
              <div onClick={goCategories} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <rect x="1" y="1" width="7.5" height="7.5" rx="1.5" stroke={categoriesTabColor} strokeWidth="1.8" />
                  <rect x="10.5" y="1" width="7.5" height="7.5" rx="1.5" stroke={categoriesTabColor} strokeWidth="1.8" />
                  <rect x="1" y="10.5" width="7.5" height="7.5" rx="1.5" stroke={categoriesTabColor} strokeWidth="1.8" />
                  <rect x="10.5" y="10.5" width="7.5" height="7.5" rx="1.5" stroke={categoriesTabColor} strokeWidth="1.8" />
                </svg>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 10.5, fontWeight: 600, color: categoriesTabColor }}>Topics</div>
              </div>
              <div onClick={goMedia} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="9.5" cy="9.5" r="8.2" stroke={mediaTabColor} strokeWidth="1.8" /><path d="M7.8 6.3L13 9.5L7.8 12.7V6.3Z" fill={mediaTabColor} /></svg>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 10.5, fontWeight: 600, color: mediaTabColor }}>Media</div>
              </div>
              <div onClick={openSearch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><circle cx="8" cy="8" r="6.3" stroke={searchTabColor} strokeWidth="1.8" /><line x1="12.6" y1="12.6" x2="17.5" y2="17.5" stroke={searchTabColor} strokeWidth="1.8" strokeLinecap="round" /></svg>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 10.5, fontWeight: 600, color: searchTabColor }}>Search</div>
              </div>
            </div>
          )}

          {menuOpen && (
            <SideMenu
              theme={theme} closeMenu={closeMenu} goHome={goHome} goAbout={goAbout}
              topicMenuItems={topicMenuItems} darkMode={darkMode} toggleDarkMode={toggleDarkMode}
              loggedIn={loggedIn} doLogout={doLogout} goLogin={goLogin}
            />
          )}

        </div>
      </IOSDevice>
    </div>
  );
}
