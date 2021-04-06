import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { Search } from 'react-bootstrap-icons'
import { SearchResult } from './SearchResult'

export function SearchBar() {
  const [ searchResults, setSearchResults ] = useState([])
  const [ query, setQuery ] = useState('')

  function escapeQueryString(query: string) {
    return query.replace(' ', '+')
  }

  function handleSubmit(event: any) {
    if (query.length >= 3) {
      axios.get(`/api/search?q=${escapeQueryString(query)}`)
        .then((response) => {
          setSearchResults(response.data)
        })
    }
    event.preventDefault()
  }

  function handleChange(event: any) {
    setQuery(event.target.value)
  }

  function handleDismissSearch(event: any) {
    setSearchResults([])
  }

  const searchModal = searchResults.length === 0 ? null : (
    <div className="fixed left-0 top-0 z-10 bg-black bg-opacity-30 w-screen h-screen"
        onClick={handleDismissSearch}>
      <div className="absolute top-20 bg-white rounded-md border-gray-300 shadow-md text-black overflow-y-auto" 
          style={{left: '50%', transform: 'translate(-50%, 0%)', maxHeight: '75%', minWidth: '50%', maxWidth: '75%'}}>
        { searchResults.map((result, i) => {
          return (
            <SearchResult key={i} result={result}/>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="relative flex flex-row items-center">
      <Search className="inline-block mr-2" size={24}/>
      <form onSubmit={handleSubmit}>
        <input className="focus:ring-indigo-500 focus:border-indigo-500 text-black rounded-md py-1 px-2 border border-gray-300" 
          type="text"
          value={query}
          onChange={handleChange}/>
      </form>
      { searchModal }
    </div>
  )
}