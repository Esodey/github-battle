import React from 'react'

export default function LanguagesNav ({ selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className='flex-center'>
        {languages.map((language) => (
          <li key={language}>
            <button 
              className='btn-clear nav-link'
              style={language === selected ? {color: 'rgb(187, 46, 31)'} : null}
              onClick={() => onUpdateLanguage(language)}>
              {language}
            </button>
          </li>
        ))}
      </ul>
    )
}