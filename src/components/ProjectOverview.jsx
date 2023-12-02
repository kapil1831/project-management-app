import React from 'react'

const buttonStyle = 'mx-3 px-2 py-1 text-stone-500 text-sm font-semibold border border-transparent rounded hover:border-stone-500 hover:text-white hover:bg-black';

const ProjectOverview = ({project, onDelete}) => {
  return (
    <div className='overview flex-auto border-b-2'>
        <div className='w-4/5 flex justify-between items-center'>
            <h1 className='mb-2  text-4xl font-semibold capitalize'>{project.title}</h1>
            <button onClick={() => onDelete(project)} className={buttonStyle}> Delete</button>
        </div>
        <p className='mb-2 text-xs text-stone-400'>{(new Date(project.dueDate) ).toDateString()}</p>
        <pre className='mb-3 '>{project.description}</pre>
    </div>
  )
}

export default ProjectOverview;