// frontend/src/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ name: res.data.name, email: res.data.email }));
      setMsg("Login successful ✓ Redirecting...");
      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", marginTop:24 }}>
      <div className="app-card" style={{ width:420 }}>
        <h2 style={{marginTop:0}}>Login</h2>
        <form onSubmit={submit}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:10,marginBottom:10,borderRadius:8}} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:10,marginBottom:10,borderRadius:8}} />
          <button className="btn" type="submit" style={{width:"100%"}}>Login</button>
        </form>
        <p style={{marginTop:12,color:"#c7d2ff"}}>{msg}</p>
      </div>
    </div>
  );
}

export default Login;
