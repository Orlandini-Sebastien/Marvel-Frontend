import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = () => {
	return (
		<header className="bg-[#ED1D24] text-white text-xl">
			<div className="flex h-[15vh] w-4/5 m-auto justify-center items-center ">
				<div className="flex  w-full h-full items-center">
					<Link className="h-full flex items-center w-28" to={'/'}>
						<img className="w-max" src={logo} alt="logo" />{' '}
					</Link>
					
				</div>
				<div className="flex justify-around w-full h-full items-center">
					<Link to={'/comics'}> Comics</Link>
					<Link to={'/'}> Characters</Link>
					<Link to={'/favoris'}>Favoris</Link>
				</div>
				<div className="flex justify-around w-full h-full items-center">
					<Link to={'/signin'}> Sign In</Link>
					<Link to={'/signup'}> Sign Up</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
