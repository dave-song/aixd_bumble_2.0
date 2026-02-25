export default function SplashScreen() {
  return (
    <div style={{
      width: 390,
      height: 844,
      backgroundColor: 'white',
      borderRadius: 44,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Status bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px 8px'
      }}>
        <span style={{ fontSize: 17, fontWeight: 600 }}>4:03</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Centered logo */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg
          width={100}
          height={92}
          viewBox="0 0 100 92"
          fill="none"
        >
          <path
            d="M50 0L93.3 25V67L50 92L6.7 67V25L50 0Z"
            fill="#FFC629"
          />
          <rect x="30" y="32" width="40" height="8" rx="4" fill="white" />
          <rect x="30" y="44" width="40" height="8" rx="4" fill="white" />
          <rect x="30" y="56" width="40" height="8" rx="4" fill="white" />
        </svg>
      </div>

      {/* Tap to continue text */}
      <div style={{
        textAlign: 'center',
        padding: 24,
        color: '#666'
      }}>
        <a href="/onboarding/gender" style={{ color: '#FFC629', textDecoration: 'none', fontWeight: 600 }}>
          Tap here to start →
        </a>
      </div>
    </div>
  );
}
