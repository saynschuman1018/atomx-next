import { createContext } from 'react'

export type GridContextType = {
  root: boolean
}

export const GridContext = createContext<GridContextType>({
  root: true,
})
