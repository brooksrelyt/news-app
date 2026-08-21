export function Categories({ theme, allCategoriesInfo }) {
  const { textPrimary, headlineFontFamily, fixedHeader, scrollArea, textColor } = theme;

  return (
    <div style={{ width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={fixedHeader}>
        <div style={{ padding: '6px 20px 18px' }}>
          <div style={{ fontFamily: headlineFontFamily, fontWeight: 700, fontSize: 22, color: textPrimary }}>Topics</div>
        </div>
      </div>
      <div style={{ ...scrollArea, display: 'flex', flexDirection: 'column', padding: '0 20px 40px' }}>
        {allCategoriesInfo.map((cat) => (
          <div key={cat.name} onClick={cat.onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${textColor(0.1)}`, cursor: 'pointer' }}>
            <div style={{ fontFamily: headlineFontFamily, fontWeight: 600, fontSize: 18, color: textPrimary }}>{cat.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 13, color: textColor(0.45) }}>{cat.count} stories</div>
              <div style={{ fontSize: 16, color: textColor(0.35) }}>&rsaquo;</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
