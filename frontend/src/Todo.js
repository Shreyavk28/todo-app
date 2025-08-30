// // frontend/src/Todo.js
// import React, { useEffect, useState } from "react";
// import api from "./api";
// import { useNavigate } from "react-router-dom";

// function Todo() {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const navigate = useNavigate();
  

//   // load tasks
//   const fetchTasks = async () => {
//     try {
//       const res = await api.get("/tasks");
//       setTasks(res.data);
//     } catch (err) {
//       // if unauthorized, redirect to login
//       if (err.response?.status === 401) navigate("/login");
//       else alert(err.response?.data?.message || "Failed to load tasks");
//     }
//   };

//   useEffect(() => { fetchTasks(); }, []);

//   const addTask = async () => {
//     if (!title.trim()) return;
//     try {
//       const res = await api.post("/tasks", { title });
//       setTasks([res.data, ...tasks]);
//       setTitle("");
//     } catch (err) {
//       alert(err.response?.data?.message || "Add failed");
//     }
//   };

//   const startEdit = (t) => {
//     setEditId(t._id);
//     setEditText(t.title);
//   };

//   const saveEdit = async (id) => {
//     if (!editText.trim()) return;
//     const res = await api.put(`/tasks/${id}`, { title: editText });
//     setTasks(tasks.map(t => (t._id === id ? res.data : t)));
//     setEditId(null);
//     setEditText("");
//   };

//   const toggleDone = async (task) => {
//     const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
//     setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
//   };

//   const deleteTask = async (id) => {
//     if (!window.confirm("Delete task?")) return;
//     await api.delete(`/tasks/${id}`);
//     setTasks(tasks.filter(t => t._id !== id));
//   };

//   // progress
//   const total = tasks.length;
//   const done = tasks.filter(t => t.completed).length;
//   const percent = total === 0 ? 0 : Math.round((done / total) * 100);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   return (
//     <div style={{ display:"flex", justifyContent:"center", marginTop:24 }}>
//       <div className="app-card">
//         <div className="header">
//           <div>
//             <div className="title">Todo Done</div>
//             <div style={{fontSize:13, color:"var(--muted)"}}>Keep it up!</div>
//           </div>

//           <div className="counter">
//             <span style={{fontSize:14}}>{done}/{total}</span>
//           </div>
//         </div>

//         <div className="progress-wrap">
//           <div className="progress"><div className="bar" style={{width:`${percent}%`}} /></div>
//         </div>

//         <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
//           <div style={{fontSize:13, color:"var(--muted)"}}>Hi, {user?.name || "Guest"}</div>
//           <div>
//             <button className="btn" style={{background:"#2b6ef6", marginRight:8}} onClick={()=>fetchTasks()}>Refresh</button>
//             <button className="btn" style={{background:"#ff5c7a"}} onClick={logout}>Logout</button>
//           </div>
//         </div>

//         <div className="input-row">
//           <input type="text" placeholder="Write your task" value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={(e)=>{ if(e.key==="Enter") addTask(); }} />
//           <button className="btn" onClick={addTask}>+</button>
//         </div>

//         <div className="task-list">
//           {tasks.map(task => (
//             <div key={task._id} className="task">
//               <div className={`check ${task.completed ? "done" : ""}`} onClick={()=>toggleDone(task)}>
//                 {task.completed ? "✓" : ""}
//               </div>

//               <div className="task-body">
//                 {editId === task._id ? (
//                   <>
//                     <input className="edit-input" value={editText} onChange={e=>setEditText(e.target.value)} />
//                     <div style={{marginTop:8}}>
//                       <button className="btn" onClick={()=>saveEdit(task._id)} style={{marginRight:8}}>Save</button>
//                       <button className="btn" onClick={()=>{ setEditId(null); setEditText(""); }} style={{background:"#777"}}>Cancel</button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className={`task-title ${task.completed ? "done" : ""}`}>{task.title}</div>
//                     <div className="task-meta">
//                       <div className="badge">{task.priority || "Low"}</div>
//                       <div className="badge">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due"}</div>
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="task-actions">
//                 <button className="btn" onClick={()=>startEdit(task)} style={{background:"#6c7cff"}}>✏️</button>
//                 <button className="btn" onClick={()=>deleteTask(task._id)} style={{background:"var(--danger)"}}>🗑️</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="footer">Design recreated • React + Node + MongoDB • Add to your resume</div>
//       </div>
//     </div>
//   );
// }

// export default Todo;






// // frontend/src/Todo.js
// import React, { useEffect, useState } from "react";
// import api from "./api";
// import { useNavigate } from "react-router-dom";

// function Todo() {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [priority, setPriority] = useState("Low");
//   const [dueDate, setDueDate] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const navigate = useNavigate();

//   // load tasks
//   const fetchTasks = async () => {
//     try {
//       const res = await api.get("/tasks");
//       setTasks(res.data);
//     } catch (err) {
//       if (err.response?.status === 401) navigate("/login");
//       else alert(err.response?.data?.message || "Failed to load tasks");
//     }
//   };

//   useEffect(() => { fetchTasks(); }, []);

//   const addTask = async () => {
//     if (!title.trim()) return;
//     try {
//       const res = await api.post("/tasks", { title, priority, dueDate });
//       setTasks([res.data, ...tasks]);
//       setTitle("");
//       setPriority("Low");
//       setDueDate("");
//     } catch (err) {
//       alert(err.response?.data?.message || "Add failed");
//     }
//   };

//   const startEdit = (t) => {
//     setEditId(t._id);
//     setEditText(t.title);
//   };

//   const saveEdit = async (id) => {
//     if (!editText.trim()) return;
//     const res = await api.put(`/tasks/${id}`, { title: editText });
//     setTasks(tasks.map(t => (t._id === id ? res.data : t)));
//     setEditId(null);
//     setEditText("");
//   };

//   const toggleDone = async (task) => {
//     const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
//     setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
//   };

//   const deleteTask = async (id) => {
//     if (!window.confirm("Delete task?")) return;
//     await api.delete(`/tasks/${id}`);
//     setTasks(tasks.filter(t => t._id !== id));
//   };

//   // progress
//   const total = tasks.length;
//   const done = tasks.filter(t => t.completed).length;
//   const percent = total === 0 ? 0 : Math.round((done / total) * 100);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   return (
//     <div style={{ display:"flex", justifyContent:"center", marginTop:24 }}>
//       <div className="app-card">
//         {/* Header */}
//         <div className="header">
//           <div>
//             <div className="title">Todo Done</div>
//             <div style={{fontSize:13, color:"var(--muted)"}}>Keep it up!</div>
//           </div>
//           <div className="counter">
//             <span style={{fontSize:14}}>{done}/{total}</span>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="progress-wrap">
//           <div className="progress"><div className="bar" style={{width:`${percent}%`}} /></div>
//         </div>

//         {/* User + Buttons */}
//         <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
//           <div style={{fontSize:13, color:"var(--muted)"}}>Hi, {user?.name || "Guest"}</div>
//           <div>
//             <button className="btn" style={{background:"#2b6ef6", marginRight:8}} onClick={()=>fetchTasks()}>Refresh</button>
//             <button className="btn" style={{background:"#ff5c7a"}} onClick={logout}>Logout</button>
//           </div>
//         </div>

//         {/* Input Row */}
//         <div className="input-row" style={{flexDirection:"column", gap:"8px"}}>
//           <input type="text" placeholder="Write your task" value={title} onChange={e=>setTitle(e.target.value)} />
//           <div style={{display:"flex", gap:"8px"}}>
//             <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>
//             <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
//             <button className="btn" onClick={addTask}>+</button>
//           </div>
//         </div>

//         {/* Task List */}
//         <div className="task-list">
//           {tasks.map(task => (
//             <div key={task._id} className="task">
//               <div className={`check ${task.completed ? "done" : ""}`} onClick={()=>toggleDone(task)}>
//                 {task.completed ? "✓" : ""}
//               </div>

//               <div className="task-body">
//                 {editId === task._id ? (
//                   <>
//                     <input className="edit-input" value={editText} onChange={e=>setEditText(e.target.value)} />
//                     <div style={{marginTop:8}}>
//                       <button className="btn" onClick={()=>saveEdit(task._id)} style={{marginRight:8}}>Save</button>
//                       <button className="btn" onClick={()=>{ setEditId(null); setEditText(""); }} style={{background:"#777"}}>Cancel</button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className={`task-title ${task.completed ? "done" : ""}`}>{task.title}</div>
//                     <div className="task-meta">
//                       <div className="badge">{task.priority}</div>
//                       <div className="badge">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due"}</div>
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="task-actions">
//                 <button className="btn" onClick={()=>startEdit(task)} style={{background:"#6c7cff"}}>✏️</button>
//                 <button className="btn" onClick={()=>deleteTask(task._id)} style={{background:"var(--danger)"}}>🗑️</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="footer">Design recreated • React + Node + MongoDB • Add to your resume</div>
//       </div>
//     </div>
//   );
// }

// export default Todo;









// frontend/src/Todo.js
import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Low");
  const [editDueDate, setEditDueDate] = useState("");
  const navigate = useNavigate();

  // load tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else alert(err.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post("/tasks", { title, priority, dueDate });
      setTasks([res.data, ...tasks]);
      setTitle("");
      setPriority("Low");
      setDueDate("");
    } catch (err) {
      alert(err.response?.data?.message || "Add failed");
    }
  };

  const startEdit = (t) => {
    setEditId(t._id);
    setEditTitle(t.title);
    setEditPriority(t.priority);
    setEditDueDate(t.dueDate ? t.dueDate.split("T")[0] : "");
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    const res = await api.put(`/tasks/${id}`, { 
      title: editTitle, 
      priority: editPriority, 
      dueDate: editDueDate || null 
    });
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
    setEditId(null);
    setEditTitle("");
    setEditPriority("Low");
    setEditDueDate("");
  };

  const toggleDone = async (task) => {
    const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  // progress
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div style={{ display:"flex", justifyContent:"center", marginTop:24 }}>
      <div className="app-card">
        {/* Header */}
        <div className="header">
          <div>
            <div className="title">Todo Done</div>
            <div style={{fontSize:13, color:"var(--muted)"}}>Keep it up!</div>
          </div>
          <div className="counter">
            <span style={{fontSize:14}}>{done}/{total}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-wrap">
          <div className="progress"><div className="bar" style={{width:`${percent}%`}} /></div>
        </div>

        {/* User + Buttons */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <div style={{fontSize:13, color:"var(--muted)"}}>Hi, {user?.name || "Guest"}</div>
          <div>
            <button className="btn" style={{background:"#2b6ef6", marginRight:8}} onClick={()=>fetchTasks()}>Refresh</button>
            <button className="btn" style={{background:"#ff5c7a"}} onClick={logout}>Logout</button>
          </div>
        </div>

        {/* Input Row */}
        <div className="input-row" style={{flexDirection:"column", gap:"8px"}}>
          <input type="text" placeholder="Write your task" value={title} onChange={e=>setTitle(e.target.value)} />
          <div style={{display:"flex", gap:"8px"}}>
            <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
            <button className="btn" onClick={addTask}>+</button>
          </div>
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.map(task => (
            <div key={task._id} className="task">
              <div className={`check ${task.completed ? "done" : ""}`} onClick={()=>toggleDone(task)}>
                {task.completed ? "✓" : ""}
              </div>

              <div className="task-body">
                {editId === task._id ? (
                  <>
                    <input 
                      className="edit-input" 
                      value={editTitle} 
                      onChange={e=>setEditTitle(e.target.value)} 
                    />
                    <div style={{display:"flex", gap:"8px", marginTop:8}}>
                      <select value={editPriority} onChange={e=>setEditPriority(e.target.value)}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                      <input type="date" value={editDueDate} onChange={e=>setEditDueDate(e.target.value)} />
                    </div>
                    <div style={{marginTop:8}}>
                      <button className="btn" onClick={()=>saveEdit(task._id)} style={{marginRight:8}}>Save</button>
                      <button className="btn" onClick={()=>{ setEditId(null); setEditTitle(""); }} style={{background:"#777"}}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`task-title ${task.completed ? "done" : ""}`}>{task.title}</div>
                    <div className="task-meta">
                      <div className="badge">{task.priority}</div>
                      <div className="badge">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due"}</div>
                    </div>
                  </>
                )}
              </div>

              <div className="task-actions">
                <button className="btn" onClick={()=>startEdit(task)} style={{background:"#6c7cff"}}>✏️</button>
                <button className="btn" onClick={()=>deleteTask(task._id)} style={{background:"var(--danger)"}}>🗑️</button>
              </div>
            </div>
          ))}
        </div>

        <div className="footer">Design recreated • React + Node + MongoDB • Add to your resume</div>
      </div>
    </div>
  );
}

export default Todo;
