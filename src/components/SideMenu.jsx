export function SideMenu({
  theme, closeMenu, goHome, goAbout, topicMenuItems, darkMode, toggleDarkMode, loggedIn, doLogout, goLogin,
}) {
  const { appBg, textPrimary, accentColor, accentText, headlineFontFamily, textColor } = theme;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
      <div onClick={closeMenu} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '78%', maxWidth: 300, background: appBg, boxShadow: '2px 0 20px rgba(0,0,0,0.15)', overflowY: 'auto', padding: '58px 0 24px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px 18px', borderBottom: `1px solid ${textColor(0.1)}` }}>
          <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 20, color: textPrimary }}>Menu</div>
          <div onClick={closeMenu} style={{ fontSize: 18, color: textPrimary, cursor: 'pointer' }}>&times;</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
          <div onClick={goHome} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, color: textPrimary, padding: '11px 0', cursor: 'pointer' }}>Home</div>
          <div onClick={goAbout} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, color: textPrimary, padding: '11px 0', cursor: 'pointer' }}>About</div>
        </div>
        <div style={{ padding: '10px 20px 4px', fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: textColor(0.45), textTransform: 'uppercase' }}>Topics</div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 20px' }}>
          {topicMenuItems.map((item) => (
            <div key={item.label} onClick={item.onClick} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, color: textPrimary, padding: '11px 0', cursor: 'pointer' }}>
              {item.label} <span style={{ color: textColor(0.4) }}>{item.count}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 20px 4px', fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: textColor(0.45), textTransform: 'uppercase' }}>Display</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 6px' }}>
          <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, color: textPrimary }}>Dark Mode</div>
          <div
            onClick={toggleDarkMode}
            role="switch"
            aria-checked={darkMode}
            style={{
              width: 44, height: 26, borderRadius: 13, flexShrink: 0, cursor: 'pointer', position: 'relative',
              background: darkMode ? accentColor : textColor(0.2), transition: 'background 0.15s',
            }}
          >
            <div style={{
              position: 'absolute', top: 2, left: darkMode ? 20 : 2, width: 22, height: 22, borderRadius: '50%',
              background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', transition: 'left 0.15s',
            }} />
          </div>
        </div>
        <div style={{ padding: '10px 20px 0', borderTop: `1px solid ${textColor(0.1)}`, marginTop: 8 }}>
          <div onClick={loggedIn ? doLogout : goLogin} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 16, fontWeight: 600, color: accentText, padding: '15px 0 4px', cursor: 'pointer' }}>
            {loggedIn ? 'Log Out' : 'Log In'}
          </div>
        </div>
      </div>
    </div>
  );
}
