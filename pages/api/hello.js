// Nome: Jose Isac de Oliveira Matos
// Matrícula: 01635824

import openDB from "../../database/dbConfig";

export default async function handler(req, res) {
  const db = await openDB();

  if (req.method === "GET") {
    const id = req.query.id;
    console.log("", id);

    if (id === undefined) {
      const usuarios = [{ 
        id: 1,
        usuario: "Isac",
        cpf: "123.123.123-45",
        endereço: "rua a 445",
      },
      {
        id: 2,
        usuario: "teste",
        cpf: "123.123.123-45",
        endereço: "rua a 445"
      }]

      res.status(200).json(usuarios);
    } else {
      const usuario = [{

      }]
      res.status(200).json(usuario);
    }
  }

  if (req.method === "POST") {
    const new_usuario = req.body;

    console.log("====================================");
    console.log(new_usuario.nome, new_usuario.email);
    console.log("====================================");

    if (new_usuario.nome === undefined || new_usuario.nome === "") {
      res.status(402).json({message: "nome é obrigatorio!"});
    }

    if (new_usuario.email === undefined || new_usuario.email === "") {
      res.status(402).json({message: "email é obrigatorio!"});
    }

    const createUser = [{

    }]

    const runCreat = await createUser.run(new_usuario.nome, new_usuario.email);

    res.status(201).json({});
  }

  if (req.method === "PUT") {
    const update_usuario = req.body;

    const valid_usuario = [{

    }]

    if (valid_usuario === undefined) {
      res.status(404).json({});
    }

    const updateUsuario = [{

    }]
    const runCreat = await updateUsuario.run(
      update_usuario.nome,
      update_usuario.email,
      update_usuario.id
    );

    res.status(200).json({});
  }

  if (req.method === "DELETE") {
    const ID = req.body.id;

    const valid_usuario = [{

    }]
    if (valid_usuario === undefined) {
      res.status(404).json({});
    }

    const deleteUsuario = [{

    }]

    const delete_Usuario = await deleteUsuario.run(ID);

    res.status(201).json({});
  }
}
