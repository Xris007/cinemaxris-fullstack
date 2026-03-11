import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Dulceria() {
  const [productos, setProductos] = useState([])
  const [cart, setCart] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8090/api/candystore')
      .then(res => {
        setProductos(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const agregar = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const quitar = (id) => setCart(c => {
    const nuevo = { ...c }
    if (nuevo[id] > 1) nuevo[id]--
    else delete nuevo[id]
    return nuevo
  })

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = productos.find(p => p.id === +id)
    return sum + (p ? p.price * qty : 0)
  }, 0)

  const itemsEnCarrito = Object.values(cart).reduce((a, b) => a + b, 0)

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-yellow-500 text-lg tracking-widest uppercase animate-pulse">
        Cargando dulcería...
      </p>
    </div>
  )

  return (
    <div className="min-h-screen px-12 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="text-yellow-500 text-xs tracking-widest uppercase mb-2">
          Antes de tu película
        </p>
        <h1 className="text-5xl font-serif font-normal text-white/90">
          Dulcería
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Grid de productos */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {productos.map(item => (
            <div
              key={item.id}
              className="bg-white/5 border border-yellow-700/10 hover:border-yellow-700/30 rounded p-5 transition-all duration-200"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-white font-bold text-base mb-1">{item.name}</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-4">{item.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-yellow-500 font-bold text-lg">
                  S/ {item.price.toFixed(2)}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => quitar(item.id)}
                    className="w-8 h-8 rounded-full border border-yellow-700/30 text-yellow-500 hover:bg-yellow-500/10 transition-all flex items-center justify-center text-lg"
                  >
                    −
                  </button>
                  <span className="text-white text-sm w-4 text-center">
                    {cart[item.id] || 0}
                  </span>
                  <button
                    onClick={() => agregar(item.id)}
                    className="w-8 h-8 rounded-full border border-yellow-700/30 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-all flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carrito */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-yellow-700/20 rounded p-6 sticky top-24">
            
            <h3 className="text-yellow-500/70 text-xs tracking-widest uppercase mb-6">
              Tu pedido {itemsEnCarrito > 0 && `(${itemsEnCarrito})`}
            </h3>

            {Object.keys(cart).length === 0 ? (
              <p className="text-white/20 text-sm text-center py-6">
                No has agregado nada aún
              </p>
            ) : (
              <div className="space-y-3 mb-6">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = productos.find(p => p.id === +id)
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <span className="text-white/60">{p.name} ×{qty}</span>
                      <span className="text-yellow-500">S/ {(p.price * qty).toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="border-t border-yellow-700/15 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-xs tracking-widest uppercase">Total</span>
                <span className="text-yellow-500 text-2xl font-bold">
                  S/ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => total > 0 && navigate('/pago', { state: { cart, productos, total } })}
              className={`w-full py-4 text-xs tracking-widest uppercase font-bold rounded transition-all duration-200
                ${total > 0
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black cursor-pointer'
                  : 'bg-yellow-500/20 text-yellow-500/30 cursor-not-allowed'
                }`}
            >
              Continuar al Pago
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}