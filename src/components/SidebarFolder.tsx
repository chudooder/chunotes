import * as React from "react"
import { useState } from "react"
import { Directory } from '../../types/directory'

import { CaretRightFill, CaretDownFill, Folder2, Folder2Open } from 'react-bootstrap-icons'

import { SidebarFile } from './SidebarFile'

type SidebarFolderProps = {
  depth: number,
  dir: Directory
}
export function SidebarFolder(props: any) {
  const [open, setOpen] = useState(true)
  const [hover, setHover] = useState(false)

  function onFolderClick() {
    setOpen(!open)
  }

  const dirs = props.dir.dirs
    .sort((a: Directory, b: Directory) => {
      return a.path > b.path ? 1 : -1
    })
    .map((dir: Directory, i: number) => {
      return (
        <SidebarFolder key={i} depth={props.depth + 1} dir={dir}/>
      )
    })

  const files = props.dir.files
    .sort((a: string, b: string) => {
      return a > b ? 1 : -1
    })
    .map((file: string, i: number) => {
    return (
      <SidebarFile key={i} path={props.dir.path + '/' + file} depth={props.depth + 1} name={file}/> 
    )
  })

  // For the root directory, display the contained dirs and files directly
  if (props.depth === 0) {
    return (
      <>
        { dirs }
        { files }
      </>
    )
  }

  const name = props.dir.path.substring(props.dir.path.lastIndexOf('/') + 1)

  const folderIcon = open ? <Folder2Open className="inline-block"/>
                          : <Folder2 className="inline-block"/>

  const caretIcon = open ? <CaretDownFill className="inline-block"/>    
                         : <CaretRightFill className="inline-block"/>

  const className = hover ? 'bg-gray-600 text-blue-100' : 'text-blue-100'

  return (
    <>
      <div className={className} 
        style={{paddingLeft: 20 + 20 * (props.depth - 1)}} 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onFolderClick}>
        
        { caretIcon } { folderIcon } { name }
      </div>
      <div>
        { open ? dirs : null }
        { open ? files : null }
      </div>
    </>
  )
}