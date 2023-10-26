/* eslint-disable no-use-before-define */

export type IBGEDistrict = {
  id: number
  nome: string
  municipio: Municipio
}

export type Municipio = {
  id: number
  nome: string
  microrregiao: Microrregiao
  'regiao-imediata': RegiaoImediata
}

export type Microrregiao = {
  id: number
  nome: string
  mesorregiao: Mesorregiao
}

export type Mesorregiao = {
  id: number
  nome: string
  UF: Uf
}

export type Uf = {
  id: number
  sigla: string
  nome: string
  regiao?: Uf
}

export type RegiaoImediata = {
  id: number
  nome: string
  'regiao-intermediaria': Mesorregiao
}
