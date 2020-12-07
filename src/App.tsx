import React, { useState } from 'react'

// Import Styles
import './styles/app.scss'

// Import components
import Player from './components/Player'
import Song from './components/Song'

// Import data
import chillHop from './data/data'
import Library from './components/Library'

const App: React.FC<{}> = () => {
  const [songs, setSongs] = useState(chillHop)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div>
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Library songs={songs} />
    </div>
  )
}

export default App
