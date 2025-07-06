'use client'

import { store } from '@/store/slices'
import { Provider } from 'react-redux'


export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}>{children}</Provider>
}