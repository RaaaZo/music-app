import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

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

  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

interface SongInfo {
  currentTime: number
  duration: number
}

const Player: React.FC<Props> = ({
  setSongs,
  setCurrentSong,
  setIsPlaying,
  songs,
  currentSong,
  isPlaying,
}) => {
  // States
  const [songInfo, setSongInfo] = useState<SongInfo>({
    currentTime: 0,
    duration: 0,
  })

  const audioRef = useRef<HTMLMediaElement>(null)

  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100

  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying((prevState) => !prevState)
    } else {
      audioRef.current?.play()
      setIsPlaying((prevState) => !prevState)
    }
  }

  const timeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const current = e.currentTarget.currentTime
    const duration = e.currentTarget.duration

    setSongInfo({ ...songInfo, currentTime: current, duration: duration })
  }

  const getTime = (time: number): string => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  const dragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    audioRef.current!.currentTime = +e.target.value
    setSongInfo({ ...songInfo, currentTime: +e.target.value })
  }

  const skipTrackHandler = async (direction: string): Promise<void> => {
    const songsLength = songs.length
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)

    switch (direction) {
      case 'skip-forward':
        await setCurrentSong(songs[(currentIndex + 1) % songsLength])
        if (isPlaying) audioRef.current?.play()
        break

      case 'skip-back':
        if ((currentIndex - 1) % songsLength === -1) {
          await setCurrentSong(songs[songsLength - 1])
        } else {
          await setCurrentSong(songs[(currentIndex - 1) % songsLength])
        }
        if (isPlaying) audioRef.current?.play()
        break

      default:
        break
    }
  }

  const songEndHandler = async (): Promise<void> => {
    const songsLength = songs.length
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songsLength])
    if (isPlaying) audioRef.current?.play()
  }

  useEffect(() => {
    const newSongs = songs.map((item) => {
      if (item.id === currentSong.id) {
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

    setSongs(newSongs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, setSongs])

  // Add styles
  const trackAnim = {
    transform: `translateX(${animationPercentage}%)`,
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className='track'
        >
          <input
            min={0}
            max={songInfo.duration || 0.0}
            value={songInfo.currentTime}
            type='range'
            onChange={dragHandler}
          />
          <div style={trackAnim} className='animate-track'></div>
        </div>

        <p>{getTime(songInfo.duration || 0.0)}</p>
      </div>

      <div className='play-control'>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-back')}
          className='skip-back'
          size='2x'
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  )
}

export default Player
