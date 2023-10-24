'use client'
import { MyTabs } from './components/MyTabs'
import { FreightCalc } from './components/Freight'

const items = [
  {
    label: 'Cálculos',
    value: 'calc',
    title: 'Calculo de Frete',
    content: <FreightCalc />,
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

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-white">
      {/* <embed src="https://qualp.com.br/" className="h-full w-8/12" /> */}
      <MyTabs.Root defaultValue="calc">
        <MyTabs.Triggers items={items} />
      </MyTabs.Root>
    </main>
  )
}
