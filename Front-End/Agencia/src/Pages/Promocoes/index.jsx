import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from '../../Api/Api';
import './promocao.css'

export default function Index() {
  const [promocoes, setPromocoes] = useState([]);
  const [redirect, setRedirect] = useState(false); 


  useEffect(() => {
    Api.get('/promocoes')
      .then((response) => {
        setPromocoes(response.data);
        setRedirect(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [redirect]);

  function deletePromocao(id){
    Api.delete(`/promocoes/${id}`)
    setRedirect(true);}

  return (
    <>
      <header className="header">
        <h1 className="container">Cadastro de Promoções</h1>
      </header>
      <div className="container p-3">
        <Link to="/Promocoes-Create" className="btn btn-theme mb-4">
          Cadastrar Promoção
        </Link>
        <div className="table-responsive d-flex justify-content-center">
          <table className="table table-hover table-sm table-colors">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Valor Promocional</th>
                <th>Destino</th>
              </tr>
            </thead>
            <tbody>
              {promocoes.map((promocao) => (
                <tr className="text-black tr-hover" key={promocao.id}>
                  <td className="text-black">{promocao.id}</td>
                  <td className="text-black">{promocao.nome}</td>
                  <td className="text-black">{promocao.valorPromo}</td>
                  <td className="text-black">{promocao.destino.nome}</td>
                  <td className="d-flex justify-content-end">
                    <Link
                      to={`/Promocoes-Update/${promocao.id}`}
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePromocao(promocao.id)}
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
