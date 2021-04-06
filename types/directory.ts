export type Directory = {
  path: string
  files: string[]
  dirs: Directory[]
}