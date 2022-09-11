import React from 'react'

export default function Character({character}) {
  return (
    <div style={{
        padding: '1rem',
        border: 'solid 0.2rem',
        margin: '0.5rem',
        width: '50%'
    }}>
        <div>{character.title}</div>
        <div>{character.category}</div>
    </div>
  )
}
