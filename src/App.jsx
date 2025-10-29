import { useState } from 'react'
import './App.css'
import { ClipLoader } from 'react-spinners'
import { Loader2 } from 'lucide-react'

function App() {
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState(null)
  const [loading, setLoading] = useState(false)

  const buscarCep = async () => {
    if (cep.length !== 8) {
      alert('Por favor, digite um CEP válido com 8 dígitos.')
      return
    }
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      setEndereco(data)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    
    <div className="app">
      <div className="container">
        <h1>Consulta CEP</h1>
        <p className="description">Encontre endereços de todo o Brasil</p>
        
        <div className="search-box">
          <input 
            value={cep}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                buscarCep()
              }
            }}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
            placeholder="Digite o CEP (8 dígitos)"
            maxLength={8}
          />
          <button onClick={buscarCep} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar CEP'}
          </button>
        </div>
        {loading && (
          <div className="loading-container">
            <ClipLoader color="#3b82f6" size={60}  />
            <p>Consultando base de CEPs...</p>
          </div>
        )}

        {!loading && endereco && !endereco.erro && (
          <div className="resultado">
            <h2>Endereço Encontrado</h2>
            <p><strong>CEP:</strong> {endereco.cep}</p>
            <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
            <p><strong>Bairro:</strong> {endereco.bairro}</p>
            <p><strong>Cidade:</strong> {endereco.localidade}</p>
            <p><strong>Estado:</strong> {endereco.uf}</p>
          </div>
        )}

        {!loading && endereco?.erro && (
          <div className="erro">CEP não encontrado! Digite um CEP válido.</div>
        )}
      </div>
    </div>
  )
}

export default App