import * as React from 'react'

import { SearchBar } from './SearchBar'

export function Header() {
  return (
    <div className="sticky top-0 py-3 flex bg-gray-900 text-white h-header">
      <div className="flex-none inline-block w-1/6">
        <span className="ml-5 inline-block align-middle font-bold"> Marked </span>
      </div>
      <div className="flex-grow inline-block pl-5 pr-5 w-auto">
        <SearchBar/>
      </div>
    </div>
  )
}