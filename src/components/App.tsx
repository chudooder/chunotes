import * as React from "react"
import { useState, useEffect } from "react"
import axios from 'axios'

import { FileProvider } from "../contexts/File"
import { Sidebar } from "./Sidebar"
import { Viewer } from "./Viewer"

export function App(props: any) {
  const [files, setFiles] = useState({path: '', files: [], dirs: []})
  

  useEffect(() => {
    axios.get('/api/files')
      .then(response => {
        setFiles(response.data)
      })
  }, [props])

  return (
    <FileProvider>
      <div className="flex flex-row items-stretch h-full min-h-screen">
        <Sidebar files={files}/>
        <Viewer className="pl-10 flex-1"/>
      </div>
    </FileProvider>
  )
}