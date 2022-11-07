import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from '../../Api/Api';
import './destino.css'

export default function Index() {
  const [destinos, setDestinos] = useState([]);
  const [redirect, setRedirect] = useState(false);


 

  useEffect(() => {
    Api.get('/destinos')
      .then((response) => {
        setDestinos(response.data);
        setRedirect(false);
      })
      .catch((error) => {
        console.log(error);
      });

      
  }, [redirect]);

      function deleteDestino(id){
      Api.delete(`/destinos/${id}`)
      setRedirect(true);}
  

  return (
    <>
      <header className="header">
        <h1 className="container">Cadastro de Destinos</h1>
      </header>
      <div className="container p-3">
        <Link to="/Destinos-Create" className="btn btn-theme mb-4">
          Cadastrar Destino
        </Link>
        <div className="table-responsive d-flex justify-content-center">
          <table className="table table-hover table-sm table-colors">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Estado</th>
                <th>Pais</th>
                <th>Data de ida</th>
                <th>Data de volta</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {destinos.map((destino) => (
                <tr className="text-black tr-hover" key={destino.id}>
                  <td className="text-black">{destino.id}</td>
                  <td className="text-black">{destino.nome}</td>
                  <td className="text-black">{destino.estado}</td>
                  <td className="text-black">{destino.pais}</td>
                  <td className="text-black">{destino.dataIda}</td>
                  <td className="text-black">{destino.dataVolta}</td>
                  <td className="text-black">{destino.valor}</td>
                  <td className="d-flex justify-content-end">
                    <Link
                      to={`/Destinos-Update/${destino.id}`}
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteDestino(destino.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
