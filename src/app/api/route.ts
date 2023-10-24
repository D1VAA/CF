import { NextResponse } from 'next/server'
import { IBGEDistrict } from '../components/Freight'
import axios, { AxiosResponse } from 'axios'

function offset<T>(list: any[], offset: number): T[] {
  const newList = []
  for (let i = 0; i < offset; i++) {
    newList.push(list[i])
  }
  return newList
}

async function CitiesList() {
  const response: AxiosResponse<IBGEDistrict[]> = await axios.get(
    'https://servicodados.ibge.gov.br/api/v1/localidades/distritos',
  )
  return response.data.map(
    ({
      nome,
      municipio: {
        microrregiao: {
          mesorregiao: {
            UF: { sigla },
          },
        },
      },
    }) => ({ nome, sigla }),
  )
}

export async function GET(request: Request) {
  const cities = offset<IBGEDistrict>(await CitiesList(), 5)
  return NextResponse.json({ hello: cities })
}
