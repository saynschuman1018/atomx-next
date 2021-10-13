import 'react-redux'
import { RootState } from './store/store'

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {

  }
}
