import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center p-8">
      <embed src="https://qualp.com.br/" className="h-full w-8/12" />
    </main>
  )
}
