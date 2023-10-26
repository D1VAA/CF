'use client'
import { MyTabs } from './components/MyTabs'
import { LiveSelect } from './components/LiveSelect'

const items = [
  {
    label: 'Cálculos',
    value: 'calc',
    title: 'Calculo de Frete',
    content: <CalcTab />,
  },
  {
    label: 'Mapa',
    value: 'map',
    title: 'Mapa',
    content: <div></div>,
  },
  {
    label: 'Resultados',
    value: 'result',
    title: 'Custos do Tranporte',
    content: <div></div>,
  },
]

function CalcTab() {
  return (
    <main>
      <LiveSelect label="Origem" />
      <LiveSelect label="Destino" />
    </main>
  )
}

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-white">
      <MyTabs.Root defaultValue="calc">
        <MyTabs.Triggers items={items} />
      </MyTabs.Root>
    </main>
  )
}
