import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [premieres, setPremieres] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8090/api/premieres')
      .then(res => {
        setPremieres(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-yellow-500 text-lg tracking-widest uppercase animate-pulse">
        Cargando cartelera...
      </p>
    </div>
  )

  return (
    <div className="min-h-screen px-12 py-10">

      <div className="text-center mb-12">
        <p className="text-yellow-500 text-xs tracking-widest uppercase mb-3">
          Ahora en cartelera
        </p>
        <h1 className="text-5xl font-serif font-normal text-white/90">
          Estrenos de la <em className="text-yellow-500">temporada</em>
        </h1>
      </div>
  
      <div className="max-w-5xl mx-auto space-y-6">
        {premieres.map(movie => (
          <div
            key={movie.id}
            className="flex gap-8 bg-white/5 border border-yellow-700/10 hover:border-yellow-700/30 rounded overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/5"
          >
            <div
              className="w-48 min-w-48 cursor-pointer overflow-hidden"
              onClick={() => navigate('/login')}
            >
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ minHeight: '200px' }}
              />
            </div>

            <div className="flex flex-col justify-center py-6 pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                  {movie.rating}
                </span>
                <span className="text-yellow-500/60 text-xs tracking-widest uppercase">
                  {movie.genre}
                </span>
              </div>

              <h2 className="text-white font-bold text-2xl font-serif mb-3">
                {movie.title}
              </h2>

              <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-lg">
                {movie.description}
              </p>

              <div className="flex items-center gap-6">
                <span className="text-white/30 text-xs">⏱ {movie.duration}</span>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs tracking-widest uppercase px-6 py-2 rounded transition-all duration-200"
                >
                  Comprar entrada
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}