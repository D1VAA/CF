'use client'
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
    <div className="h-full overflow-hidden">
      <Tabs.List {...props}>
        {items.map(({ label, value }) => (
          <Tabs.Trigger
            key={value}
            value={value}
            className="w-1/3 select-none border-b-2 text-xl text-sky-950 data-[state=active]:border-b-sky-900"
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {items.map(({ value, content }) => (
        <Tabs.Content
          key={value + value}
          value={value}
          className="h-full text-lg text-slate-500"
        >
          {content}
        </Tabs.Content>
      ))}
    </div>
  )
}
