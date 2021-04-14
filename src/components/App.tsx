import * as React from "react"
import { useState, useEffect } from "react"
import axios from 'axios'
import Split from "react-split"

import { FileProvider } from "../contexts/File"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { Viewer } from "./Viewer"

import "../styles/gutter.css"
import "../styles/fullscreen.css"

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
      <div className="flex flex-col h-screen">
        <div className="flex-none">
          <Header/>
        </div>
        <div className="flex-1">
          <Split className="split app-container" sizes={[25, 75]}>
            <Sidebar files={files}/>
            <Viewer/>
          </Split>
        </div>
      </div>
    </FileProvider>
  )
}