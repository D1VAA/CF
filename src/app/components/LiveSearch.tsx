import axios, { AxiosResponse } from 'axios'
import { useEffect, useRef, useState } from 'react'

export function LiveSearch() {
  const [filteredItems, setFilteredItems] = useState<string[]>()
  const inputRef = useRef<HTMLInputElement>(null)

  async function getInitialData() {
    const res: AxiosResponse<string[]> = await axios.get(
      'http://localhost:9999/getlist',
    )
    setFilteredItems(res.data)
  }

  useEffect(() => {
    getInitialData()
  }, [])

  return (
    <div className="relative h-full w-fit">
      Origem
      <input
        type="text"
        className="peer/search w-full rounded-full border-2 border-indigo-900/75 px-5 py-2 text-lg font-thin text-slate-700 outline-none"
        placeholder="Search"
        ref={inputRef}
        onChange={(e) => {
          const inputValue = (e.target as HTMLInputElement).value
          async function getFiltered() {
            const res: AxiosResponse<string[]> = await axios.get(
              `http://localhost:9999/filter/${inputValue}?length=8`,
            )
            if (res.data.length === 0 || inputValue.trim() === '') {
              getInitialData()
              return
            }
            setFilteredItems(res.data)
          }
          getFiltered()
        }}
      />
      <div className="absolute mt-1 hidden max-h-40 w-full overflow-scroll rounded-bl rounded-br bg-white p-2 text-black shadow-lg peer-focus/search:block">
        {filteredItems === undefined
          ? ''
          : filteredItems.map((city) => (
              <div
                key={city}
                className="cursor-pointer p-2 font-thin hover:bg-slate-900 hover:bg-opacity-10"
                onClick={() => {
                  if (inputRef.current === null) return
                  inputRef.current.value = city
                }}
              >
                {city}
              </div>
            ))}
      </div>
    </div>
  )
}
