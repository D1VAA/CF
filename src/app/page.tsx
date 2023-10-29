'use client'
import { MyTabs } from './components/MyTabs'
import { LiveSelect } from './components/LiveSelect'
import { NumberField } from './components/NumberField'

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
    <section className="w-full">
      <div className="grid w-full grid-cols-2 justify-items-center gap-5">
        <LiveSelect label="Origem" />
        <LiveSelect label="Destino" />
        <NumberField label="Valor de Mercadoria" type="productCost" />
        <NumberField label="Custo do Veicúlo" type="vehicleCost" />
        <NumberField label="Peso" type="weight" />
        <NumberField label="Ad Valorem" type="adv" />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center bg-white">
      <MyTabs.Root defaultValue="calc" className="w-full">
        <MyTabs.Triggers items={items} className="mx-auto flex w-1/3 p-2" />
      </MyTabs.Root>
    </main>
  )
}
