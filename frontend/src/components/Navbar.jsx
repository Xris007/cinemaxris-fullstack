import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", path: "/" },
  { label: "Dulcería", path: "/dulceria" },
  { label: "Login", path: "/login" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: '64px',
        background: 'rgba(7, 6, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(201, 168, 76, 0.12)',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.9 }}>
          <circle cx="12" cy="12" r="10" stroke="#c9a84c" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="3" fill="#c9a84c"/>
          <circle cx="12" cy="5" r="1.5" fill="#c9a84c" opacity="0.7"/>
          <circle cx="12" cy="19" r="1.5" fill="#c9a84c" opacity="0.7"/>
          <circle cx="5" cy="12" r="1.5" fill="#c9a84c" opacity="0.7"/>
          <circle cx="19" cy="12" r="1.5" fill="#c9a84c" opacity="0.7"/>
          <circle cx="7.05" cy="7.05" r="1.5" fill="#c9a84c" opacity="0.5"/>
          <circle cx="16.95" cy="16.95" r="1.5" fill="#c9a84c" opacity="0.5"/>
          <circle cx="7.05" cy="16.95" r="1.5" fill="#c9a84c" opacity="0.5"/>
          <circle cx="16.95" cy="7.05" r="1.5" fill="#c9a84c" opacity="0.5"/>
        </svg>
        <span style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '22px',
          fontWeight: '600',
          color: '#ede8df',
          letterSpacing: '0.02em',
        }}>
          Cinema<span style={{ color: '#c9a84c' }}>Xris</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '11px',
                fontWeight: '400',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: active ? '#c9a84c' : 'rgba(237, 232, 223, 0.45)',
                borderBottom: active ? '1px solid #c9a84c' : '1px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                if (!active) e.target.style.color = 'rgba(201, 168, 76, 0.75)';
              }}
              onMouseLeave={e => {
                if (!active) e.target.style.color = 'rgba(237, 232, 223, 0.45)';
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}