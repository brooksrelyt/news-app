export function Login({ theme, goHome, loginName, setLoginName, doLogin }) {
  const { textPrimary, accentColor, onAccentText, inputBg, headlineFontFamily, fixedHeader, scrollArea, textColor } = theme;

  return (
    <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={fixedHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 20px 18px' }}>
          <div onClick={goHome} style={{ fontSize: 18, color: textPrimary, cursor: 'pointer' }}>&larr;</div>
          <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 20, color: textPrimary }}>Log In</div>
        </div>
      </div>
      <div style={{ ...scrollArea, padding: '8px 20px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 13.5, color: textColor(0.6) }}>Sign in to save stories and personalize your feed.</div>
        <input
          type="text" placeholder="Email or username" value={loginName} onChange={(e) => setLoginName(e.target.value)}
          style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, padding: '13px 14px', borderRadius: 8, border: `1px solid ${textColor(0.3)}`, background: inputBg, color: textPrimary, outline: 'none', boxSizing: 'border-box' }}
        />
        <input
          type="password" placeholder="Password"
          style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, padding: '13px 14px', borderRadius: 8, border: `1px solid ${textColor(0.3)}`, background: inputBg, color: textPrimary, outline: 'none', boxSizing: 'border-box' }}
        />
        <div onClick={doLogin} style={{ textAlign: 'center', fontFamily: "'Work Sans',sans-serif", fontSize: 14.5, fontWeight: 600, color: onAccentText, background: accentColor, borderRadius: 8, padding: '13px 14px', cursor: 'pointer', marginTop: 6 }}>Log In</div>
      </div>
    </div>
  );
}
