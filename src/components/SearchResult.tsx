import * as React from 'react'
import { useContext } from 'react'
import { SearchResult as SearchResultType } from '../../types/searchresult'
import { FileContext } from "../contexts/File"

type SearchResultArgs = {
  result: SearchResultType
}
export function SearchResult(props: SearchResultArgs) {
  const { state, dispatch } = useContext(FileContext)

  function handleClick(event: any) {
    dispatch({type: 'select_file', filePath: props.result.filePath})
  }

  return (
    <div className="m-5 p-5 rounded-md bg-gray-100 hover:bg-blue-400 hover:text-white" onClick={handleClick}>
      <div className="font-mono">
        <span className="text-yellow-800">{ props.result.filePath }:</span>
        <span className="text-yellow-600">{ props.result.lineNumber }</span>
      </div>
      <p className="font-mono whitespace-nowrap truncate">{ props.result.context }</p>
    </div>
  )
}