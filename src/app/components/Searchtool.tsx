import { useState } from 'react'

type Cities = {
  nome: string
  sigla: string
}

type SearchProps = {
  cities: Cities[] | undefined
}

export function LiveSearch({ cities }: SearchProps) {
  const [filteredItems, setFilteredItems] = useState(cities)
  console.log(filteredItems)
  return (
    <div className="relative h-full w-fit">
      Origem
      <input
        type="text"
        className="peer/search w-full rounded-full border-2 border-indigo-900/75 px-5 py-2 text-lg font-thin text-slate-700 outline-none"
        placeholder="Search"
        onChange={(e) => {
          const inputValue = (e.target as HTMLInputElement).value
          const filtered = cities?.filter(({ nome, sigla }) =>
            (nome + sigla).toLowerCase().includes(inputValue.toLowerCase()),
          )
          if (filtered === undefined) return
          setFilteredItems(filtered)
        }}
      />
      <div className="absolute mt-1 hidden max-h-40 w-full overflow-scroll rounded-bl rounded-br bg-white p-2 text-black shadow-lg peer-focus/search:block">
        {filteredItems === undefined || filteredItems.length <= 5
          ? ''
          : filteredItems.map(({ nome, sigla }) => (
              <div
                key={nome + sigla}
                className="cursor-pointer p-2 font-thin hover:bg-slate-900 hover:bg-opacity-10"
              >
                {`${nome}, ${sigla}`}
              </div>
            ))}
      </div>
    </div>
  )
}
