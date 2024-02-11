import '../App.css'

import { ReactElement, useState } from 'react'

import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

type SignUpProps = {
	setToken: React.Dispatch<React.SetStateAction<string>>

	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignUp({
	setDisplayLogin,
	setDisplaySignUp,
	setToken,
}: SignUpProps): ReactElement {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alert, setAlert] = useState('')
	const [shake, setShake] = useState(false)

	const location = useLocation()
	const navigate = useNavigate()
	console.log('location >>>', location.state)

	const handleNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setName(value)
	}
	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setEmail(value)
	}
	const handleP1Change = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value
		setPassword(value)
	}

	const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (name === '') {
			setAlert('Le nom est obligatoire !')
		} else if (email === '') {
			setAlert("L'email est obligatoire !")
		} else if (password.length < 6) {
			setAlert('7 charachères minimum !')
			setShake(true)
			setTimeout(() => {
				setShake(false)
			}, 1000)
		} else {
			setAlert('')

			if (name && email && password) {
				const formData = new FormData()
				formData.append('username', name)
				formData.append('email', email)
				formData.append('password', password)

				try {
					const { data } = await axios.post(
						'https://site--backend-marvel--cfvhczrj5zks.code.run/userMarvel/signup',
						formData
					)
					console.log('response', data)
					Cookies.set('userToken', data.token, { expires: 1, secure: true })
					setToken(data.token)
					setDisplaySignUp(false)
					if (location.state.path)
						navigate(location.state.path, {
							state: {
								price: location.state.price,
								product_name: location.state.product_name,
							},
						})
				} catch (e) {
					const error = e as AxiosError

					console.log('catch app>>>', error.response?.status)
					if (error.response?.status === 400) {
						setAlert("L'email est déjà enregistré")
					}
				}
			}
		}
	}

	return (
		<>
			<section className="flex flex-col w-11/12 h-full py-4 ">
				<div className="w-full flex justify-end ">
					<button onClick={() => setDisplaySignUp(false)} className="mx-4  ">
						✖️
					</button>
				</div>
				<div className="text-lg text-gray-600  flex justify-center">
					Sign Up
				</div>

				<form
					onSubmit={handleSubmit}
					className="h-full flex flex-col justify-around "
				>
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={handleNameChange}
						className=" bg-white   border-b-2 leading-8  flex w-full text-red-marvel"
					/>

					<input
						type="email"
						placeholder="Email"
						name="email"
						value={email}
						onChange={handleEmailChange}
						className=" bg-white leading-8 border-b-2 border-red-200 flex w-full text-red-marvel"
					/>

					<input
						type="password"
						placeholder="Password"
						name="p1"
						value={password}
						onChange={handleP1Change}
						className={` ${
							alert === 'passwords are not the same' ||
							alert === '7 charachers minimum !'
								? 'borderRed'
								: ''
						}  ${
							shake ? 'shake' : ''
						}  bg-white  border-b-2 rounded w-full leading-8 `}
					/>

					<p className="text-red-500  sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
						{alert}
					</p>
					<button className="bg-red-marvel mb-4 border-none rounded bg-blue-vinted text-white py-2 w-full">
						Here we go !
					</button>
					<button
						className="flex justify-center text-xs text-red-marvel w-full"
						onClick={() => {
							setDisplayLogin(true)
							setDisplaySignUp(false)
						}}
					>
						Already have an account? Log in
					</button>
				</form>
			</section>
		</>
	)
}
