import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [showWelcome, setShowWelcome] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleGoogle = () => {
    login({ nombre: 'John Doe', email: 'johndoe@gmail.com' })
    setShowWelcome(true)
  }

  const handleGuest = () => navigate('/dulceria')
  const handleAccept = () => { setShowWelcome(false); navigate('/dulceria') }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px 40px',
      position: 'relative',
    }}>
      <div className="bg-ambient" />

      <div className="animate-fade-up" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="3" stroke="#c9a84c" strokeWidth="1.5"/>
              <circle cx="7" cy="7" r="1.5" fill="#c9a84c"/>
              <circle cx="17" cy="7" r="1.5" fill="#c9a84c"/>
              <circle cx="7" cy="17" r="1.5" fill="#c9a84c"/>
              <circle cx="17" cy="17" r="1.5" fill="#c9a84c"/>
              <path d="M10 9l5 3-5 3V9z" fill="#c9a84c" opacity="0.7"/>
            </svg>
          </div>

          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.65)',
            marginBottom: '10px',
          }}>
            Acceso a CinemaXris
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '36px',
            fontWeight: '400',
            color: '#ede8df',
            margin: 0,
            lineHeight: 1.2,
          }}>
            Tu sesión, tu experiencia
          </h2>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(201,168,76,0.18)',
          borderRadius: '12px',
          padding: '36px',
        }}>
          <button
            onClick={handleGoogle}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: '#c9a84c',
              color: '#07060a',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: '7px',
              padding: '15px',
              cursor: 'pointer',
              marginBottom: '16px',
              transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#dbb84e';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#c9a84c';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#07060a" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#07060a" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#07060a" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#07060a" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            margin: '20px 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(237,232,223,0.25)',
            }}>o</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
          </div>

          <button
            onClick={handleGuest}
            style={{
              width: '100%',
              background: 'transparent',
              color: 'rgba(201,168,76,0.8)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: '1px solid rgba(201,168,76,0.22)',
              borderRadius: '7px',
              padding: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.07)';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Entrar como Invitado
          </button>

          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            fontWeight: '300',
            color: 'rgba(237,232,223,0.28)',
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: 0,
            lineHeight: 1.6,
          }}>
            Como invitado no tendrás acceso a funciones personalizadas
          </p>
        </div>
      </div>

      {showWelcome && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7,6,10,0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            className="animate-fade-up"
            style={{
              background: '#0f0d13',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '14px',
              padding: '48px 40px',
              maxWidth: '380px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.06)',
            }}
          >

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(201,168,76,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '28px',
            }}>
              ✦
            </div>

            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.65)',
              marginBottom: '8px',
            }}>
              Bienvenido
            </p>

            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '32px',
              fontWeight: '400',
              color: '#ede8df',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}>
              ¡Hola,{' '}
              <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>
                John Doe
              </em>
              !
            </h2>

            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
              fontWeight: '300',
              color: 'rgba(237,232,223,0.4)',
              marginBottom: '32px',
              lineHeight: 1.7,
            }}>
              Tu sesión ha sido iniciada correctamente. Disfruta la experiencia CinemaXris.
            </p>

            <button
              onClick={handleAccept}
              className="btn-gold"
              style={{ width: '100%', padding: '14px' }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}