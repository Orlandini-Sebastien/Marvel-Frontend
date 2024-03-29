import { ReactElement } from 'react'

import SignIn from '../pages/SignIn'

type ModalLoginProps = {
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
	setToken: React.Dispatch<React.SetStateAction<string>>
	activePage: string
	setActivePage: React.Dispatch<React.SetStateAction<string>>
}

const ModalLogin = ({
	setDisplayLogin,
	setDisplaySignUp,
	setToken,
	activePage,
	setActivePage,
}: ModalLoginProps): ReactElement => {
	return (
		<div
			className="h-screen w-screen top-0 flex justify-center items-center bg-gray-300/50 absolute z-50 "
			onClick={() => {
				setDisplayLogin(false)
				if (activePage === '/favoris') setActivePage('/')
			}}
		>
			<div
				className="max-md:w-11/12 md:w-1/3 h-96  flex justify-center items-center bg-white relative"
				onClick={(event) => event.stopPropagation()
				}
			>
				<div className="h-full w-full flex justify-center items-center">
					<SignIn
						setToken={setToken}
						setDisplayLogin={setDisplayLogin}
						setDisplaySignUp={setDisplaySignUp}
						activePage={activePage}
						setActivePage={setActivePage}
					/>
				</div>
			</div>
		</div>
	)
}

export default ModalLogin
