'use client'

type TextFieldProps = {
  title: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextField({
  title,
  placeholder,
  value,
  onChange,
}: TextFieldProps) {
  return (
    <label className="flex flex-col font-normal text-sky-950">
      {title}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="rounded-xl border border-sky-900/75 px-5 py-2 text-lg text-slate-700 outline-none placeholder:font-light"
        placeholder={placeholder}
      />
    </label>
  )
}
