import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { Task, TaskProps } from './components/Task';
import { EmptyTaskList } from './components/EmptyTaskList';

import styles from './App.module.css';
import './global.css'

import Logo from './assets/Logo.svg'

function App() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [tasksCompleted, setTasksCompleted] = useState<TaskProps[]>([])

  function handleTextTask(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;

    setTaskText(text)
  }

  function handleNewTask() {
    const newTask = {
      id: uuidv4(),
      text: taskText,
      isChecked: false,
      onDeleteTask: deleteTask,
      onUpdateCheckTask: updateIsChecked,
    }

    setTasks([...tasks, newTask])
    setTaskText('')
  }

  function deleteTask(taskToDelete: String) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete;
    })

    setTasks(tasksWithoutDeletedOne);
    setTasksCompleted(tasksWithoutDeletedOne);
  }

  function updateIsChecked(idTaskToUpdate: String) {
    const updatedTasks = tasks.map(task => {
      if (task.id === idTaskToUpdate) task.isChecked = !task.isChecked;
      return task;
    });

    setTasks(updatedTasks);
    countCompleted()
  }

  function countCompleted() {
    const completedTasks = tasks.filter(task => {
      return task.isChecked === true;
    })

    setTasksCompleted(completedTasks)
  }

  const isNewTaskEmpty = taskText.length === 0

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <img src={Logo} />
      </header>
      <main>
        <div className={styles.createTask}>
          <input type="text" placeholder='Adicione uma nova tarefa' value={taskText} onChange={handleTextTask} />
          <button type='submit' onClick={handleNewTask} disabled={isNewTaskEmpty}>Criar</button>
        </div>
        <div className={styles.taskList}>
          <div className={styles.countTask}>
            <div>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>
            <div>
              <p>Concluídas</p>
              <span>{tasks.length === 0 ? tasks.length : `${tasksCompleted.length} de ${tasks.length}`}  </span>
            </div>
          </div>
          <div className={styles.list}>     
            {
              tasks.length === 0 ? <EmptyTaskList /> : tasks.map(task => (
                <Task
                  key={uuidv4()}
                  id={task.id}
                  text={task.text}
                  isChecked={task.isChecked}
                  onDeleteTask={deleteTask}
                  onUpdateCheckTask={updateIsChecked}
                />
              ))
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
