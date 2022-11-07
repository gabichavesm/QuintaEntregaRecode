import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import './contatos.css'

export default function contatos() {

	const cpf = '463.312.678-99';
	// '46331267899'

	const isNumber = (value) => !isNaN(value)


	const extrairNumeros = (valor) => {
		console.log('ANTES DO SPLIT --> ', valor)
		const valorVetorSplit = valor.split('')
		console.log('ANTES DO FILTER --> ', valorVetorSplit)
		const valorVetorSomenteNumeros = valorVetorSplit.filter((caractere) => isNumber(caractere) && caractere != ' ' || caractere == '+')
		console.log('DEPOIS DO FILTER --> ', valorVetorSomenteNumeros)
		let valorSomenteNumeros = '';
		valorVetorSomenteNumeros.forEach(numero => {
			valorSomenteNumeros += numero;
		})
		console.log('DEPOIS DO FOREACH --> ', valorSomenteNumeros)
		return valorSomenteNumeros
	}

	const telefone = '+55 (11) 9 7641-2211';
	// '+5511976412211'


	const nascimento = '19/03/2002'
	// '2002-03-19 00:00:00'
	// '2002-03-19'

	const dataToISOString = (data) => {
		const dataVetor = data.split('/')
		let dataISO = ''

		for (let index = dataVetor.length - 1; index >= 0; index--) {
			dataISO += dataVetor[index] + '-';
		}

		dataISO = dataISO.substring(0, dataISO.length - 1)
		return dataISO;
	}

	const nascimentoISO = dataToISOString(nascimento)
	// console.log(nascimentoISO)

	const array = [ 10.99, 99.90, 105.5, 4.99, 5.20, 6.0 ];
	const cliente = {
		nome: 'José',
		sobrenome: 'Silva',
		nascimento: new Date().toISOString(),
		idade: 32
	}

	const clientes = [
		{
			nome: 'Maria',
			sobrenome: 'José',
			nascimento: new Date().toISOString(),
			idade: 52
		},
		{
			nome: 'Marcio',
			sobrenome: 'Santos',
			nascimento: new Date().toISOString(),
			idade: 43
		},
		{
			nome: 'Ana',
			sobrenome: 'Maria',
			nascimento: new Date().toISOString(),
			idade: 26
		},
		{
			nome: 'Laura',
			sobrenome: 'Gomes',
			nascimento: new Date().toISOString(),
			idade: 19
		},
		{
			nome: 'João',
			sobrenome: 'Barbosa',
			nascimento: new Date().toISOString(),
			idade: 28
		},
	]




	//const array = [ 10.99, 99.90, 105.5, 4.99, 5.20, 6.0 ];


	let index = 0;
	while (index < array.length) {
		//console.log('USANDO WHILE -> ', array[index])
		index++
	}

	for (let i = 0; i < array.length; i++) {
		//console.log('USANDO FOR -> ', array[i])
	}

	function funcaoNormal(elemento) {
		return elemento*2
	}

	const funcaoFlexa = (elemento) => {
		return elemento*2
	}

	const funcaoFlexa2 = (elemento) => elemento*2

	const funcaoFlexa3 = elemento => elemento*2
	
	//const array = [ 10.99, 99.90, 105.5, 4.99, 5.20, 6.0 ];
	const arrayComDesconto = array.map((preco) => preco - (preco * 0.15))
	//console.log(arrayComDesconto)
	//retorno esperado: [ 9.3415, 84.915, 89.675, 4.2415, 4.42, 5.1 ]

	const [ clientesFiltrados, setClientesFiltrados ] = useState(clientes);
	
	const filtrarNome = (pesquisa, clientes) => {
		console.log("Pesquisa ----> ", pesquisa)
		const clientesFiltrados = clientes.filter(
			cliente => cliente.nome.includes(pesquisa) || cliente.sobrenome.includes(pesquisa)
		)
		console.log("Clientes Filtrados Na Função -----> ", clientesFiltrados)
		return clientesFiltrados;  
	}
	
	return (
		<div>
			<Header />
			<div className="background">
				<div className="container">
					<div className="screen">
						<div className="screen-header">
							<div className="screen-header-left"></div>
							<div className="screen-header-right"></div>
						</div>
						<div className="screen-body">
							<div className="screen-body-item left">
								<div className="app-title">
									<span>Lista de Clientes</span>
									<table style={{fontSize: '1rem'}} border="2px">
										<thead>
											<tr>
												<th>Nome</th>
												<th>Sobrenome</th>
												<th>Nascimento</th>
												<th>Idade</th>
											</tr>
										</thead>
										<tbody>
											{clientesFiltrados.map((cliente, index) => 
												<tr key={index}>
													<td>{cliente.nome}</td>
													<td>{cliente.sobrenome}</td>
													<td>{cliente.nascimento}</td>
													<td>{cliente.idade}</td>
												</tr>	
											)}
										</tbody>
									</table>
								</div>
							</div>
							<div className="screen-body-item">
								<div className="app-form">
									<div className="app-form-group">
										<label style={{ color: 'white' }}>
											Pesquisar Clientes
											<input
												id="filtro"
												onKeyUp={(evento) => {
													setClientesFiltrados(filtrarNome(evento.target.value, clientes))
												}}
												className="app-form-control"
												placeholder="Informe o nome ou o sobrenome do cliente"
											/>
										</label>
									</div>
									{/* <div className="app-form-group">
										<input
											className="app-form-control"
											placeholder="Insira seu nome..."
										/>
									</div>
									<div className="app-form-group">
										<input
											className="app-form-control"
											placeholder="(xx) x-xxxx-xxxx"
										/>
									</div>
									<div className="app-form-group message">
										<input className="app-form-control" placeholder="ᕦ(ò_óˇ)ᕤ" />
									</div> */}
									<div className="app-form-group buttons">
										<button className="app-form-button">Incluir</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
