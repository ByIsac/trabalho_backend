// import { addDoc } from "firebase/firestore";
import openDB from "../../database/dbConfig";
import { app, database } from "../../service/firebase";

import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const dbInstance = collection(database, "isacbd")

export default async function handler(req, res) {
  const db = await openDB();

  if (req.method === "GET") {
    const id = req.query.id;
    console.log("", id);

    if (id === undefined) {
      const usuarios = await getDocs(dbInstance)
      .then((data) => {
        return data.docs.map((iten) =>{
          return {...iten.data(), id: iten.id}
        })
      });

      res.status(200).json(usuarios);
    } else {
        const valid_usuario = doc(database, "isacbd", id);
        const usuario_data = await getDoc(valid_usuario);
  
        if (valid_usuario === undefined) {
          res.status(404).json({});
        }
  
        const usuario = {...usuario_data.data(), id: id}
  
        // const usuario = await db.get("SELECT * from Usuarios WHERE id = ?", [id]);
        res.status(200).json(usuario);
      
    //   const valid_usuario = await db.get(
    //     "SELECT * from Usuarios WHERE id = ?",
    //     [id]
    //   );
    //   if (valid_usuario === undefined) {
    //     res.status(404).json({});
    //   }
    //   const usuario = await db.get("SELECT * from Usuarios WHERE id = ?", [id]);
    //   res.status(200).json(usuario);

    }
  }

  if (req.method === "POST") {
    const new_usuario = req.body;

    if (new_usuario.nome === undefined || new_usuario.nome === "") {
      res.status(402).json({ message: "nome é obrigatorio!" });
    }

    if (new_usuario.email === undefined || new_usuario.email === "") {
      res.status(402).json({ message: "email é obrigatorio!" });
    }

    // const createUser = await db.prepare(
    //   "INSERT INTO Usuarios (nome, email) VALUES (?, ?);"
    // );

    const nome = new_usuario.nome;
    const email = new_usuario.email;

    addDoc(dbInstance, { 
        nome: nome, email: email 
    })
    .then(() => console.log("gravamos"));

    res.status(201).json({});
  }

  if (req.method === "PUT") {
    const update_usuario = req.body;
    console.log(update_usuario.id)

    if (update_usuario.nome === undefined || update_usuario.nome === "") {
      res.status(402).json({ message: "nome é obrigatorio!" });
    }

    if (update_usuario.email === undefined || update_usuario.email === "") {
      res.status(402).json({ message: "email é obrigatorio!" });
    }

    // const valid_usuario = await db.get("SELECT * from Usuarios WHERE id = ?", [
    //   update_usuario.id,
    // ]);
    // if (valid_usuario === undefined) {
    //   res.status(404).json({});
    // }

    const valid_usuario = doc(database, "isacbd", update_usuario.id);

    await updateDoc (valid_usuario, {
      nome: update_usuario.nome,
      email: update_usuario.email
    })

    // const updateUsuario = await db.prepare(
    //   "UPDATE Usuarios SET nome = ?, email = ? WHERE id = ?"
    // );
    // const runCreat = await updateUsuario.run(
    //   update_usuario.nome,
    //   update_usuario.email,
    //   update_usuario.id
    // );

    res.status(200).json({});
  }

  if (req.method === "DELETE") {
    const id = req.body.id;

    // const valid_usuario = await db.get("SELECT * from Usuarios WHERE id = ?", [
    //   ID,
    // ]);
    // if (valid_usuario === undefined) {
    //   res.status(404).json({});
    // }

    // const deleteUsuario = await db.prepare(
    //   "DELETE FROM Usuarios WHERE id = ?;"
    // );

    const valid_usuario = doc(database, "isacbd", id);

    await deleteDoc(valid_usuario)

    res.status(201).json({});
  }
}
