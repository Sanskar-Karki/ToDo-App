import React, { useEffect, useState } from 'react'
import axios from "axios"

const Home = () => {

  const [tab, setTab] = useState(1)
  const [task, setTask] = useState(null)
  const [todos, setTodos] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  function handleTabs(tab) {
    setTab(tab)
    // console.log(tab)
  }

  function handleAddTask(e) {
    e.preventDefault()
    axios.post('http://localhost:5000/new-task', { task }).then(res => {
      setTodos(res.data)
      setTask('')

    })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/read-tasks').then(res => {
      setTodos(res.data)
    })
  }, [])

  const [updateId, setUpdateId] = useState(null)
  const [updatedTask, setUpdatedTask] = useState('')
  function handleEdit(id, task) {
    setIsEdit(true)
    // console.log(id)
    setTask(task)
    setUpdatedTask(task)
    setUpdateId(id)
  }

  const handleUpdateTask = () => {
    axios.post("http://localhost:5000/update-task", { updateId, task }).then(res => {
      setTodos(res.data)
      setTask('')
      setIsEdit(false)
    })
  }

  const handleDelte = (id) => {
    // console.log(id)
    axios.post('http://localhost:5000/delete-task', { id }).then(res => {
      setTodos(res.data)
    })
  }

  const handleComplete = (id) => {
    axios.post('http://localhost:5000/complete-task', { id }).then(res => {
      setTodos(res.data)
    })
  }
  return (
    <>
      <div className="bg-gray-100 w-screen h-screen">
        <div className='flex flex-col w-screen h-screen justify-center items-center '>


          <div className='font-bold text-2xl mb-5'>
            <h2>Todo List</h2>
          </div>


          <div className='flex gap-3'>
            <input value={task} onChange={e => setTask(e.target.value)} type="text" placeholder='Enter Todo ...' className='min-w-64 p-2 outline-none border border-blue-300 rounded-md' />

            <button className='bg-blue-500 text-white px-4 rounded-md'>
              {isEdit ? <button onClick={handleUpdateTask}> Update</button> : <button onClick={handleAddTask}>Add</button>} </button>
          </div>


          <div className='flex text-sm w-96 justify-evenly mt-4 '>
            <p onClick={() => handleTabs(1)} className={`${tab === 1 ? "text-blue-700 font-bold" : "text-black"} cursor-pointer`}>All</p>
            <p onClick={() => handleTabs(2)} className={`${tab === 2 ? "text-blue-700 font-bold" : "text-black"} cursor-pointer`}>Active</p>
            <p onClick={() => handleTabs(3)} className={`${tab === 3 ? "text-blue-700 font-bold" : "text-black"} cursor-pointer`}>Completed</p>
          </div>


          {tab === 1 &&
            todos?.map(todo => (
              <div key={todo.id} className='flex justify-between bg-white p-3 min-w-80 mt-3 rounded-md'>
                <div>
                  <p className='text-lg- font-semibold'>{todo.task}</p>
                  <p className='text-xs text-gray-600'> {new Date(todo.createdAt).toLocaleDateString()}</p>
                  <p className='text-sm text-gray'>Status : {todo.status}</p>
                </div>
                <div className='flex flex-col text-sm justify-start items-start '>
                  <button className='text-blue-600 cursor-pointer' onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>
                  <button className='text-red-500 cursor-pointer' onClick={() => handleDelte(todo.id)}>Delete</button>
                  <button className='text-green-600 cursor-pointer' onClick={() => handleComplete(todo.id)}>Completed</button>
                </div>
              </div>
            ))
          }
          {tab === 2 &&
            todos?.filter(todo => todo.status === 'active').map(todo => (
              <div key={todo.id} className='flex justify-between bg-white p-3 min-w-80 mt-3 rounded-md'>
                <div>
                  <p className='text-lg- font-semibold'>{todo.task}</p>
                  <p className='text-xs text-gray-600'> {new Date(todo.createdAt).toLocaleDateString()}</p>
                  <p className='text-sm text-gray'>Status : {todo.status}</p>
                </div>
                <div className='flex flex-col text-sm justify-start items-start '>
                  <button className='text-blue-600 cursor-pointer' onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>
                  <button className='text-red-500 cursor-pointer' onClick={() => handleDelte(todo.id)}>Delete</button>
                  <button className='text-green-600 cursor-pointer' onClick={() => handleComplete(todo.id)}>Completed</button>
                </div>
              </div>
            ))
          }
          {tab === 3 &&
            todos?.filter(todo => todo.status === 'Completed').map(todo => (
              <div key={todo.id} className='flex justify-between bg-white p-3 min-w-80 mt-3 rounded-md'>
                <div>
                  <p className='text-lg- font-semibold'>{todo.task}</p>
                  <p className='text-xs text-gray-600'> {new Date(todo.createdAt).toLocaleDateString()}</p>
                  <p className='text-sm text-gray'>Status : {todo.status}</p>
                </div>
                <div className='flex flex-col text-sm justify-center '>
                  <button className='text-red-500 cursor-pointer items-center' onClick={() => handleDelte(todo.id)}>Delete</button>
                </div>
              </div>
            ))
          }


        </div>
      </div>
    </>
  )
}

export default Home