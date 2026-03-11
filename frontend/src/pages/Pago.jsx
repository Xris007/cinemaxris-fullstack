import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

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

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

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
    // Paso 1: Llamar a PayU
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

    // Paso 2: Llamar a /api/complete
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

  return (
    <div className="min-h-screen px-12 py-10">

      <div className="mb-10">
        <p className="text-yellow-500 text-xs tracking-widest uppercase mb-2">
          Último paso
        </p>
        <h1 className="text-5xl font-serif font-normal text-white/90">
          Datos de Pago
        </h1>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="bg-white/5 border border-yellow-700/20 rounded p-8 space-y-5">

          <div>
            <label className="block text-yellow-500/70 text-xs tracking-widest uppercase mb-2">
              Número de tarjeta
            </label>
            <input
              name="card"
              value={form.card}
              onChange={handleCardChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="w-full bg-white/5 border border-yellow-700/20 rounded px-4 py-3 text-white/80 text-sm outline-none focus:border-yellow-500/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-500/70 text-xs tracking-widest uppercase mb-2">
                Expiración
              </label>
              <input
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/AA"
                maxLength={5}
                className="w-full bg-white/5 border border-yellow-700/20 rounded px-4 py-3 text-white/80 text-sm outline-none focus:border-yellow-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-yellow-500/70 text-xs tracking-widest uppercase mb-2">
                CVV
              </label>
              <input
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="***"
                maxLength={3}
                className="w-full bg-white/5 border border-yellow-700/20 rounded px-4 py-3 text-white/80 text-sm outline-none focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-yellow-500/70 text-xs tracking-widest uppercase mb-2">
              Correo electrónico
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@email.com"
              className="w-full bg-white/5 border border-yellow-700/20 rounded px-4 py-3 text-white/80 text-sm outline-none focus:border-yellow-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-yellow-500/70 text-xs tracking-widest uppercase mb-2">
              Nombre completo
            </label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Como figura en la tarjeta"
              className="w-full bg-white/5 border border-yellow-700/20 rounded px-4 py-3 text-white/80 text-sm outline-none focus:border-yellow-500/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-yellow-500/70 text-xs tracking-widest uppercase mb-2">
                Tipo doc.
              </label>
              <select
                name="docType"
                value={form.docType}
                onChange={handleChange}
                className="w-full bg-[#0a0a0f] border border-yellow-700/20 rounded px-4 py-3 text-white/80 text-sm outline-none focus:border-yellow-500/50 transition-all"
              >
                <option>DNI</option>
                <option>CE</option>
                <option>Pasaporte</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-yellow-500/70 text-xs tracking-widest uppercase mb-2">
                Número de documento
              </label>
              <input
                name="docNum"
                value={form.docNum}
                onChange={handleChange}
                placeholder="12345678"
                className="w-full bg-white/5 border border-yellow-700/20 rounded px-4 py-3 text-white/80 text-sm outline-none focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>

          <div className="border-t border-yellow-700/15 pt-5 flex justify-between items-center">
            <span className="text-white/50 text-xs tracking-widest uppercase">
              Total a pagar
            </span>
            <span className="text-yellow-500 text-3xl font-bold">
              S/ {total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handlePagar}
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/30 text-black font-bold text-xs tracking-widest uppercase py-4 rounded transition-all duration-200"
          >
            {loading ? 'Procesando...' : 'Confirmar Pago →'}
          </button>

        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#12121a] border border-yellow-700/30 rounded p-10 max-w-sm w-full text-center">

            <div className="text-6xl mb-4">🎉</div>

            <p className="text-yellow-500 text-xs tracking-widest uppercase mb-2">
              Transacción exitosa
            </p>

            <h2 className="text-2xl font-serif text-white/90 mb-2">
              ¡Compra realizada!
            </h2>

            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              Tu pedido ha sido confirmado. Recibirás los detalles en tu correo electrónico.
            </p>

            <div className="bg-yellow-500/10 border border-yellow-700/20 rounded px-4 py-3 mb-8">
              <p className="text-yellow-500/70 text-xs tracking-widest">
                ID: {transactionId}
              </p>
            </div>

            <button
              onClick={() => { setShowSuccess(false); navigate('/') }}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs tracking-widest uppercase px-10 py-3 rounded transition-all duration-200"
            >
              Volver al inicio
            </button>

          </div>
        </div>
      )}

    </div>
  )
}