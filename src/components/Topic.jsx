import { Story } from './Story.jsx';

export function Topic({ theme, storyTheme, goHome, topic, topicFeatured, topicArticles, topicArticlesFull }) {
  const { textPrimary, imagePlaceholder, headlineFontFamily, rowStyle, fixedHeader, scrollArea, textColor } = theme;

  return (
    <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={fixedHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 20px 18px' }}>
          <div onClick={goHome} style={{ fontSize: 18, color: textPrimary, cursor: 'pointer' }}>&larr;</div>
          <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 20, color: textPrimary }}>{topic}</div>
        </div>
      </div>
      <div style={scrollArea}>
        {topicFeatured && (
          <div style={{ padding: '0 20px 22px' }}>
            <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: textColor(0.45), textTransform: 'uppercase', marginBottom: 10 }}>Featured in {topic}</div>
            <div onClick={topicFeatured.onClick} style={{ cursor: 'pointer' }}>
              <img src={topicFeatured.image} alt="" style={{ width: '100%', height: 170, borderRadius: 10, objectFit: 'cover', background: imagePlaceholder }} />
              <div style={{ fontFamily: headlineFontFamily, fontWeight: 600, fontSize: 19, lineHeight: 1.28, color: textPrimary, marginTop: 10 }}>{topicFeatured.title}</div>
              <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11.5, color: textColor(0.5), marginTop: 6 }}>{topicFeatured.author} &nbsp;·&nbsp; {topicFeatured.time}</div>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 20px 40px' }}>
          {topicArticles.map((story) => <Story key={story.id} story={story} style={rowStyle} theme={storyTheme} />)}
          {topicArticlesFull.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', fontFamily: "'Work Sans',sans-serif", fontSize: 13, color: textColor(0.4) }}>No stories in this topic yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
