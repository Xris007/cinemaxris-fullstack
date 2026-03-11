import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function Field({ label, children }) {
  return (
    <div>
      <label className="label-cinema">{label}</label>
      {children}
    </div>
  )
}

export default function Pago() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionId, setTransactionId] = useState('')

  const [form, setForm] = useState({
    card: '',
    expiry: '',
    cvv: '',
    email: user?.email || '',
    nombre: user?.nombre || '',
    docType: 'DNI',
    docNum: '',
  })

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleCardChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19)
    setForm(f => ({ ...f, card: value }))
  }

  const handlePagar = async () => {
    setLoading(true)
    try {
      const payuResponse = await axios.post('http://localhost:8090/api/payment/process', {
        cardNumber: form.card,
        expiry: form.expiry,
        cvv: form.cvv,
        email: form.email,
        nombre: form.nombre,
        docNum: form.docNum,
        amount: total.toFixed(2),
      })

      if (!payuResponse.data.success) {
        alert('Pago rechazado: ' + payuResponse.data.message)
        return
      }

      const { transactionId: txId, operationDate } = payuResponse.data

      const completeResponse = await axios.post('http://localhost:8090/api/complete', {
        email: form.email,
        nombres: form.nombre,
        numeroDni: form.docNum,
        operationDate: operationDate,
        transactionId: txId,
      })

      if (completeResponse.data.code === '0') {
        setTransactionId(txId)
        setShowSuccess(true)
      }
    } catch (err) {
      console.error(err)
      alert('Error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  const total = state?.total || 0

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: '7px',
    padding: '12px 16px',
    color: '#ede8df',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '14px',
    fontWeight: '300',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="bg-ambient" />

      <div style={{ position: 'relative', zIndex: 1, padding: '100px 64px 80px' }}>

        <div className="animate-fade-up" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: '#c9a84c', opacity: 0.6 }} />
            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              opacity: 0.8,
            }}>
              Último paso
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(38px, 4vw, 56px)',
            fontWeight: '300',
            color: '#ede8df',
            margin: 0,
          }}>
            Datos de pago
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', maxWidth: '900px' }}>
          <div
            className="animate-fade-up stagger-1"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(201,168,76,0.18)',
              borderRadius: '12px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div>
              <p style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: '16px',
              }}>
                Información de tarjeta
              </p>

              <Field label="Número de tarjeta">
                <input
                  name="card"
                  value={form.card}
                  onChange={handleCardChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(201,168,76,0.04)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.06)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.2)'; e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.boxShadow = 'none'; }}
                />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Expiración">
                <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/AA" maxLength={5} style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(201,168,76,0.04)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.2)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }} />
              </Field>
              <Field label="CVV">
                <input name="cvv" value={form.cvv} onChange={handleChange} placeholder="•••" maxLength={4} type="password" style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(201,168,76,0.04)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.2)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }} />
              </Field>
            </div>

            <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: '4px' }}>
              <p style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: '16px',
                marginTop: '8px',
              }}>
                Datos del titular
              </p>
            </div>

            <Field label="Correo electrónico">
              <input name="email" value={form.email} onChange={handleChange} placeholder="correo@email.com" style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(201,168,76,0.04)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.2)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }} />
            </Field>

            <Field label="Nombre completo">
              <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Como figura en la tarjeta" style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(201,168,76,0.04)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.2)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }} />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
              <Field label="Tipo doc.">
                <select name="docType" value={form.docType} onChange={handleChange}
                  style={{ ...inputStyle, background: '#0a0810', cursor: 'pointer' }}>
                  <option>DNI</option>
                  <option>CE</option>
                  <option>Pasaporte</option>
                </select>
              </Field>
              <Field label="Número de documento">
                <input name="docNum" value={form.docNum} onChange={handleChange} placeholder="12345678" style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.5)'; e.target.style.background = 'rgba(201,168,76,0.04)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.2)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }} />
              </Field>
            </div>
          </div>

          <div className="animate-fade-up stagger-2">
            <div style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(201,168,76,0.18)',
              borderRadius: '12px',
              padding: '28px',
              position: 'sticky',
              top: '84px',
            }}>
              <p style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.55)',
                marginBottom: '20px',
              }}>
                Resumen
              </p>

              {state?.cart && Object.entries(state.cart).map(([id, qty]) => {
                const p = state.productos?.find(p => p.id === +id)
                if (!p) return null
                return (
                  <div key={id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(201,168,76,0.07)',
                  }}>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', fontWeight: '300', color: 'rgba(237,232,223,0.6)', flex: 1, paddingRight: '8px' }}>
                      {p.name} <span style={{ color: 'rgba(201,168,76,0.5)' }}>×{qty}</span>
                    </span>
                    <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '15px', color: '#c9a84c' }}>
                      S/ {(p.price * qty).toFixed(2)}
                    </span>
                  </div>
                )
              })}

              <div style={{
                borderTop: '1px solid rgba(201,168,76,0.12)',
                paddingTop: '16px',
                marginTop: '12px',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(237,232,223,0.4)' }}>
                  Total
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '30px', fontWeight: '500', color: '#c9a84c' }}>
                  S/ {total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePagar}
                disabled={loading}
                className="btn-gold"
                style={{ width: '100%', padding: '15px', position: 'relative' }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{
                      width: '14px', height: '14px',
                      border: '2px solid rgba(7,6,10,0.3)',
                      borderTop: '2px solid #07060a',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    Procesando
                  </span>
                ) : 'Confirmar pago'}
              </button>

              <p style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                fontWeight: '300',
                color: 'rgba(237,232,223,0.22)',
                textAlign: 'center',
                marginTop: '14px',
                lineHeight: 1.6,
              }}>
                Pago seguro procesado por PayU
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {showSuccess && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7,6,10,0.9)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
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
              padding: '52px 44px',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(201,168,76,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              Transacción exitosa
            </p>

            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '34px',
              fontWeight: '400',
              color: '#ede8df',
              margin: '0 0 10px',
            }}>
              ¡Compra realizada!
            </h2>

            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
              fontWeight: '300',
              color: 'rgba(237,232,223,0.4)',
              marginBottom: '28px',
              lineHeight: 1.7,
            }}>
              Tu pedido ha sido confirmado.<br/>Recibirás los detalles en tu correo.
            </p>

            <div style={{
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '6px',
              padding: '12px 16px',
              marginBottom: '32px',
            }}>
              <p style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                fontWeight: '400',
                letterSpacing: '0.12em',
                color: 'rgba(201,168,76,0.55)',
                margin: 0,
                wordBreak: 'break-all',
              }}>
                ID: {transactionId}
              </p>
            </div>

            <button
              onClick={() => { setShowSuccess(false); navigate('/') }}
              className="btn-gold"
              style={{ width: '100%', padding: '14px' }}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  )
}