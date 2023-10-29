'use client'
import { Money, HandCoins, Barbell, Percent } from '@phosphor-icons/react'

// function CurrentIcon(type) {
//   const
// }

const possibleFields = {
  productCost: {
    Icon: Money,
    measure: 'R$',
  },
  vehicleCost: {
    Icon: HandCoins,
    measure: 'R$',
  },
  weight: {
    Icon: Barbell,
    measure: 'KG',
  },
  adv: {
    Icon: Percent,
    measure: '.%',
  },
}

type NumberFieldProps = {
  label: string
  type: 'productCost' | 'vehicleCost' | 'weight' | 'adv'
}

export function NumberField({ label, type }: NumberFieldProps) {
  const Current = possibleFields[type]
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-full border border-indigo-900/30 px-3 py-0.5">
      <Current.Icon size={32} className="mr-3 text-indigo-900" />
      <label className="flex w-fit flex-col">
        {label}
        <div className="flex w-fit text-xl">
          <span>{Current.measure}</span>
          <input
            type="text"
            className="ml-2 border-none outline-none"
            placeholder="0,00"
          />
        </div>
      </label>
    </div>
  )
}
