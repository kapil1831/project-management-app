import React, { useRef, useState } from 'react'


const buttonStyle = 'w-20 mx-1 px-3 py-1.5 text-sm font-medium border rounded hover:border-stone-800'
const inputStyle = 'p-1 text-base font-normal bg-stone-200';

let nextId = 4;

const ProjectForm = ({onCancel, onSave}) => {
   
    const [newProject, setNewProject] = useState({
        title:'',
        description:'',
        dueDate:''
    });

    function handleChange(modProject){
        // console.log(modProject)
        setNewProject(modProject);
    }

    function handleSave(){
        if(newProject.title==='' || newProject.description === ''|| newProject.dueDate==='' ) return;
        onSave({
            ...newProject,
            id: nextId,
            tasks: []
        })
        nextId += 1;
    }

    
    return (
    <div className="flex-auto flex flex-col mt-5 px-5 py-8 text-black font-medium ">
        <form >
            <div className='flex justify-end'>
                <button onClick={onCancel} className={buttonStyle} >Cancel</button>
                <button type='submit' onClick={handleSave} className={buttonStyle + ' text-stone-300 bg-black hover:text-white'}>Save</button>
            </div>
            <div className='mt-5 text-stone-700'>
                <p className='flex flex-col mx-1 mt-2.5 text-sm font-semibold'>
                    <label htmlFor="title" className='uppercase'>Title</label>
                    <input value={newProject.title} onChange={(e) => handleChange({...newProject, title: e.target.value})} id="title" className={inputStyle}  required/>
                </p>
                <p className='flex flex-col mx-1 mt-2.5 text-sm font-semibold'>
                    <label htmlFor="description" className='uppercase'>Description</label>
                    <textarea value={newProject.description} onChange={(e) => handleChange({...newProject, description: e.target.value})}  id="description"  className={inputStyle} required/>
                </p>
                <p className='flex flex-col mx-1 mt-2.5 text-sm font-semibold'>
                    <label htmlFor="due-date" className='uppercase'>Due Date</label>
                    <input value={newProject.dueDate} onChange={(e) => handleChange({...newProject, dueDate: e.target.value})} type='date' id="due-date" className={inputStyle + ' border-b-2 border-stone-800'} required />
                </p>
            </div>
        </form>
    </div>
  )
}

export default ProjectForm