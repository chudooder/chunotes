import { promises as fsPromises } from 'fs'
import * as path from 'path'
import { Directory } from '../types/directory'

export function listDirectory(root: string): Promise<Directory> {
  return listDirectoryHelper(root, '')
}

async function listDirectoryHelper(root: string, relativePath: string): Promise<Directory> {
  let dir: Directory = {
    path: relativePath,
    files: [],
    dirs: []
  }

  const entries = await fsPromises.readdir(path.join(root, relativePath), { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      dir.dirs.push(await listDirectoryHelper(root, path.join(relativePath, entry.name)))
    } else {
      dir.files.push(entry.name)
    }
  }

  return dir
}

export async function readFile(path: string): Promise<string> {
  const result = await fsPromises.readFile(path)
  return result.toString()
}