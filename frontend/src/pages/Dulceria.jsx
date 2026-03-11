import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Plus, Minus, ShoppingBag, ArrowRight,
  Popcorn, Coffee, Cookie, Sandwich, Candy, CupSoda, IceCream
} from 'lucide-react'

const PRODUCT_ICONS = [Popcorn, Coffee, Cookie, Sandwich, Candy, CupSoda, IceCream]

export default function Dulceria() {
  const [productos, setProductos] = useState([])
  const [cart, setCart] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8090/api/candystore')
      .then(res => { setProductos(res.data); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const agregar = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const quitar  = (id) => setCart(c => {
    const n = { ...c }
    if (n[id] > 1) n[id]--
    else delete n[id]
    return n
  })

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = productos.find(p => p.id === +id)
    return sum + (p ? p.price * qty : 0)
  }, 0)

  const itemsEnCarrito = Object.values(cart).reduce((a, b) => a + b, 0)

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <p className="loading-text" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Cargando dulcería
      </p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="bg-ambient" />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1200px', margin: '0 auto',
        padding: '100px 48px 80px',
      }}>

        <div className="animate-fade-up" style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: '#c9a84c', opacity: 0.6 }} />
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '10px', fontWeight: '500',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a84c', opacity: 0.8,
            }}>
              Antes de tu película
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(38px, 4vw, 56px)', fontWeight: '300', color: '#ede8df', margin: 0,
          }}>
            Dulcería
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', alignItems: 'start' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {productos.map((item, i) => {
              const Icon = PRODUCT_ICONS[i % PRODUCT_ICONS.length]
              const qty  = cart[item.id] || 0
              return (
                <div
                  key={item.id}
                  className={`animate-fade-up stagger-${Math.min(i + 1, 7)}`}
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid ${qty > 0 ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.12)'}`,
                    borderRadius: '10px', padding: '24px 20px',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', textAlign: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.32)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = qty > 0 ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: qty > 0 ? 'rgba(201,168,76,0.14)' : 'rgba(201,168,76,0.07)',
                    border: '1px solid rgba(201,168,76,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px', color: '#c9a84c', transition: 'background 0.2s',
                  }}>
                    <Icon size={20} strokeWidth={1.4} />
                  </div>

                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '18px', fontWeight: '500', color: '#ede8df', margin: '0 0 6px', lineHeight: 1.2,
                  }}>
                    {item.name}
                  </h3>

                  <p style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '12px', fontWeight: '300',
                    color: 'rgba(237,232,223,0.4)', lineHeight: '1.65', margin: '0 0 18px', flex: 1,
                  }}>
                    {item.description}
                  </p>

                  <span style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '22px', fontWeight: '500', color: '#c9a84c',
                    marginBottom: '16px', display: 'block',
                  }}>
                    S/ {item.price.toFixed(2)}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <button onClick={() => quitar(item.id)}
                      style={{
                        width: '30px', height: '30px', borderRadius: '50%', padding: 0,
                        border: '1px solid rgba(201,168,76,0.25)', background: 'transparent',
                        color: '#c9a84c', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)' }}
                    >
                      <Minus size={11} strokeWidth={2} />
                    </button>

                    <span style={{
                      fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: '500',
                      color: qty > 0 ? '#ede8df' : 'rgba(237,232,223,0.22)',
                      minWidth: '20px', textAlign: 'center', transition: 'color 0.2s',
                    }}>
                      {qty}
                    </span>

                    <button onClick={() => agregar(item.id)}
                      style={{
                        width: '30px', height: '30px', borderRadius: '50%', padding: 0,
                        border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)',
                        color: '#c9a84c', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.2)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)' }}
                    >
                      <Plus size={11} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div>
            <div
              className="animate-fade-up stagger-2"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(201,168,76,0.18)',
                borderRadius: '12px', padding: '28px',
                position: 'sticky', top: '84px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={14} color="rgba(201,168,76,0.6)" strokeWidth={1.5} />
                  <span style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '10px', fontWeight: '500',
                    letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)',
                  }}>
                    Tu pedido
                  </span>
                </div>
                {itemsEnCarrito > 0 && (
                  <span style={{
                    background: '#c9a84c', color: '#07060a',
                    fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: '700',
                    padding: '2px 9px', borderRadius: '20px',
                  }}>
                    {itemsEnCarrito}
                  </span>
                )}
              </div>

              {Object.keys(cart).length === 0 ? (
                <div style={{ padding: '28px 0', textAlign: 'center' }}>
                  <ShoppingBag size={30} color="rgba(237,232,223,0.1)" strokeWidth={1} style={{ margin: '0 auto 10px', display: 'block' }} />
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'rgba(237,232,223,0.22)', margin: 0 }}>
                    Aún no agregaste nada
                  </p>
                </div>
              ) : (
                <div style={{ marginBottom: '20px' }}>
                  {Object.entries(cart).map(([id, qty]) => {
                    const p = productos.find(p => p.id === +id)
                    return (
                      <div key={id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 0', borderBottom: '1px solid rgba(201,168,76,0.07)',
                      }}>
                        <span style={{
                          fontFamily: 'Outfit, sans-serif', fontSize: '12px', fontWeight: '300',
                          color: 'rgba(237,232,223,0.65)', flex: 1, paddingRight: '12px', lineHeight: 1.5,
                        }}>
                          {p.name} <span style={{ color: 'rgba(201,168,76,0.5)' }}>×{qty}</span>
                        </span>
                        <span style={{
                          fontFamily: 'Cormorant Garamond, Georgia, serif',
                          fontSize: '15px', color: '#c9a84c', whiteSpace: 'nowrap',
                        }}>
                          S/ {(p.price * qty).toFixed(2)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              <div style={{
                borderTop: '1px solid rgba(201,168,76,0.12)', paddingTop: '18px', marginBottom: '20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '10px', fontWeight: '500',
                  letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(237,232,223,0.4)',
                }}>
                  Total
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', fontWeight: '500', color: '#c9a84c' }}>
                  S/ {total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => total > 0 && navigate('/pago', { state: { cart, productos, total } })}
                disabled={total === 0}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: total > 0 ? '#c9a84c' : 'rgba(201,168,76,0.12)',
                  color: total > 0 ? '#07060a' : 'rgba(201,168,76,0.28)',
                  fontFamily: 'Outfit, sans-serif', fontSize: '12px', fontWeight: '600',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  border: 'none', borderRadius: '7px', padding: '14px',
                  cursor: total > 0 ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { if (total > 0) { e.currentTarget.style.background = '#dbb84e'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.25)' }}}
                onMouseLeave={e => { if (total > 0) { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}}
              >
                Continuar al pago
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}