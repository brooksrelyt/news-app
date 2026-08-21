import { Story } from './Story.jsx';

export function Search({ theme, storyTheme, searchQuery, setSearchQuery, closeSearch, searchResults, q }) {
  const { textPrimary, accentText, inputBg, headlineFontFamily, rowStyle, fixedHeader, scrollArea, textColor } = theme;

  return (
    <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={fixedHeader}>
        <div style={{ padding: '6px 20px 18px' }}>
          <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: textPrimary }}>Search</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px 14px' }}>
          <input
            type="text" autoFocus placeholder="Search stories, authors, topics"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, padding: '11px 14px', borderRadius: 8, border: `1px solid ${textColor(0.3)}`, background: inputBg, color: textPrimary, outline: 'none', boxSizing: 'border-box' }}
          />
          <div onClick={closeSearch} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 14, color: accentText, cursor: 'pointer', flexShrink: 0 }}>Cancel</div>
        </div>
      </div>
      <div style={{ ...scrollArea, display: 'flex', flexDirection: 'column', padding: '8px 20px 40px' }}>
        {searchResults.map((story) => <Story key={story.id} story={story} style={rowStyle} theme={storyTheme} />)}
        {q.length > 0 && searchResults.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: "'Work Sans',sans-serif", fontSize: 13.5, color: textColor(0.45) }}>No stories match "{searchQuery}".</div>
        )}
        {q.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <svg width="34" height="34" viewBox="0 0 19 19" fill="none" style={{ marginBottom: 14 }}><circle cx="8" cy="8" r="6.3" stroke={textColor(0.3)} strokeWidth="1.6" /><line x1="12.6" y1="12.6" x2="17.5" y2="17.5" stroke={textColor(0.3)} strokeWidth="1.6" strokeLinecap="round" /></svg>
            <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 13.5, color: textColor(0.45), lineHeight: 1.6 }}>Type a title, author, or topic to search — matching stories will appear below.</div>
          </div>
        )}
      </div>
    </div>
  );
}
