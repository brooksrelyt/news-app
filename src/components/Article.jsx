export function Article({ theme, closeArticle, selected }) {
  const { appBg, textPrimary, bodyText, accentText, imagePlaceholder, headlineFontFamily, fixedHeader, scrollArea, textColor } = theme;

  return (
    <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: appBg }}>
      <div style={fixedHeader}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 20px 14px' }}>
          <div onClick={closeArticle} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 15, color: textPrimary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 18 }}>&larr;</span> Back
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 12.5, color: textPrimary, border: `1px solid ${textColor(0.3)}`, borderRadius: 100, padding: '6px 14px' }}>Save</div>
            <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 12.5, color: textPrimary, border: `1px solid ${textColor(0.3)}`, borderRadius: 100, padding: '6px 14px' }}>Share</div>
          </div>
        </div>
      </div>
      <div style={{ ...scrollArea, padding: '0 20px' }}>
        <img src={selected.image} alt="" style={{ width: '100%', height: 200, borderRadius: 10, objectFit: 'cover', background: imagePlaceholder }} />
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: accentText, marginTop: 16 }}>{selected.category}</div>
        <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 26, lineHeight: 1.25, color: textPrimary, marginTop: 8 }}>{selected.title}</div>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 13, color: textColor(0.55), marginTop: 12, paddingBottom: 16, borderBottom: `1px solid ${textColor(0.12)}` }}>
          By {selected.author} &nbsp;·&nbsp; {selected.time} &nbsp;·&nbsp; {selected.readMins} min read
        </div>
        <div style={{ fontFamily: headlineFontFamily, fontWeight: 400, fontSize: 16.5, lineHeight: 1.35, color: textPrimary, marginTop: 16 }}>{selected.dek}</div>
        {selected.body.map((para, i) => (
          <div key={i} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 15.5, lineHeight: 1.68, color: bodyText, marginTop: 16 }}>{para}</div>
        ))}
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
