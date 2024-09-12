
import React, { useState } from "react";
import { db, auth } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");

  const registerLawyer = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "lawyers"), {
        name: name,
        email: email,
        specialization: specialization,
        location: location,
      });
      alert("Advogado cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar advogado", error);
      alert("Erro: " + error.message);
    }
  };

  return (
    <div>
      <h1>Cadastro de Advogados</h1>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Especialização" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
      <input type="text" placeholder="Localização" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button onClick={registerLawyer}>Cadastrar</button>
    </div>
  );
}

export default App;
