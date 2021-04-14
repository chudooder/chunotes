export type FileContextState = {
  selectedFile: string
}

export type FileContextAction = 
 | { type: "select_file", filePath: string }

function selectFile(state: FileContextState, filePath: string) {
  return {
    ...state,
    selectedFile: filePath
  }
}

export const reducer = (state: FileContextState, action: FileContextAction) => {
  switch (action.type) {
    case "select_file":
      return selectFile(state, action.filePath)
    default:
      return state
  }
}