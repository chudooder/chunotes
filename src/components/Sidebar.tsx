import * as React from "react"
import { SidebarFolder } from './SidebarFolder'

import axios from 'axios'

export function Sidebar(props: any) {
  return (
    <div className="flex-none pt-2 bg-gray-800 text-white w-1/6">
      <SidebarFolder depth={0} dir={props.files}/>
    </div>
  )
}