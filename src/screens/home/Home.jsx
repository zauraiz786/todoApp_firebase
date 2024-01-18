import React, {useState , useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth , db } from '../../config/firebaseConfig/firebaseConfig';
import { doc, collection, addDoc, getDocs, deleteDoc, query, where, updateDoc, orderBy, serverTimestamp } from "firebase/firestore"; 

function Home() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const[text,setText] = useState('');
  const[todo,setTodo] = useState([]);

    useEffect(() => {
      function onAuth() {
        onAuthStateChanged(auth , (user)=>{
            if(user){
              setUser(true)
              render(user.uid)
            }else{
                navigate('/login')
            }
        })
      }
      onAuth()
    }, [])



  //Add todo and Send todo
  async function addTodo(event) {
    event.preventDefault();
    if (text === '') {
      alert('Please Enter Text')
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: text,
        user_Id: auth.currentUser.uid,
        time: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    todo.unshift(text);
    setTodo([...todo])
    let userId = auth.currentUser.uid
    setText('')
  }


  //Render Todo on reload
  async function render(uid) {
    const q = query(collection(db, "todos"), where("user_Id", "==", uid), orderBy('time','desc'));
    const querySnapshot = await getDocs(q);
    setTodo(querySnapshot.docs.map(doc => doc.data().title));
    }


  // Delete Todo
  async function deleteTodo(index) {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    let todoIdToDelete;
    querySnapshot.forEach((doc) => {
      if (doc.data().title === todo[index] && doc.data().user_Id === auth.currentUser.uid) {
        todoIdToDelete = doc.id;
      }
    });
    if (todoIdToDelete) {
      await deleteDoc(doc(db, "todos", todoIdToDelete));
      todo.splice(index, 1);
      setTodo([...todo]);
    } else {
      console.error("Todo not found or does not belong to the current user");
    }
    } catch (error) {
    console.error("Error deleting todo: ", error);
    } 
  }


  //Edit todo
  async function editTodo(items) {
    try {
      const q = query(collection(db, "todos"), where("user_Id", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      let todoIdToEdit;
  
      querySnapshot.forEach((doc) => {
        if (doc.data().title === items) {
          todoIdToEdit = doc.id;
        }
      });
  
      if (todoIdToEdit) {
        // Perform your edit operation here if needed
        let edit = prompt('Edit todo', items);
        if (edit !== null) {
          const todoDocRef = doc(db, "todos", todoIdToEdit);
          await updateDoc(todoDocRef, { title: edit });

          const updatedQuerySnapshot = await getDocs(q);
          setTodo(updatedQuerySnapshot.docs.map(doc => doc.data().title));
        }else{
          alert('You must write something')
        }
      } else {
        console.error("Todo not found or does not belong to the current user");
      }
    } catch (error) {
      console.error("Error editing todo: ", error);
    }
  }

  return (
    user ?<>
    <div className=" justify-center h-[500px] w-[400px] m-auto mt-24">
      <div>
        <form onSubmit={addTodo} className='flex'>
          <input type="text" placeholder="Enter Todo" className="flex input input-bordered input-primary w-full max-w-xs h-[60px] text-lg" onChange={(e)=>{setText(e.target.value)}} value={text}/>
          <button className="btn btn-outline btn-primary ml-6 h-[60px]" type='submit'>Add</button>
        </form>
      </div>

      <div>
        <ul className='overflow-auto h-[450px] w-[400px] custom-scrollbar'>
          {todo.map((items,index)=>{
            return( 
            <li key={index} className='text-lg bg-gray-300 text-purple-900 h-[60px]-auto w-full-auto p-2 mt-6'>{items} 
            <span className='flex mt-2'>
              <button className="border-[2px] rounded-lg border-red-500 hover:bg-red-500 hover:text-white w-[70px] h-[40px] transition-color delay-100" onClick={()=>{deleteTodo(index)}}>Delete</button>

              <button className="border-[2px] ml-1 rounded-lg border-violet-800 hover:bg-violet-900 hover:text-white w-[70px] h-[40px] transition-color delay-75" onClick={()=>{editTodo(items)}}>Edit</button>
              </span>
              </li>)
          })}
        </ul>
      </div>

    </div>
    </>: <h1>Loading...</h1>
  )
}

export default Home