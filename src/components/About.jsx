export function About({ theme, goHome }) {
  const { textPrimary, bodyText, headlineFontFamily, fixedHeader, scrollArea } = theme;

  return (
    <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={fixedHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 20px 18px' }}>
          <div onClick={goHome} style={{ fontSize: 18, color: textPrimary, cursor: 'pointer' }}>&larr;</div>
          <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 20, color: textPrimary }}>About</div>
        </div>
      </div>
      <div style={{ ...scrollArea, padding: '0 20px 40px' }}>
        <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: textPrimary, marginBottom: 14 }}>THE SIGNAL</div>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 15, lineHeight: 1.68, color: bodyText }}>
          The Signal covers the technology stories shaping how people build, work, and live — from AI and hardware to startups, security, and space. Founded on the idea that tech journalism should be as rigorous as it is readable, our small team reports daily from the front lines of the industry.
        </div>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 15, lineHeight: 1.68, color: bodyText, marginTop: 16 }}>
          Have a tip or a correction? Reach the newsroom at tips@thesignal.example.
        </div>
      </div>
    </div>
  );
}
