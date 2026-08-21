export function Media({ theme }) {
  const { textPrimary, placeholderIcon, headlineFontFamily, fixedHeader, scrollArea, textColor } = theme;

  return (
    <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={fixedHeader}>
        <div style={{ padding: '6px 20px 18px' }}>
          <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: textPrimary }}>Media</div>
        </div>
      </div>
      <div style={{ ...scrollArea, padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <svg width="88" height="88" viewBox="0 0 19 19" fill="none"><circle cx="9.5" cy="9.5" r="8.2" stroke={placeholderIcon} strokeWidth="1.2" /><path d="M7.8 6.3L13 9.5L7.8 12.7V6.3Z" fill={placeholderIcon} /></svg>
        <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: textPrimary, marginTop: 24 }}>Coming Soon</div>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, lineHeight: 1.6, color: textColor(0.6), marginTop: 10, maxWidth: 280 }}>
          Video briefings and original reporting from The Signal newsroom are on their way. Check back soon.
        </div>
      </div>
    </div>
  );
}
