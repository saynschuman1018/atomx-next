import { createContext } from 'react'

export type AccordionPanelContextType = {
  i: number
  open: boolean
}

export const AccordionPanelContext = createContext<AccordionPanelContextType>({
  i: 0,
  open: false,
})