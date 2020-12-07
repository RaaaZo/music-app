import React from 'react'

interface Props {
  currentSong: {
    name: string
    cover: string
    artist: string
    audio: string
    color: string[]
    id: string
    active: boolean
  }
}

const Song: React.FC<Props> = ({ currentSong }) => {
  return (
    <div className='song-container'>
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  )
}

export default Song
