import * as React from 'react'

import { SearchBar } from './SearchBar'

export function Header() {
  return (
    <div className="sticky top-0 pt-2 pb-2 flex bg-gray-900 text-white">
      <div className="flex-none inline-block w-1/6">
        <span className="ml-5 inline-block align-middle font-bold"> Marked </span>
      </div>
      <div className="flex-auto inline-block pl-5 pr-5 w-auto">
        <SearchBar/>
      </div>
    </div>
  )
}