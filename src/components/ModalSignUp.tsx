import { ReactElement } from 'react'
import SignUp from '../pages/SignUp'

type ModalSignUpProps = {
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
	setDisplaySignUp: React.Dispatch<React.SetStateAction<boolean>>
	setToken: React.Dispatch<React.SetStateAction<string>>
}

const ModalSignUp = ({
	setDisplaySignUp,
	setDisplayLogin,
	setToken,
}: ModalSignUpProps): ReactElement => {
	return (
		<div
			className="h-screen w-screen top-0 flex justify-center items-center bg-gray-300/50 absolute z-50 "
			onClick={() => setDisplaySignUp(false)}
		>
			<div
				className="max-md:w-11/12 md:w-1/3 h-96 flex justify-center items-center bg-white "
				onClick={(event) => event.stopPropagation()}
			>
				<div className="h-full w-full flex justify-center items-center">
					<SignUp
						setToken={setToken}
						setDisplayLogin={setDisplayLogin}
						setDisplaySignUp={setDisplaySignUp}
					/>
				</div>
			</div>
		</div>
	)
}

export default ModalSignUp
