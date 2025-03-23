import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  const [userData, setUserData] = useContext(AuthContext)

  const updateTaskStatus = (taskTitle, newStatus) => {
    const updatedUserData = userData.map(user => {
      if (user.id === props.data.id) {
        const updatedTasks = user.tasks.map(task => {
          if (task.taskTitle === taskTitle) {
            const updatedTask = {
              ...task,
              active: newStatus === 'active',
              newTask: newStatus === 'newTask',
              completed: newStatus === 'completed',
              failed: newStatus === 'failed'
            }
            return updatedTask
          }
          return task
        })

        const taskCounts = updatedTasks.reduce((counts, task) => {
          if (task.active) counts.active++
          if (task.newTask) counts.newTask++
          if (task.completed) counts.completed++
          if (task.failed) counts.failed++
          return counts
        }, { active: 0, newTask: 0, completed: 0, failed: 0 })

        return { ...user, tasks: updatedTasks, taskCounts }
      }
      return user
    })

    setUserData(updatedUserData)
    localStorage.setItem('employees', JSON.stringify(updatedUserData))

    // Update the current user's data in props
    const updatedCurrentUser = updatedUserData.find(user => user.id === props.data.id)
    props.updateCurrentUser(updatedCurrentUser)
  }

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
      <Header changeUser={props.changeUser} data={props.data}/>
      <TaskListNumbers data={props.data} />
      <TaskList data={props.data} updateTaskStatus={updateTaskStatus} />
    </div>
  )
}

export default EmployeeDashboard