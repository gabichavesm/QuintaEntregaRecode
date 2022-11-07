import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Api from '../../Api/Api'

export default function Create() {
	const [nome, setNome] = useState('')
	const [estado, setEstado] = useState('')
	const [pais, setPais] = useState('')
	const [dataIda, setDataIda] = useState('')
	const [dataVolta, setDataVolta] = useState('')
	const [valor, setValor] = useState('')
	const { id } = useParams()
	const navigate = useNavigate()

	const criarOuEditarDestino = (e) => {
		e.preventDefault()

		const destino = { nome, estado, pais, dataIda, dataVolta, valor }

		if (id) {
			Api.put('/destinos/' + id, destino).then((response) => {
				navigate('/Destinos')
			})
		} else {
			Api.post('/destinos/', destino).then((response) => {
				navigate('/Destinos')
			})
		}
	}

	useEffect(() => {
		function getDestinoById() {
			if (id) {
				Api.get(`/destinos/${id}`)
					.then((response) => {
						setNome(response.data.nome)
						setEstado(response.data.estado)
						setPais(response.data.pais)
						setDataIda(response.data.dataida)
						setDataVolta(response.data.datavolta)
						setValor(response.data.valor)
					})
					.catch((error) => {
						console.log(error)
					})
			}
		}
		getDestinoById()
	}, [id])

	return (
		<div className="container py-3">
			<form>
				<fieldset>
					<legend>
						<h2 className="text-center">{id ? 'Editar Destino' : 'Criar Destino'}</h2>
					</legend>
					<div className="mb-3">
						<div className="align">
							<input
								type="text"
								id="Nome"
								className="form-control s"
								placeholder="Nome"
								value={nome}
								onChange={(e) => setNome(e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-3">
						<div className="align">
							<input
								type="text"
								id="Estado"
								className="form-control s"
								placeholder="Estado"
								value={estado}
								onChange={(e) => setEstado(e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-3">
						<div className="align">
							<input
								type="text"
								id="Pais"
								className="form-control s"
								placeholder="Pais"
								value={pais}
								onChange={(e) => setPais(e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-3">
						<div className="align">
							<input
								type="text"
								id="DataIda"
								className="form-control s"
								placeholder="Data de ida"
								value={dataIda}
								onChange={(e) => setDataIda(e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-3">
						<div className="align">
							<input
								type="text"
								id="DataVolta"
								className="form-control s"
								placeholder="Data de Volta"
								value={dataVolta}
								onChange={(e) => setDataVolta(e.target.value)}
							/>
						</div>
					</div>
					<div className="mb-3">
						<div className="align">
							<input
								type="text"
								id="Valor"
								className="form-control s"
								placeholder="Valor"
								value={valor}
								onChange={(e) => setValor(e.target.value)}
							/>
						</div>
					</div>
          <div className="d-flex justify-content-center">
					<button
						type="submit"
						className="btn btn-primary"
						onClick={(e) => criarOuEditarDestino(e)}
					>
						Enviar
					</button>
					<Link
						to="/Destinos"
						className="btn btn-danger"
						style={{ marginLeft: '10px' }}
					>
						Cancelar
					</Link>
          </div>
				</fieldset>
			</form>
		</div>
	)
}
