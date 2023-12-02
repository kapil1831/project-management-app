import React from 'react'

const Sidebar = ({projects, selectedProject, onSelect, onAddProject}) => {
  const listItemStyle = 'hover:text-white hover:bg-stone-800 px-2 py-1 my-2 rounded';

  return (
    <aside className='w-1/4 h-screen bg-black text-stone-400  p-8 mt-5 rounded-r-xl' >
        <h2 className='text-white text-2xl mb-8'> Your Projects </h2>

        <button onClick={onAddProject} className='bg-stone-800 px-2.5 py-1.5 mb-8 rounded'>
            + Add Project
        </button>

        <div className='projects-list'>
            {projects.map(project =>{
              return <p key={project.id} onClick={() => onSelect(project)} className={listItemStyle + (selectedProject === project ? ' current-selection' : '')}>{project.title}</p> ; 
            })}
        </div>
    </aside>
  )
}

export default Sidebar