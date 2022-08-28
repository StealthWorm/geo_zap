import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import imgGirl from '../assets/womanCell.svg'

export function Home() {
  const navigate = useNavigate();

  function handleEnter(event: FormEvent) {
    event.preventDefault();

    navigate('/main');
  }
  return (
    <div className="min-h-screen bg-blur flex flex-row items-center justify-center gap-6">
      <div className="flex m-[3rem] bg-gray-500 rounded-sm p-[1rem]">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-sans font-bold text-[3rem] text-blue-400">O mapa da sua cidade</h1>
            <p className="font-sans text-md">Encontre um grupo de whats perto de você!!</p>
          </div>
          <button onClick={handleEnter} className="flex bg-blue-400 rounded-[4px] justify-center w-full mt-10 hover:bg-blue-500 transition-colors duration-500 py-[1rem]">Localize um grupo</button>
        </div>
        <div>
          <img src={imgGirl} alt="map" className="h-[20rem]" />
        </div>
      </div>
    </div>
  )
}