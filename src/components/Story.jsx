import { THEME } from '../theme.js';

export function Story({ story, style, imgSize = 76, theme }) {
  return (
    <div onClick={story.onClick} style={style}>
      <img
        src={story.image}
        alt=""
        style={{ width: imgSize, height: imgSize, flexShrink: 0, borderRadius: 8, objectFit: 'cover', background: theme.placeholder }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 0.7, textTransform: 'uppercase', color: theme.accent }}>{story.category}</div>
        <div style={{
          fontFamily: `'${THEME.headlineFont}', serif`, fontWeight: 600, fontSize: 15.5, lineHeight: 1.28, color: theme.text, marginTop: 3,
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{story.title}</div>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, color: theme.muted, marginTop: 5 }}>{story.author} &nbsp;·&nbsp; {story.time}</div>
      </div>
    </div>
  );
}
