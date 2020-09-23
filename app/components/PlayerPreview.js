import React from 'react'
import Proptypes from 'prop-types'
import { FaTimesCircle } from 'react-icons/fa'


export default function PlayerPreview ( { username, label, onReset }) {
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            className='avatar-small'
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a
            href={`https://github.com/${username}`}
            className='link'>
              {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='rgb(194, 57, 42)' size={26}/>
        </button>
      </div>

    </div>
  )
}

PlayerPreview.propTypes = {
  username: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  onReset: Proptypes.func.isRequired
}