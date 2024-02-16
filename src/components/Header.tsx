import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import fontHeader from '../assets/heroHeader.png'

type HeaderProps = {
	token: string
	setToken: React.Dispatch<React.SetStateAction<string>>
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
	activePage: string
	setActivePage: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({
	setDisplayLogin,
	setDisplaySignUp,
	token,
	setToken,
	activePage,
	setActivePage,
}: HeaderProps) => {
	const navigate = useNavigate()
	const viewNavigate = (newRoute: string) => {
		// Navigate to the new route
		if (!document.startViewTransition) {
			return navigate(newRoute)
		} else {
			return document.startViewTransition(() => {
				navigate(newRoute)
			})
		}
	}
	return (
		<div className="shadow-xl shadow-white">
			<img
				className="w-full  object-cover absolute  h-20 -z-10 "
				src={fontHeader}
				alt="oeil"
			/>
			<header className=" text-white bg-red-marvel/50 text-xl">
				<div>
					<div className="flex h-20 w-4/5 m-auto justify-between items-center ">
						<div className="flex  h-full items-center">
							<button
								className="h-full flex items-center w-28 z-50"
								onClick={() => {
									viewNavigate('/')
									setActivePage('/')
								}}
							>
								<img className="w-max opacity-50" src={logo} alt="logo" />
							</button>
						</div>

						<div className="md:visible max-md:hidden flex justify-around w-1/2 h-full items-center">
							<button
								className={`${
									activePage === '/comics' &&
									' bg-white text-black h-10  rounded'
								} h-full flex items-center w-28 z-50 justify-center`}
								onClick={() => {
									viewNavigate('/comics')
									setActivePage('/comics')
								}}
							>
								Comics
							</button>
							<button
								className={`${
									activePage === '/' && ' bg-white text-black h-10  rounded'
								} h-full flex items-center w-28 z-50 justify-center`}
								onClick={() => {
									viewNavigate('/')
									setActivePage('/')
								}}
							>
								Characters
							</button>
							<button
								className={`${
									activePage === '/favoris' &&
									' bg-white text-black h-10  rounded'
								} h-full flex items-center w-28 z-50 justify-center`}
								onClick={() => {
									viewNavigate('/favoris')
									setActivePage('/favoris')
								}}
							>
								Favoris
							</button>
						</div>

						<div className="flex justify-around  h-full items-center">
							{token ? (
								<button
									onClick={() => {
										Cookies.remove('userToken')
										setToken('')
										navigate('/')
										setActivePage('/')
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
						<button
							className={`${
								activePage === '/comics' && ' bg-white text-black h-10  rounded'
							} h-full flex items-center w-28 z-50 justify-center`}
							onClick={() => {
								viewNavigate('/comics')
								setActivePage('/comics')
							}}
						>
							Comics
						</button>
						<button
							className={`${
								activePage === '/' && ' bg-white text-black h-10  rounded'
							} h-full flex items-center w-28 z-50 justify-center`}
							onClick={() => {
								viewNavigate('/')
								setActivePage('/')
							}}
						>
							Characters
						</button>
						<button
							className={`${
								activePage === '/favoris' &&
								' bg-white text-black h-10  rounded'
							} h-full flex items-center w-28 z-50 justify-center`}
							onClick={() => {
								viewNavigate('/favoris')
								setActivePage('/favoris')
							}}
						>
							Favoris
						</button>
					</div>
				</div>
			</header>
		</div>
	)
}

export default Header
