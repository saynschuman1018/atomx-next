import { createContext, useState } from 'react'

export const useAccordionContext = (options: AccordionOptions): [AccordionContextType] => {
  const [activeRows, setActiveRows] = useState(options.activeRows)

  const openRow: AccordionContextType['openRow'] = (i) => {
    if (!activeRows.includes(i)) {
      if (!options.multiple) {
        setActiveRows([i])
      } else {
        setActiveRows([
          ...activeRows,
          i,
        ])
      }
    }
  }

  const closeRow: AccordionContextType['closeRow'] = (i) => {
    if (activeRows.includes(i)) {
      const newRows = [ ...activeRows ]

      newRows.splice(newRows.indexOf(i), 1)

      setActiveRows(newRows)
    }
  }

  const toggleRow: AccordionContextType['toggleRow'] = (i) => {
    if (activeRows.includes(i)) {
      closeRow(i)
    } else {
      openRow(i)
    }
  }

  const value: AccordionContextType = {
    ...options,
    activeRows,
    openRow,
    closeRow,
    toggleRow,
  }

  return [value]
}

export const extractOptions = <P extends Record<string, unknown>>(props: P): [AccordionOptions, Omit<P, keyof AccordionOptions>] => {
  const extractedProps = props
  const extractedOptions: Partial<AccordionOptions> = {}

  for (const key in defaultAccordionOptions) {
    // @ts-ignore
    extractedOptions[key] = key in props ? props[key] : defaultAccordionOptions[key]

    if (key in extractedProps) {
      delete extractedProps[key]
    }
  }

  return [Object.assign(defaultAccordionOptions, extractedOptions), extractedProps]
}

export type AccordionOptions = {
  large: boolean
  multiple: boolean
  activeRows: number[]
  openRow: (i: number) => void
  closeRow: (i: number) => void
  toggleRow: (i: number) => void
}

export const defaultAccordionOptions: AccordionOptions = {
  large: false,
  multiple: false,
  activeRows: [],
  openRow: () => {},
  closeRow: () => {},
  toggleRow: () => {},
}

export type AccordionContextType = AccordionOptions & {
  //
}

export const AccordionContext = createContext<AccordionContextType>(defaultAccordionOptions)