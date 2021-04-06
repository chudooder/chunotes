import * as React from 'react'
import { useState, useContext } from 'react'

import { FileContext } from "../contexts/File"

type SidebarFileProps = {
  depth: number
  path: string
  name: string
}
export function SidebarFile(props: SidebarFileProps) {
  const {state, dispatch} = useContext(FileContext)
  const [hover, setHover] = useState(false)

  const selected = state.selectedFile === props.path

  function onClick() {
    dispatch({type: 'select_file', filePath: props.path})
  }

  let style = {
    paddingLeft: 20 + 20 * (props.depth - 1)
  }

  let className = null
  if (selected) {
    className = 'bg-gray-500'
  } else if (hover) {
    className = 'bg-gray-600'
  }

  return (
    <div className={className} style={style} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
      onClick={onClick}>

      { props.name }
    </div>
  )
}