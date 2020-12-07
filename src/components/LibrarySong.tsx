import React from 'react'

interface Props {
  song: {
    name: string
    cover: string
    artist: string
    audio: string
    color: string[]
    id: string
    active: boolean
  }
  setCurrentSong: React.Dispatch<
    React.SetStateAction<{
      name: string
      cover: string
      artist: string
      audio: string
      color: string[]
      id: string
      active: boolean
    }>
  >
  songs: {
    name: string
    cover: string
    artist: string
    audio: string
    color: string[]
    id: string
    active: boolean
  }[]
  setSongs: React.Dispatch<
    React.SetStateAction<
      {
        name: string
        cover: string
        artist: string
        audio: string
        color: string[]
        id: string
        active: boolean
      }[]
    >
  >
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const LibrarySong: React.FC<Props> = ({ setSongs, songs, song, setCurrentSong, setIsPlaying }) => {
  const songSelectHandler = () => {
    setCurrentSong(song)
    setIsPlaying(false)
    setSongs(newSongs)
  }

  const newSongs = songs.map((item) => {
    if (item.id === song.id) {
      return {
        ...item,
        active: true,
      }
    } else {
      return {
        ...item,
        active: false,
      }
    }
  })

  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active && 'selected'}`}>
      <img src={song.cover} alt={song.name} />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong
