import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    // Se o título estiver vazio não faça nada.
    if (!newTaskTitle) return console.log("Título inválido");

    // Se estiver ok, cria a const newTask.
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
  
  // adicione no array tasks a nova task.
    setTasks([...tasks, newTask]);
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    //
    const newTask = tasks.map(task => {

    // Quando o ID for igual ao ID da task, troque o valor do campo isComplete, senão mantem o valor atual. (Usando Operador ternário)
      return task.id === id ? { ...task, isComplete: !task.isComplete } : task
    });

    // E atualiza o array tasks.
    setTasks(newTask);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // Usando o método filter a gente remove do array tasks, o id enviado.
    const filteredTasks = tasks.filter(task => task.id !== id)

    // E atualiza a listagem de tasks.
    setTasks(filteredTasks);


  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}