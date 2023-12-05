import './App.css';
import { useState, useEffect, useRef, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './components/DataContext';
import { SearchContext } from './components/SearchContext';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';

function App() {
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef(null)

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if (resData.results.length > 0) {
        setData(resData.results)
      } else {
        setMessage('Not Found')
      }
    }
    fetchData()
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <Fragment>
              <SearchBar handleSearch={handleSearch} ref={searchInput} />
              <DataContext.Provider value={data}>
                <Gallery />
              </DataContext.Provider>
            </Fragment>
          } />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

{/* <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
      <AlbumView/>
      <ArtistView/> */}
