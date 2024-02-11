import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

type HeaderProps = {
	token: string
	setToken: React.Dispatch<React.SetStateAction<string>>
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({
	setDisplayLogin,
	setDisplaySignUp,
	token,
	setToken,
}: HeaderProps) => {
	const navigate = useNavigate()

	return (
		<header className="bg-red-marvel text-white text-xl">
			<div>
				<div className="flex h-20 w-4/5 m-auto justify-between items-center ">
					<div className="flex  h-full items-center">
						<Link className="h-full flex items-center w-28" to={'/'}>
							<img className="w-max" src={logo} alt="logo" />{' '}
						</Link>
					</div>

					<div className="md:visible max-md:hidden flex justify-around w-1/2 h-full items-center">
						<Link to={'/comics'}> Comics</Link>
						<Link to={'/'}> Characters</Link>
						<Link to={'/favoris'}>Favoris</Link>
					</div>

					<div className="flex justify-around  h-full items-center">
						{token ? (
							<button
								onClick={() => {
									Cookies.remove('userToken')
									setToken('')
									navigate('/')
								}}
							>
								Deconnection
							</button>
						) : (
							<div className="border-2 border-white border-solid rounded flex">
								<button
									className="mx-1 w-18"
									onClick={() => setDisplayLogin(true)}
								>
									Log in
								</button>
								<div> | </div>
								<button
									className="mx-1 w-18"
									onClick={() => setDisplaySignUp(true)}
								>
									Sign up
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="max-md:visible md:hidden flex justify-around w-full h-full items-center">
					<Link to={'/comics'}> Comics</Link>
					<Link to={'/'}> Characters</Link>
					<Link to={'/favoris'}>Favoris</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
