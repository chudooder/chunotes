import * as React from "react"
import { Dispatch } from "react"
import { FileContextState, FileContextAction, reducer } from "./reducer"

const initialState: FileContextState = {
  selectedFile: null
}

export const FileContext = React.createContext({
  state: initialState,
  dispatch: null
})

export const FileProvider = ({ children }: any) => {
  const [ state, dispatch ] = React.useReducer(reducer, initialState)

  return (
    <FileContext.Provider value={{state, dispatch}}>
      { children }
    </FileContext.Provider>
  )
}