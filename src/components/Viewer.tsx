import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import * as gfm from 'remark-gfm'
import Highlight from 'react-syntax-highlighter'
import androidstudio from 'react-syntax-highlighter/dist/esm/styles/hljs/androidstudio'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'

import { FileContext } from "../contexts/File"

type CodeArgs = {
  language?: string,
  value?: React.ReactNode
}

export function Viewer(props: any) {
  const {state, dispatch} = useContext(FileContext)
  const [fileContents, setFileContents] = useState('')

  useEffect(() => {
    if (!state.selectedFile) {
      return
    }
    axios.get('/api/files/' + state.selectedFile)
      .then((response) => {
        setFileContents(response.data)
      })
      .catch((err) => {
        setFileContents('oops')
      })
  }, [state.selectedFile])

  const customRenderers = {
    code: ({language, value}: CodeArgs) => {
      return (<Highlight showLineNumbers={true} style={androidstudio} language={language} children={value}/>)
    },
    listItem: (props: any) => {
      let checkbox = null
      if (props.checked !== null && props.checked !== undefined) {
        const checked = props.checked
        checkbox = <input type='checkbox' checked readOnly={true}/>
      }
      const className = props.ordered ? 'list-decimal' : 'list-disc'
      return (
        <li className={className}>
          {checkbox}
          {props.children}
        </li>
      )
    } 
  }

  return (
    <div className="px-5 py-5 box-border markdown-body display-block w-full max-h-full h-full overflow-y-auto">
      <ReactMarkdown renderers={customRenderers} plugins={[[gfm, {singleTilde: false}]]}>
        { fileContents }
      </ReactMarkdown>
    </div>
  )
}