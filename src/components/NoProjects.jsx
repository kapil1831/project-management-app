import React from 'react';
import logo from '../assets/no-projects.png';

const buttonStyle = 'mx-1 px-3 py-1.5 text-sm font-medium border rounded'

const NoProjects = ({onAddProject}) => {

  return (
    <div className="flex-auto flex flex-col justify-center items-center mt-5 px-5 py-8 text-black text-sm font-normal ">
        <img src={logo} className='w-10 max-w-full max-h-full my-2' />
        <h2 className='text-lg font-bold'>No Project Selected</h2>
        <p className='my-5 text-stone-400'>Select a project or get started with a new one</p>

        <button onClick={onAddProject} className={buttonStyle + ' text-stone-300 bg-black hover:text-stone-100'}> Create new project </button>
    </div>
  )
}

export default NoProjects