import { promises as fsPromises } from 'fs'
import * as path from 'path'
import { spawn } from 'child_process'
import { SearchResult } from '../types/searchresult'

function toExpression(searchTerm: string) {
  // TODO: parse search term
  return searchTerm
}

function parseResult(root: string, grepOutput: string): SearchResult[] {
  const lines = grepOutput.split('\n')
  const searchResults = lines.filter((line) => line.length > 0).map((line) => {
    const match = line.match(/(.*):(\d*):(.*)/)
    const filePath = match[1]
    const lineNumber = parseInt(match[2])
    const context = match[3]

    return {
      filePath: path.relative(root, filePath),
      lineNumber: lineNumber,
      context: context
    }
  })
  return searchResults
}

export function search(root: string, searchTerm: string) : Promise<SearchResult[]> {
  return new Promise((resolve, reject) => {
    if (searchTerm.length < 3) {
      resolve([])
    } else {
      const child = spawn('grep', ['-nre', toExpression(searchTerm), root])
      let grepOutput = ''
      child.stdout.on('data', (buffer) => { grepOutput += buffer.toString() })
      child.stdout.on('end', () => {
        resolve(parseResult(root, grepOutput))
      })
    }
  })
}