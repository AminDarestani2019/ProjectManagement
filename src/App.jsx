import { useState } from "react";
import NewProject from "./components/newProject.jsx";
import NoProjectSelected from "./components/noProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/selectedProject.jsx";

function App() {
  //controlling the state of the program
  const [projectState,setProjectState] = useState({
    selectProjectId:undefined,
    projects:[],
    tasks: []
  });

  function handleSelectProject(id){
    setProjectState((prevState)=>{
      return {
        ...prevState,
        selectProjectId:id
      };
    });
  }

  function handleStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectProjectId:null,
      };
    });
  }

  function handleCancelAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectProjectId:undefined,
      };
    });
  }

  function handleAddProject(projectDate){ 
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectDate,
        id:projectId
      };

      return {
        ...prevState,
        selectProjectId:undefined,
        projects:[...projectState.projects,newProject]
      };
    });
  }

  function handleDeleteProject(){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectProjectId:undefined,
        projects:prevState.projects.filter(
          (project) => project.id !== prevState.selectProjectId)
      }
    })
  }

  function handleAddTask(text){
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text:text,
        projectId: prevState.selectProjectId,
        id:taskId
      };

      return {
        ...prevState,
        tasks: [newTask,...prevState.tasks]
      };
    });
  }
  
  function handleDeleteTask(id){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        tasks:prevState.tasks.filter(
          (task) => task.id !== id)
      }
    })
  }
  
  const selectedProject = projectState.projects.find(
    project => project.id === projectState.selectProjectId);

  let content =(
  <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectState.tasks}
  />);

  if(projectState.selectProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  }else if(projectState.selectProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectProjectId}
      />
      {content}
    </main>
  );
}

export default App;
