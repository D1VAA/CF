'use client'
import { MyTabs } from './components/MyTabs'
import { LiveSelect } from './components/LiveSelect'
import { NumberField } from './components/NumberField'
import { TextField } from './components/TextField'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import { SelectFileButton } from './components/SelectFileButton'
import { useEffect, useState } from 'react'

const items = [
  {
    label: 'Cálculos',
    value: 'calc',
    title: 'Calculo de Frete',
    content: <></>,
  },
  {
    label: 'Mapa',
    value: 'map',
    title: 'Mapa',
    content: <div></div>,
  },
  {
    label: 'Consulta',
    value: 'query',
    title: 'Consulta',
    content: <div></div>,
  },
]

function CalcTab({ setData, setFile }) {
  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')
  const [cliente, setCliente] = useState('')
  const [valorMercadoria, setValorMercadoria] = useState('')
  const [custoVeiculo, setCustoVeiculo] = useState('')
  const [peso, setPeso] = useState('')
  const [adValorem, setAdValorem] = useState('')

  const handleChange = (setter, name) => (event) => {
    setter(event.target.value)
    setData((prevData) => ({
      ...prevData,
      [name]: event.target.value,
    }))
  }
  return (
    <section className="flex h-4/5 w-full flex-col items-center justify-center">
      <div className="grid w-3/4 grid-cols-3 justify-items-center gap-x-32 gap-y-5">
        <LiveSelect
          label="Origem"
          value={origem}
          onChange={handleChange(setOrigem, 'origem')}
        />
        <LiveSelect
          label="Destino"
          value={destino}
          onChange={handleChange(setDestino, 'destino')}
        />
        <TextField
          title="Cliente"
          placeholder="Nome do cliente"
          value={cliente}
          onChange={handleChange(setCliente, 'cliente')}
        />
        <NumberField
          label="Valor de Mercadoria"
          type="productCost"
          value={valorMercadoria}
          onChange={handleChange(setValorMercadoria, 'valorMercadoria')}
        />
        <NumberField
          label="Custo do Veicúlo"
          type="vehicleCost"
          value={custoVeiculo}
          onChange={handleChange(setCustoVeiculo, 'custoVeiculo')}
        />
        <NumberField
          label="Peso"
          type="weight"
          value={peso}
          onChange={handleChange(setPeso, 'peso')}
        />
      </div>
      <div className="my-5 flex w-full justify-center">
        <NumberField
          label="Ad Valorem"
          type="adv"
          value={adValorem}
          onChange={handleChange(setAdValorem, 'adValorem')}
        />
      </div>
      <SelectFileButton onFileChange={setFile}></SelectFileButton>
    </section>
  )
}

function SendButton({ formData, selectedFile }) {
  const handleClick = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
        data.append(key, formData[key])
    })
    if (selectedFile){
        data.append('file', selectedFile)
    }
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await fetch('http://localhost:9999/freights', {
        method: 'POST',
        body: data,
      })
      if (response.ok) {
        alert('Enviado.')
      } else {
        alert('Erro ao enviar.')
      }
    } catch (error) {
      alert('Erro ao enviar.')
    }
  }
  return (
    <button
      id="sendButton"
      className="flex h-screen w-1/5 items-center justify-center bg-sky-900 hover:bg-sky-800 hover:shadow-sky-500"
      onClick={handleClick}
    >
      <PaperPlaneTilt size={64} />
    </button>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({})
  const [itemslist, setItems] = useState(items)
  const [selectedFile, setSelectedFile] = useState(null)
  useEffect(() => {
    const updateItems = () => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.value === 'calc'
            ? { ...item, content: <CalcTab setData={setFormData} setFile={setSelectedFile} /> }
            : item,
        ),
      )
    }
    updateItems()
  }, []) // Dependências vazias para rodar apenas uma vez
  return (
    <main className="flex h-screen">
      <div className="flex h-full w-4/5 flex-col items-center bg-white">
        <MyTabs.Root defaultValue="calc" className="h-full">
          <MyTabs.Triggers
            items={itemslist}
            className="mx-auto flex w-1/3 p-2"
          />
        </MyTabs.Root>
      </div>
      <SendButton formData={formData} selectedFile={selectedFile}></SendButton>
    </main>
  )
}
