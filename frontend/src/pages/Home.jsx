import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [premieres, setPremieres] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8090/api/premieres')
      .then(res => { setPremieres(res.data); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <p className="loading-text" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Cargando cartelera
      </p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="bg-ambient" />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '100px 48px 80px',
      }}>
        <div className="animate-fade-up" style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '28px', height: '1px', background: '#c9a84c', opacity: 0.6 }} />
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '10px', fontWeight: '500',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a84c', opacity: 0.8,
            }}>
              Ahora en cartelera
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: '300',
            color: '#ede8df', lineHeight: '1.15', margin: 0,
          }}>
            Estrenos de la{' '}
            <em style={{ color: '#c9a84c', fontStyle: 'italic', fontWeight: '400' }}>
              temporada
            </em>
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {premieres.map((movie, i) => (
            <div
              key={movie.id}
              className={`animate-fade-up stagger-${Math.min(i + 1, 7)}`}
              style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
                e.currentTarget.style.boxShadow   = '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)'
                e.currentTarget.style.transform   = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'
                e.currentTarget.style.boxShadow   = 'none'
                e.currentTarget.style.transform   = 'translateY(0)'
              }}
            >
              <div
                onClick={() => navigate('/login')}
                style={{ width: '155px', minWidth: '155px', overflow: 'hidden', position: 'relative' }}
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    minHeight: '210px', display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, transparent 60%, rgba(7,6,10,0.4))',
                  pointerEvents: 'none',
                }} />
              </div>

              <div style={{
                flex: 1, padding: '28px 32px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <span className="badge-rating">{movie.rating}</span>
                  <span style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '10px', fontWeight: '400',
                    letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)',
                  }}>
                    {movie.genre}
                  </span>
                  <span style={{ color: 'rgba(237,232,223,0.2)', fontSize: '10px' }}>·</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', color: 'rgba(237,232,223,0.35)' }}>
                    {movie.duration}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '26px', fontWeight: '500', color: '#ede8df',
                  margin: '0 0 10px', lineHeight: '1.2',
                }}>
                  {movie.title}
                </h2>

                <p style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: '300',
                  color: 'rgba(237,232,223,0.45)', lineHeight: '1.7',
                  margin: '0 0 22px', maxWidth: '500px',
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {movie.description}
                </p>

                <div>
                  <button
                    onClick={() => navigate('/login')}
                    className="btn-gold"
                    style={{ padding: '10px 24px' }}
                  >
                    Comprar entrada
                  </button>
                </div>
              </div>

              <div style={{
                width: '3px', flexShrink: 0,
                background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.35), transparent)',
              }} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}