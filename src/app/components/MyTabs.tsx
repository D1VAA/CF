import * as Tabs from '@radix-ui/react-tabs'
import { ReactNode } from 'react'

type RootProps = Tabs.TabsProps & {
  children: ReactNode
}

type TriggersProps = Tabs.TabsProps & {
  items: {
    label: string
    value: string
    content: ReactNode
  }[]
}

export const MyTabs = {
  Root,
  Triggers,
}

function Root({ children, ...props }: RootProps) {
  return <Tabs.Root {...props}>{children}</Tabs.Root>
}

function Triggers({ items, ...props }: TriggersProps) {
  return (
    <>
      <Tabs.List {...props} className="flex h-12 w-96">
        {items.map(({ label, value }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className="w-1/3 select-none border-b-2 text-xl font-extralight text-indigo-950 data-[state=active]:border-b-violet-900"
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="h-full w-full p-5">
        {items.map(({ value, content }) => (
          <Tabs.Content
            key={value + value}
            value={value}
            className="flex flex-row justify-center text-lg font-thin text-slate-600"
          >
            {content}
          </Tabs.Content>
        ))}
      </div>
    </>
  )
}
