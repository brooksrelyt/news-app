import { CATEGORIES } from '../data.js';
import { Story } from './Story.jsx';

export function Home({
  theme, storyTheme, openMenu, goLogin, category, selectCategory,
  hasFeatured, featuredLabel, featured, featuredSingle, recent, hasMore, loadMore,
}) {
  const { appBg, textPrimary, accentColor, accentText, onAccentText, imagePlaceholder, headlineFontFamily, rowStyle, fixedHeader, scrollArea, textColor } = theme;

  return (
    <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={fixedHeader}>
        <div style={{ padding: '6px 20px 14px', borderBottom: `1px solid ${textColor(0.1)}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div onClick={openMenu} style={{ width: 32, height: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ width: 20, height: 1.6, background: textPrimary }} />
              <div style={{ width: 20, height: 1.6, background: textPrimary }} />
              <div style={{ width: 20, height: 1.6, background: textPrimary }} />
            </div>
            <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 24, letterSpacing: 0.5, color: textPrimary }}>THE SIGNAL</div>
            <div onClick={goLogin} style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${textColor(0.35)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" fill={textPrimary} /><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke={textPrimary} strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
            </div>
          </div>
          <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 12, color: textColor(0.55), marginTop: 2, letterSpacing: 0.3 }}>Thursday, July 2, 2026 &nbsp;·&nbsp; Technology Edition</div>
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
                background: active ? accentColor : 'transparent', color: active ? onAccentText : textPrimary,
                border: active ? `1px solid ${accentColor}` : `1px solid ${textColor(0.25)}`,
              }}>{name}</div>
            );
          })}
        </div>

        {/* Featured */}
        {hasFeatured && (
          <>
            <div style={{ padding: '4px 20px 8px' }}>
              <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: textColor(0.45), textTransform: 'uppercase' }}>{featuredLabel}</div>
            </div>
            {category === 'All' ? (
              <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 22px' }}>
                {featured.map((story) => (
                  <div key={story.id} onClick={story.onClick} style={{ width: 250, flexShrink: 0, cursor: 'pointer' }}>
                    <img src={story.image} alt="" style={{ width: '100%', height: 150, borderRadius: 10, objectFit: 'cover', background: imagePlaceholder }} />
                    <div style={{ marginTop: 10, fontFamily: "'Work Sans',sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: accentText }}>{story.category}</div>
                    <div style={{ fontFamily: headlineFontFamily, fontWeight: 600, fontSize: 18, lineHeight: 1.28, color: textPrimary, marginTop: 4 }}>{story.title}</div>
                    <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11.5, color: textColor(0.5), marginTop: 6 }}>{story.author} &nbsp;·&nbsp; {story.time}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div onClick={featuredSingle.onClick} style={{ padding: '0 20px 22px', cursor: 'pointer' }}>
                <img src={featuredSingle.image} alt="" style={{ width: '100%', height: 190, borderRadius: 10, objectFit: 'cover', background: imagePlaceholder }} />
                <div style={{ marginTop: 10, fontFamily: "'Work Sans',sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: accentText }}>{featuredSingle.category}</div>
                <div style={{ fontFamily: headlineFontFamily, fontWeight: 600, fontSize: 19, lineHeight: 1.28, color: textPrimary, marginTop: 4 }}>{featuredSingle.title}</div>
                <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11.5, color: textColor(0.5), marginTop: 6 }}>{featuredSingle.author} &nbsp;·&nbsp; {featuredSingle.time}</div>
              </div>
            )}
          </>
        )}

        {/* Recent */}
        <div style={{ padding: '4px 20px 8px' }}>
          <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: textColor(0.45), textTransform: 'uppercase' }}>Recent Stories</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 20px 40px' }}>
          {recent.map((story) => <Story key={story.id} story={story} style={rowStyle} theme={storyTheme} />)}
          {recent.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', fontFamily: "'Work Sans',sans-serif", fontSize: 13, color: textColor(0.4) }}>No stories in this category yet.</div>
          )}
          {hasMore && (
            <div onClick={loadMore} style={{ textAlign: 'center', padding: '14px 0 6px', fontFamily: "'Work Sans',sans-serif", fontSize: 13.5, fontWeight: 600, color: accentText, cursor: 'pointer' }}>Load More</div>
          )}
        </div>
      </div>
    </div>
  );
}
