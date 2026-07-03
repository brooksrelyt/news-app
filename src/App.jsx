import React, { useState, useMemo } from 'react';
import { IOSDevice } from './IOSDevice.jsx';
import { CATEGORIES, ARTICLES } from './data.js';

// ── Theme — edit these to restyle the whole app ───────────────────────────
const THEME = {
  accentColor: '#2F4E6B',
  headlineFont: 'Source Serif 4', // or 'Lora'
  density: 'Compact', // 'Comfortable' | 'Compact'
};

const PAGE_SIZE = 5;

function Story({ story, style, imgSize = 76 }) {
  return (
    <div onClick={story.onClick} style={style}>
      <img
        src={story.image}
        alt=""
        style={{ width: imgSize, height: imgSize, flexShrink: 0, borderRadius: 8, objectFit: 'cover', background: '#DFD8C8' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 0.7, textTransform: 'uppercase', color: THEME.accentColor }}>{story.category}</div>
        <div style={{
          fontFamily: `'${THEME.headlineFont}', serif`, fontWeight: 600, fontSize: 15.5, lineHeight: 1.28, color: '#211D18', marginTop: 3,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{story.title}</div>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, color: 'rgba(33,29,24,0.5)', marginTop: 5 }}>{story.author} &nbsp;·&nbsp; {story.time}</div>
      </div>
    </div>
  );
}

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

  const accentColor = THEME.accentColor;
  const headlineFontFamily = `'${THEME.headlineFont}', serif`;
  const rowPad = THEME.density === 'Compact' ? '10px 0' : '14px 0';

  const rowStyle = {
    display: 'flex', gap: 14, alignItems: 'flex-start',
    padding: rowPad, cursor: 'pointer',
    borderBottom: '1px solid rgba(33,29,24,0.08)',
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

  const homeTabColor = (!searchOpen && screen === 'home') ? accentColor : 'rgba(33,29,24,0.45)';
  const categoriesTabColor = (!searchOpen && screen === 'categories') ? accentColor : 'rgba(33,29,24,0.45)';
  const mediaTabColor = (!searchOpen && screen === 'media') ? accentColor : 'rgba(33,29,24,0.45)';
  const searchTabColor = searchOpen ? accentColor : 'rgba(33,29,24,0.45)';

  const fixedHeader = { flexShrink: 0, paddingTop: 58, boxSizing: 'border-box', background: '#F7F3EA', position: 'relative', zIndex: 5 };
  const scrollArea = { flex: 1, minHeight: 0, overflowY: 'auto' };

  return (
    <div style={{
      width: '100%', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#EDE7DB', padding: '48px 24px', boxSizing: 'border-box', fontFamily: "'Work Sans',sans-serif",
    }}>
      <IOSDevice width={390} height={844}>
        <div style={{ width: '100%', height: '100%', background: '#F7F3EA', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

          {/* ============ HOME ============ */}
          {showHome && (
            <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={fixedHeader}>
                <div style={{ padding: '6px 20px 14px', borderBottom: '1px solid rgba(33,29,24,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={openMenu} style={{ width: 32, height: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, cursor: 'pointer', flexShrink: 0 }}>
                      <div style={{ width: 20, height: 1.6, background: '#211D18' }} />
                      <div style={{ width: 20, height: 1.6, background: '#211D18' }} />
                      <div style={{ width: 20, height: 1.6, background: '#211D18' }} />
                    </div>
                    <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 24, letterSpacing: 0.5, color: '#211D18' }}>THE SIGNAL</div>
                    <div onClick={goLogin} style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(33,29,24,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" fill="#211D18" /><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="#211D18" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 12, color: 'rgba(33,29,24,0.55)', marginTop: 2, letterSpacing: 0.3 }}>Thursday, July 2, 2026 &nbsp;·&nbsp; Technology Edition</div>
                </div>
              </div>

              <div style={scrollArea}>
                {/* Categories */}
                <div style={{ display: 'flex', gap: 8, padding: '14px 20px', overflowX: 'auto' }}>
                  {CATEGORIES.map((name) => {
                    const active = name === category;
                    return (
                      <div key={name} onClick={() => selectCategory(name)} style={{
                        flexShrink: 0, fontFamily: "'Work Sans',sans-serif", fontSize: 13, fontWeight: 500,
                        padding: '7px 15px', borderRadius: 100, cursor: 'pointer', whiteSpace: 'nowrap',
                        background: active ? accentColor : 'transparent', color: active ? '#FBF7EF' : '#211D18',
                        border: active ? `1px solid ${accentColor}` : '1px solid rgba(33,29,24,0.25)',
                      }}>{name}</div>
                    );
                  })}
                </div>

                {/* Featured */}
                {hasFeatured && (
                  <>
                    <div style={{ padding: '4px 20px 8px' }}>
                      <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: 'rgba(33,29,24,0.45)', textTransform: 'uppercase' }}>{featuredLabel}</div>
                    </div>
                    {category === 'All' ? (
                      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 22px' }}>
                        {featured.map((story) => (
                          <div key={story.id} onClick={story.onClick} style={{ width: 250, flexShrink: 0, cursor: 'pointer' }}>
                            <img src={story.image} alt="" style={{ width: '100%', height: 150, borderRadius: 10, objectFit: 'cover', background: '#DFD8C8' }} />
                            <div style={{ marginTop: 10, fontFamily: "'Work Sans',sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: accentColor }}>{story.category}</div>
                            <div style={{ fontFamily: headlineFontFamily, fontWeight: 600, fontSize: 18, lineHeight: 1.28, color: '#211D18', marginTop: 4 }}>{story.title}</div>
                            <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11.5, color: 'rgba(33,29,24,0.5)', marginTop: 6 }}>{story.author} &nbsp;·&nbsp; {story.time}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div onClick={featuredSingle.onClick} style={{ padding: '0 20px 22px', cursor: 'pointer' }}>
                        <img src={featuredSingle.image} alt="" style={{ width: '100%', height: 190, borderRadius: 10, objectFit: 'cover', background: '#DFD8C8' }} />
                        <div style={{ marginTop: 10, fontFamily: "'Work Sans',sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: accentColor }}>{featuredSingle.category}</div>
                        <div style={{ fontFamily: headlineFontFamily, fontWeight: 600, fontSize: 19, lineHeight: 1.28, color: '#211D18', marginTop: 4 }}>{featuredSingle.title}</div>
                        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11.5, color: 'rgba(33,29,24,0.5)', marginTop: 6 }}>{featuredSingle.author} &nbsp;·&nbsp; {featuredSingle.time}</div>
                      </div>
                    )}
                  </>
                )}

                {/* Recent */}
                <div style={{ padding: '4px 20px 8px' }}>
                  <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: 'rgba(33,29,24,0.45)', textTransform: 'uppercase' }}>Recent Stories</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 20px 40px' }}>
                  {recent.map((story) => <Story key={story.id} story={story} style={rowStyle} />)}
                  {recent.length === 0 && (
                    <div style={{ padding: '40px 0', textAlign: 'center', fontFamily: "'Work Sans',sans-serif", fontSize: 13, color: 'rgba(33,29,24,0.4)' }}>No stories in this category yet.</div>
                  )}
                  {hasMore && (
                    <div onClick={loadMore} style={{ textAlign: 'center', padding: '14px 0 6px', fontFamily: "'Work Sans',sans-serif", fontSize: 13.5, fontWeight: 600, color: accentColor, cursor: 'pointer' }}>Load More</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============ SEARCH ============ */}
          {showSearch && (
            <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={fixedHeader}>
                <div style={{ padding: '6px 20px 18px' }}>
                  <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: '#211D18' }}>Search</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px 14px' }}>
                  <input
                    type="text" autoFocus placeholder="Search stories, authors, topics"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ flex: 1, fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(33,29,24,0.3)', background: '#FBF7EF', color: '#211D18', outline: 'none', boxSizing: 'border-box' }}
                  />
                  <div onClick={closeSearch} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 14, color: accentColor, cursor: 'pointer', flexShrink: 0 }}>Cancel</div>
                </div>
              </div>
              <div style={{ ...scrollArea, display: 'flex', flexDirection: 'column', padding: '8px 20px 40px' }}>
                {searchResults.map((story) => <Story key={story.id} story={story} style={rowStyle} />)}
                {q.length > 0 && searchResults.length === 0 && (
                  <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: "'Work Sans',sans-serif", fontSize: 13.5, color: 'rgba(33,29,24,0.45)' }}>No stories match "{searchQuery}".</div>
                )}
                {q.length === 0 && (
                  <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                    <svg width="34" height="34" viewBox="0 0 19 19" fill="none" style={{ marginBottom: 14 }}><circle cx="8" cy="8" r="6.3" stroke="rgba(33,29,24,0.3)" strokeWidth="1.6" /><line x1="12.6" y1="12.6" x2="17.5" y2="17.5" stroke="rgba(33,29,24,0.3)" strokeWidth="1.6" strokeLinecap="round" /></svg>
                    <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 13.5, color: 'rgba(33,29,24,0.45)', lineHeight: 1.6 }}>Type a title, author, or topic to search — matching stories will appear below.</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============ ARTICLE ============ */}
          {showArticle && (
            <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#F7F3EA' }}>
              <div style={fixedHeader}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 20px 14px' }}>
                  <div onClick={closeArticle} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 15, color: '#211D18', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 18 }}>&larr;</span> Back
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 12.5, color: '#211D18', border: '1px solid rgba(33,29,24,0.3)', borderRadius: 100, padding: '6px 14px' }}>Save</div>
                    <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 12.5, color: '#211D18', border: '1px solid rgba(33,29,24,0.3)', borderRadius: 100, padding: '6px 14px' }}>Share</div>
                  </div>
                </div>
              </div>
              <div style={{ ...scrollArea, padding: '0 20px' }}>
                <img src={selected.image} alt="" style={{ width: '100%', height: 200, borderRadius: 10, objectFit: 'cover', background: '#DFD8C8' }} />
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: accentColor, marginTop: 16 }}>{selected.category}</div>
                <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 26, lineHeight: 1.25, color: '#211D18', marginTop: 8 }}>{selected.title}</div>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 13, color: 'rgba(33,29,24,0.55)', marginTop: 12, paddingBottom: 16, borderBottom: '1px solid rgba(33,29,24,0.12)' }}>
                  By {selected.author} &nbsp;·&nbsp; {selected.time} &nbsp;·&nbsp; {selected.readMins} min read
                </div>
                <div style={{ fontFamily: headlineFontFamily, fontWeight: 400, fontSize: 16.5, lineHeight: 1.35, color: '#211D18', marginTop: 16 }}>{selected.dek}</div>
                {selected.body.map((para, i) => (
                  <div key={i} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 15.5, lineHeight: 1.68, color: '#2E2A24', marginTop: 16 }}>{para}</div>
                ))}
                <div style={{ height: 40 }} />
              </div>
            </div>
          )}

          {/* ============ ABOUT ============ */}
          {showAbout && (
            <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={fixedHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 20px 18px' }}>
                  <div onClick={goHome} style={{ fontSize: 18, color: '#211D18', cursor: 'pointer' }}>&larr;</div>
                  <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 20, color: '#211D18' }}>About</div>
                </div>
              </div>
              <div style={{ ...scrollArea, padding: '0 20px 40px' }}>
                <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: '#211D18', marginBottom: 14 }}>THE SIGNAL</div>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 15, lineHeight: 1.68, color: '#2E2A24' }}>
                  The Signal covers the technology stories shaping how people build, work, and live — from AI and hardware to startups, security, and space. Founded on the idea that tech journalism should be as rigorous as it is readable, our small team reports daily from the front lines of the industry.
                </div>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 15, lineHeight: 1.68, color: '#2E2A24', marginTop: 16 }}>
                  Have a tip or a correction? Reach the newsroom at tips@thesignal.example.
                </div>
              </div>
            </div>
          )}

          {/* ============ TOPIC ============ */}
          {showTopic && (
            <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={fixedHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 20px 18px' }}>
                  <div onClick={goHome} style={{ fontSize: 18, color: '#211D18', cursor: 'pointer' }}>&larr;</div>
                  <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 20, color: '#211D18' }}>{topic}</div>
                </div>
              </div>
              <div style={scrollArea}>
                {topicFeatured && (
                  <div style={{ padding: '0 20px 22px' }}>
                    <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: 'rgba(33,29,24,0.45)', textTransform: 'uppercase', marginBottom: 10 }}>Featured in {topic}</div>
                    <div onClick={topicFeatured.onClick} style={{ cursor: 'pointer' }}>
                      <img src={topicFeatured.image} alt="" style={{ width: '100%', height: 170, borderRadius: 10, objectFit: 'cover', background: '#DFD8C8' }} />
                      <div style={{ fontFamily: headlineFontFamily, fontWeight: 600, fontSize: 19, lineHeight: 1.28, color: '#211D18', marginTop: 10 }}>{topicFeatured.title}</div>
                      <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11.5, color: 'rgba(33,29,24,0.5)', marginTop: 6 }}>{topicFeatured.author} &nbsp;·&nbsp; {topicFeatured.time}</div>
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0 20px 40px' }}>
                  {topicArticles.map((story) => <Story key={story.id} story={story} style={rowStyle} />)}
                  {topicArticlesFull.length === 0 && (
                    <div style={{ padding: '40px 0', textAlign: 'center', fontFamily: "'Work Sans',sans-serif", fontSize: 13, color: 'rgba(33,29,24,0.4)' }}>No stories in this topic yet.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============ LOGIN ============ */}
          {showLogin && (
            <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={fixedHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 20px 18px' }}>
                  <div onClick={goHome} style={{ fontSize: 18, color: '#211D18', cursor: 'pointer' }}>&larr;</div>
                  <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 20, color: '#211D18' }}>Log In</div>
                </div>
              </div>
              <div style={{ ...scrollArea, padding: '8px 20px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 13.5, color: 'rgba(33,29,24,0.6)' }}>Sign in to save stories and personalize your feed.</div>
                <input
                  type="text" placeholder="Email or username" value={loginName} onChange={(e) => setLoginName(e.target.value)}
                  style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, padding: '13px 14px', borderRadius: 8, border: '1px solid rgba(33,29,24,0.3)', background: '#FBF7EF', color: '#211D18', outline: 'none', boxSizing: 'border-box' }}
                />
                <input
                  type="password" placeholder="Password"
                  style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, padding: '13px 14px', borderRadius: 8, border: '1px solid rgba(33,29,24,0.3)', background: '#FBF7EF', color: '#211D18', outline: 'none', boxSizing: 'border-box' }}
                />
                <div onClick={doLogin} style={{ textAlign: 'center', fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, fontWeight: 600, color: '#FBF7EF', background: accentColor, borderRadius: 8, padding: '13px 14px', cursor: 'pointer', marginTop: 6 }}>Log In</div>
              </div>
            </div>
          )}

          {/* ============ CATEGORIES / TOPICS ============ */}
          {showCategories && (
            <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={fixedHeader}>
                <div style={{ padding: '6px 20px 18px' }}>
                  <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: '#211D18' }}>Topics</div>
                </div>
              </div>
              <div style={{ ...scrollArea, display: 'flex', flexDirection: 'column', padding: '0 20px 40px' }}>
                {allCategoriesInfo.map((cat) => (
                  <div key={cat.name} onClick={cat.onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(33,29,24,0.1)', cursor: 'pointer' }}>
                    <div style={{ fontFamily: headlineFontFamily, fontWeight: 600, fontSize: 18, color: '#211D18' }}>{cat.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 13, color: 'rgba(33,29,24,0.45)' }}>{cat.count} stories</div>
                      <div style={{ fontSize: 16, color: 'rgba(33,29,24,0.35)' }}>&rsaquo;</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ MEDIA ============ */}
          {showMedia && (
            <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={fixedHeader}>
                <div style={{ padding: '6px 20px 18px' }}>
                  <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: '#211D18' }}>Media</div>
                </div>
              </div>
              <div style={{ ...scrollArea, padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <svg width="88" height="88" viewBox="0 0 19 19" fill="none"><circle cx="9.5" cy="9.5" r="8.2" stroke="#C9C2B4" strokeWidth="1.2" /><path d="M7.8 6.3L13 9.5L7.8 12.7V6.3Z" fill="#C9C2B4" /></svg>
                <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: '#211D18', marginTop: 24 }}>Coming Soon</div>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, lineHeight: 1.6, color: 'rgba(33,29,24,0.6)', marginTop: 10, maxWidth: 280 }}>
                  Video briefings and original reporting from The Signal newsroom are on their way. Check back soon.
                </div>
              </div>
            </div>
          )}

          {/* ============ BOTTOM TAB BAR ============ */}
          {!showArticle && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '9px 0 20px', borderTop: '1px solid rgba(33,29,24,0.1)', background: '#F7F3EA', flexShrink: 0 }}>
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

          {/* ============ SIDE MENU ============ */}
          {menuOpen && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
              <div onClick={closeMenu} style={{ position: 'absolute', inset: 0, background: 'rgba(33,29,24,0.35)' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '78%', maxWidth: 300, background: '#F7F3EA', boxShadow: '2px 0 20px rgba(0,0,0,0.15)', overflowY: 'auto', padding: '58px 0 24px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px 18px', borderBottom: '1px solid rgba(33,29,24,0.1)' }}>
                  <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 20, color: '#211D18' }}>Menu</div>
                  <div onClick={closeMenu} style={{ fontSize: 18, color: '#211D18', cursor: 'pointer' }}>&times;</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                  <div onClick={goHome} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, color: '#211D18', padding: '11px 0', cursor: 'pointer' }}>Home</div>
                  <div onClick={goAbout} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, color: '#211D18', padding: '11px 0', cursor: 'pointer' }}>About</div>
                </div>
                <div style={{ padding: '10px 20px 4px', fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: 'rgba(33,29,24,0.45)', textTransform: 'uppercase' }}>Topics</div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 20px' }}>
                  {topicMenuItems.map((item) => (
                    <div key={item.label} onClick={item.onClick} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, color: '#211D18', padding: '11px 0', cursor: 'pointer' }}>
                      {item.label} <span style={{ color: 'rgba(33,29,24,0.4)' }}>{item.count}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '10px 20px 0', borderTop: '1px solid rgba(33,29,24,0.1)', marginTop: 8 }}>
                  <div onClick={loggedIn ? doLogout : goLogin} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, fontWeight: 600, color: accentColor, padding: '15px 0 4px', cursor: 'pointer' }}>
                    {loggedIn ? 'Log Out' : 'Log In'}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </IOSDevice>
    </div>
  );
}
