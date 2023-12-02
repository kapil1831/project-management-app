import React, { useState } from 'react'

const buttonStyle = 'mx-3 px-2 py-1 text-stone-500 text-sm font-semibold border border-transparent rounded hover:border-stone-500 hover:text-white hover:bg-black';

const Tasks = ({project, onProjectUpdate}) => {
  const tasksCount = project.tasks.length;
 
  const [newTask, setNewTask] = useState('');

  function handleChange(e) {
    setNewTask(e.target.value);
  }

  function handleAddTaskClick(){
    onProjectUpdate(
      {
        ...project,
        tasks: [ ...project.tasks, newTask]
      }
    )
    setNewTask('');
  }

  function handleClear(taskToRemove){
    onProjectUpdate(
      {
        ...project,
        tasks: project.tasks.filter(task => task !== taskToRemove)
      }
    )
  }
  

  return (
    <div className='flex-auto mt-4 text-sm font-semibold'>
        <h1 className='mb-3 text-3xl font-semibold'>Tasks</h1>
        
        <input type='text' value={newTask} onChange={handleChange} className='px-2 py-1 text-base bg-stone-300 rounded' required/> 
        <button onClick={handleAddTaskClick}  className={buttonStyle}>Add Task</button>
       
        {tasksCount == 0 && <p className='mt-2 text-sm font-medium'>This project does not have any tasks yet</p>}
        {tasksCount != 0 && 
          <div className='mt-5 py-3 bg-stone-300 rounded'> 
              {project.tasks.map((task, index) =>{
                return <div key={index} className='flex justify-between items-center my-1 pl-3'>
                    <span>{task}</span><button onClick={() => handleClear(task)} className={buttonStyle}>Clear</button>
                   </div>
              })}
          </div> 
        }
    </div>
  )
}

export default Tasks