import * as React from "react"
import { SidebarFolder } from './SidebarFolder'

export function Sidebar(props: any) {
  return (
    <div className="flex-none pt-2 bg-gray-800 text-white" style={{width: "300px"}}>
      <SidebarFolder depth={0} dir={props.files}/>
    </div>
  )
}