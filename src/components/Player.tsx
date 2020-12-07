import React, { useRef, useState } from 'react'
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
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

interface SongInfo {
  currentTime: number
  duration: number
}

const Player: React.FC<Props> = ({ currentSong, isPlaying, setIsPlaying }) => {
  // States
  const [songInfo, setSongInfo] = useState<SongInfo>({
    currentTime: 0,
    duration: 0,
  })

  const audioRef = useRef<HTMLMediaElement>(null)

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

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          type='range'
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>

      <div className='play-control'>
        <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon className='skip-forward' size='2x' icon={faAngleRight} />
      </div>

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  )
}

export default Player
