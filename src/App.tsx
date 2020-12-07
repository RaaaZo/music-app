import React, { useState } from 'react'

// Import Styles
import './styles/app.scss'

// Import components
import Player from './components/Player'
import Song from './components/Song'

// Import data
import chillHop from './data/data'
import Library from './components/Library'
import Nav from './components/Nav'

const App: React.FC<{}> = () => {
  const [songs, setSongs] = useState(chillHop)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [libraryStatus, setLibraryStatus] = useState(false)

  return (
    <div className={`App ${libraryStatus && 'library-active'}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        songs={songs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library
        libraryStatus={libraryStatus}
        setSongs={setSongs}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
      />
    </div>
  )
}

export default App
