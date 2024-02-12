import { ReactElement, useState } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

type loginProps = {
	setToken: React.Dispatch<React.SetStateAction<string>>
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
}

const SignIn = ({
	setDisplayLogin,
	setDisplaySignUp,
	setToken,
}: loginProps): ReactElement => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [alert, setAlert] = useState('')
	const [shake, setShake] = useState(false)

	const [connection, setConnection] = useState({})

	const location = useLocation()
	const navigate = useNavigate()
	console.log('location >>>', location.state)

	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setEmail(value)
	}
	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setPassword(value)
	}

	const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (email === '') {
			setAlert("L'email est obligatoire !")
		} else if (password.length < 6) {
			setAlert('7 charachères minimum !')
			setShake(true)
			setTimeout(() => {
				setShake(false)
			}, 1000)
		} else {
			setAlert('')
			try {
				const { data } = await axios.post(
					'https://site--backend-marvel--cfvhczrj5zks.code.run/userMarvel/login',
					{
						email: email,
						password: password,
					}
				)
				console.log('response>>>>>>>', data)
				setConnection(data)
				Cookies.set('userToken', data.token, { expires: 1 })
				setToken(data.token)
				setDisplayLogin(false)
				if (location.state.path)
					navigate(location.state.path, {
						state: {
							price: location.state.price,
							product_name: location.state.product_name,
						},
					})
			} catch (e) {
				console.log('error >>>>', e)
				const error = e as AxiosError

				console.log('catch app>>>', error.response?.status)
				if (error.response?.status === 401) {
					setAlert("L'email n'existe pas")
				}
			}
		}
	}
	console.log('connection>>>', connection)
	return (
		<div className="flex flex-col w-11/12 h-full py-4">
			<div className="w-full flex justify-end  ">
				<button onClick={() => setDisplayLogin(false)} className="mx-4">
					✖️
				</button>
			</div>

			<div className="text-lg text-gray-600  flex justify-center "> Log in</div>

			<form
				className="h-full flex flex-col justify-around "
				onSubmit={handleSubmit}
			>
				<input
					type="email"
					placeholder="Adresse email"
					name="email"
					value={email}
					onChange={handleEmailChange}
					className=" bg-white text-red-marvel  border-b-2 rounded w-full leading-8 my-4"
				/>

				<input
					type="password"
					placeholder="Mot de passe"
					name="p1"
					value={password}
					onChange={handlePasswordChange}
					className={` ${
						alert === '7 charachers minimum !' ? 'borderRed' : ''
					}  ${
						shake ? 'shake' : ''
					}  bg-white  border-b-2 border-red-200  rounded w-full leading-8 my-4 `}
				/>

				<p className="text-red-500 my-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
					{alert}
				</p>

				<button className="mt-8 mb-4 border-none rounded bg-red-marvel text-white py-2 flex w-full justify-center">
					Se connecter
				</button>
				<button
					className="flex justify-center text-xs text-red-marvel w-full"
					onClick={() => {
						setDisplayLogin(false)
						setDisplaySignUp(true)
					}}
				>
					Don't have an account yet? Sign up
				</button>
			</form>
		</div>
	)
}

export default SignIn
