import { useState } from "react";

export function SelectFileButton({ onFileChange }) {
    const [fileSelected, setFileSelected] = useState('Nenhum arquivo selecionado.')

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file.name.includes('xlsx') || file.name.includes('xls')){
        onFileChange(file);
        setFileSelected(file.name)
        } else {
            alert('O arquivo precisa ser um Excel.')
        }
    }
  return (
    <>
      <span
        id="selectedFileName"
        className="flex h-12 w-fit justify-end rounded-full font-normal text-gray-400"
      >
       {fileSelected} 
      </span>
      <input type="file" id="fileInput" className="hidden" onChange={handleFileSelect} />
      <label
        htmlFor="fileInput"
        className="h-12 w-fit  cursor-pointer items-center justify-center rounded-full bg-sky-700 px-6 py-2 text-white hover:bg-sky-800"
      >
        <span className="font-normal tracking-wide text-white">
          Escolher arquivo
        </span>
      </label>
    </>
  )
}
