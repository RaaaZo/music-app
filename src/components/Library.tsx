import React from 'react'
import LibrarySong from './LibrarySong'

interface Props {
  songs: {
    name: string
    cover: string
    artist: string
    audio: string
    color: string[]
    id: string
    active: boolean
  }[]
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
  libraryStatus: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const Library: React.FC<Props> = ({
  libraryStatus,
  setSongs,
  songs,
  setCurrentSong,
  setIsPlaying,
}) => {
  return (
    <div className={`library ${libraryStatus && 'active-library'}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setIsPlaying={setIsPlaying}
            key={song.id}
            song={song}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
