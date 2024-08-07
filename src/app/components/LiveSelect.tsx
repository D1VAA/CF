'use client'
import axios, { AxiosResponse } from 'axios'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import { IBGEDistrict } from '../types/API'

interface LiveSelectProps {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function LiveSelect({ label, value, onChange }: LiveSelectProps) {
  const [districts, setDistricts] = useState<IBGEDistrict[]>()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<FixedSizeList>(null)

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const currentDistrict = (districts ?? [])[index]
    const sigla = currentDistrict.municipio.microrregiao.mesorregiao.UF.sigla
    const inputValue =
      inputRef.current === null || inputRef.current.value.trim() === ''
        ? 'EmptyString'
        : inputRef.current?.value.toLowerCase()
    return (
      <li
        style={style}
        className={
          'flex cursor-pointer gap-x-1 rounded-md p-1 px-3 hover:bg-slate-500/10' +
          (currentDistrict.nome.toLowerCase().includes(inputValue)
            ? ' bg-sky-700/40 font-bold text-white hover:bg-sky-400/50'
            : '')
        }
        onClick={() => {
          if (inputRef.current === null) return
          inputRef.current.value = `${currentDistrict.nome}, ${sigla}`
          onChange({
            target: {
              name: inputRef.current.name,
              value: inputRef.current.value,
            },
          } as React.ChangeEvent<HTMLInputElement>)
        }}
      >
        <span>{currentDistrict.nome},</span>
        <span>{sigla}</span>
      </li>
    )
  }

  useEffect(() => {
    async function getDistricts() {
      const res: AxiosResponse<IBGEDistrict[]> = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/distritos`,
      )
      setDistricts(res.data)
    }
    getDistricts()
  }, [])

  if (districts === undefined) return <div>Loading</div>
  return (
    <div className="relative h-full w-fit">
      <h2 className="font-normal tracking-wide text-sky-950">{label}</h2>
      <input
        type="text"
        className="peer/search w-full rounded-xl border border-sky-900/75 px-5 py-2 text-lg text-slate-700 outline-none"
        placeholder="Search"
        ref={inputRef}
        value={value}
        onChange={(e) => {
          onChange(e)
          const value = e.target.value
          const itemIndex = districts.findIndex((item) => {
            const {
              nome,
              municipio: {
                microrregiao: {
                  mesorregiao: {
                    UF: { sigla },
                  },
                },
              },
            } = item
            const nameLower = nome.toLowerCase()
            const siglaLower = sigla.toLowerCase()
            const valueLower = value.toLowerCase()
            return (
              nameLower.includes(valueLower) || siglaLower.includes(valueLower)
            )
          })
          listRef.current?.scrollToItem(itemIndex, 'center')
        }}
      />
      <ul className="absolute mt-1 hidden max-h-40 w-full overflow-hidden rounded-bl rounded-br bg-white p-1 text-black shadow-lg hover:block peer-focus/search:block">
        <FixedSizeList
          height={200}
          itemCount={districts?.length ?? 1}
          itemSize={37}
          width={250}
          ref={listRef}
        >
          {Row}
        </FixedSizeList>
      </ul>
    </div>
  )
}
