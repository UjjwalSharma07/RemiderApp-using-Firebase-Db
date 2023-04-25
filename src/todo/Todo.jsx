import React, { useState } from "react";
import style from "./Todo.module.css";
import TodoList from "./TodoList";
import { auth, db } from "../firebase";
import {  onValue, push, ref, remove, set } from "firebase/database";
import {BiLogOutCircle} from 'react-icons/bi'
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  // const [uid, setUid] = useState(null);
  const [inputData, setInputData] = useState("");
  const [arrayListItems, setArrayListItems] = useState([]);
  const navigate = useNavigate();
  const setData = (e) => {
    if (e && e.target) {
      setInputData(e.target.value);
    }
  };
  
  // const writeUserData = (inputData, email) => {
  //   set(ref(db, 'users/' + uid), {
  //     note: inputData,
  //     email: email,
  //   });
  // };
  
  const setItems = () => {
    console.log("hey");
    
    
    const newPostRef = push(ref(db, `posts/${auth.currentUser.uid}`));
    const userid = auth.currentUser.uid;
    console.log(userid)
    const d = new Date();

    set(newPostRef,{
      name: inputData,
      date: d.getDate(),
      time: d.getHours(), 
    }).then(()=>{
      onValue(ref(db,`posts/${auth.currentUser.uid}`),(snapshot)=>{
        const data = snapshot.val();
        if(data){
          const items = Object.keys(data).map((key)=>({
            id:key,
            ...data[key],
          }));
          setArrayListItems(items);
        }
      })
    });
   
 
    setInputData("");
  };

  const deleteItem = (id) => {
    const postId = arrayListItems[id].id;
    const postRef = ref(db, `posts/${auth.currentUser.uid}/${postId}`);
    remove(postRef)
      .then(() => {
        console.log("Data deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
      setArrayListItems((oldItems) => {
        return oldItems.filter((arrEle, indx) => {
          return indx !== id;
        });
      });
  };
  const handleLogout = () =>{
    signOut(auth).then(() => {
      console.log('Sign-out successful')
      navigate('/login')
    }).catch((error) => {
      console.log('An error happened in Sign-out');
      console.log(error.message);

    });
  }
  return (
    <>
    <BiLogOutCircle onClick={handleLogout} className={style.logoutBtn}/>
  
    <div className={style.content}>
      <h1>ToDo List</h1>

      <div className={style.textBar}>
        <input
          type="text"
          placeholder="Add a Items"
          value={inputData}
          onChange={setData}
          className={style.input}
        />
        <button className={style.btn} onClick={setItems}>
          +
        </button>
      </div>
      <ol className={style.list}>
        {arrayListItems.map((item, i) => {
          return <TodoList key={i} id={i} data={item.name} onSelect={deleteItem} />;
        })}
      </ol>
      
    </div>
    </>
  );
};

export default Todo;
