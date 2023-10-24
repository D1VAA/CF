/* eslint-disable no-use-before-define */
import axios, { AxiosResponse } from 'axios'
import { LiveSearch } from './Searchtool'
import { useEffect, useState } from 'react'

export type IBGEDistrict = {
  id: number
  nome: string
  municipio: Municipio
}

type Municipio = {
  id: number
  nome: string
  microrregiao: Microrregiao
  'regiao-imediata': RegiaoImediata
}

type Microrregiao = {
  id: number
  nome: string
  mesorregiao: Mesorregiao
}

type Mesorregiao = {
  id: number
  nome: string
  UF: Uf
}

type Uf = {
  id: number
  sigla: string
  nome: string
  regiao?: Uf
}

type RegiaoImediata = {
  id: number
  nome: string
  'regiao-intermediaria': Mesorregiao
}

export function FreightCalc() {
  const [cities, setCities] = useState<{ nome: string; sigla: string }[]>()
  useEffect(() => {
    async function getCities() {
      const res: AxiosResponse<IBGEDistrict[]> = await axios.get(
        'http://localhost:3000/api',
      )
      setCities(res)
    }
    getCities()
    // setCities([
    //   { nome: 'teste 1', sigla: 'PR' },
    //   { nome: 'teste 2', sigla: 'SC' },
    // ])
  }, [])
  return (
    <div>
      <LiveSearch cities={cities} />
    </div>
  )
}
