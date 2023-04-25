import React from 'react'
import style from './TodoList.module.css'
import {RxCross1} from 'react-icons/rx'

const TodoList = ({id,data,onSelect}) => {
  return (
    <div className={style.todoList}> 
        <RxCross1 onClick={()=>{onSelect(id)}} className={style.icon} />
        <li>{data}</li>
    </div>
  )
}

export default TodoList

