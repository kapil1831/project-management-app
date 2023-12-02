import { useEffect, useState } from "react";
import NoProjects from "./components/NoProjects";
import ProjectForm from "./components/ProjectForm";
import ProjectOverview from "./components/ProjectOverview";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import { clearStorage, fetchFromStorage, saveToStorage } from "./local_storage/storage";

const buttonStyle = 'mx-3 px-2 py-1 text-stone-500 text-sm font-semibold border border-transparent rounded hover:border-stone-500 hover:bg-black hover:text-white';

function App() {
  const [projects, setProjects] = useState([]); // stores the projects
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
     async function load(){
        const projects = await fetchFromStorage('projects');
        console.log(projects);
        setProjects(projects);
     }

     load();  

    //  setup a timer to keep on saving/syncing state every ten seconds
    //  const timer = setInterval(() => {
    //     setIsSaving(true);
    //     save(projects).then(() => {
    //       setTimeout(()=>setIsSaving(false), 1*1000);
    //     });
    //  }, 10*1000);

    //  return () => clearInterval(timer);

  } ,[]);


  

  const [selectedProject, setSelectedProject] = useState(null);

  const [isProjectFormActive, setIsProjectFormActive] = useState(false);
   
  function handleProjectSelection(project) {
    setIsProjectFormActive(false)
      setSelectedProject(project);
  }

  function handleOnAddProject () {
    setSelectedProject(null);
    setIsProjectFormActive(true);
  }

  function handleProjectFormCancel(){
    setIsProjectFormActive(false);
  }

  //  should we be calling  async function here or like this, as its like calling a side-effect 
  async function save(updatedProjects){
    const res = await saveToStorage('projects', updatedProjects);
    if(!res) console.log('cant save to storage');
    console.log("saved", updatedProjects);
  }



  function handleProjectFormSave(newProject){
      setProjects([
          ...projects,
          newProject
      ])
      setIsProjectFormActive(false);
      setSelectedProject(newProject);
      save([...projects, newProject]); // write to localstorage
      
  }

  function handleProjectDelete(project) {
    setProjects(projects.filter(item => item != project));
    setSelectedProject(null);
    save(projects.filter(item => item != project));
  }

  function handleAddTask(modProject){
    setProjects(projects.map(project => {
      if(project.id === modProject.id){
        return modProject;
      }
      return project;
    }));
    setSelectedProject(modProject);
    save(projects.map(project => {
      if(project.id === modProject.id){
        return modProject;
      }
      return project;
    }));

  }

  
  

  return (
    <>
      <div className="flex flex-row-reverse">
        <button onClick={() => clearStorage()} className={buttonStyle} title='clear locally saved data'> Clear</button>
         <button onClick={()=> {setIsSaving(true);
        save(projects).then(() => {
          setTimeout(()=>setIsSaving(false), 2*1000);
        }); }} disabled={isSaving ? true:false}  className={buttonStyle + ( isSaving ? ' text-stone-200 hover:text-stone-200' : ' ')} >{isSaving ? 'Saving...': 'Save'}</button></div>
    
    <div className="flex w-full">
      <Sidebar projects = {projects} selectedProject={selectedProject} onSelect={handleProjectSelection} onAddProject={handleOnAddProject}/>  
      {!selectedProject && !isProjectFormActive && <NoProjects onAddProject={handleOnAddProject}/>}
      {isProjectFormActive && <ProjectForm onSave={handleProjectFormSave} onCancel={handleProjectFormCancel}/>}
      {selectedProject && 
          <div className="flex-auto flex flex-col mt-5 px-5 py-8 text-black font-medium ">
              <ProjectOverview project={selectedProject} onDelete={handleProjectDelete}/>
              <Tasks project={selectedProject}  onProjectUpdate={handleAddTask}/>
          </div> 
      }   
    </div>
    </>

  );
}

export default App;
