import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Api from '../../Api/Api'

export default function Create() {
	const [nome, setNome] = useState('')
	const [valorPromo, setValorPromo] = useState('')
	const [destino, setDestino] = useState({ id: 0 })
	const [destinos, setDestinos] = useState([])
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		Api.get('/destinos')
			.then((response) => {
				setDestinos(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const criarOuEditarPromocao = (e) => {
		e.preventDefault()

		const promocao = { nome, valorPromo, destino }

		if (id) {
			Api.put('/promocoes/' + id, promocao).then((response) => {
				navigate('/Promocoes')
			})
		} else {
			Api.post('/promocoes/', promocao).then((response) => {
				navigate('/Promocoes')
			})
		}
	}

	useEffect(() => {
		function getPromocaoById() {
			if (id) {
				Api.get(`/promocoes/${id}`)
					.then((response) => {
						setNome(response.data.nome)
						setValorPromo(response.data.valorPromo)
						setDestino({
							id: response.data.destino.id,
						})
					})
					.catch((error) => {
						console.log(error)
					})
			}
		}

		getPromocaoById()
	}, [id])

	return (
		<div className="container py-3">
			<form>
				<fieldset>
					<legend>
						<h2 className="text-center">{id ? 'Editar Promoção' : 'Criar Promoção'}</h2>
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
								id="ValorPromo"
								className="form-control s"
								placeholder="Valor Promocional"
								value={valorPromo}
								onChange={(e) => setValorPromo(e.target.value)}
							/>
						</div>
					</div>
					<div className="form-group mb-3">
						<div className="align">
							<select
								id="DestinoId_destino"
								name="DestinoId_destino"
								className="form-select s"
								onChange={(e) =>
									setDestino({ id: Number.parseInt(e.target.value) })
								}
							>
								<option value="DEFAULT">
									{id ? destino.nome : 'Escolha um Destino'}
								</option>
								{destinos.map((destino) => (
									<option key={destino.id} value={destino.id}>
										{destino.nome}
									</option>
								))}
							</select>
						</div>
					</div>
          <div className="d-grid-sm d-flex justify-content-center">
					<button
						type="submit"
						className="btn btn-primary"
						onClick={(e) => criarOuEditarPromocao(e)}
					>
						Enviar
					</button>
					<Link
						to="/Promocoes"
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
