import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

type favorisType = {
	_id: string
	title: string
	thumbnail: {
		path: string
		extension: string
	}
	description: string
}

type FavoType = {
	token: string
	setDisplayLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Favoris = ({ token, setDisplayLogin }: FavoType) => {
	const { id } = useParams()
	const location = useLocation()
	console.log('location >>>>', location)
	console.log(id)
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		console.log('dedans')

		const fetchData = async () => {
			try {
				const depart = Cookies.get('FavoritCharacter')
				if (depart) {
					const cookie = JSON.parse(depart)
					console.log('cookie>>>', cookie)

					let data: never[] = []
					for (let i = 0; i < cookie.length; i++) {
						const response: AxiosResponse<never> = await axios.request({
							headers: {
								Authorization: `Bearer ${token}`,
							},
							method: 'GET',
							url: `http://localhost:3000/character/${cookie[i]}`,
						})

						data.push(response.data)

						console.log('response', data)
					}
					setData(data)
				} else {
					console.log('pas de cookie')
				}
			} catch (e) {
				const error = e as AxiosError

				console.log('catch app>>>', error.response)
				if (error.response?.status === 401) {
					navigate('/')
					setDisplayLogin(true)
				}
			}
			setIsLoading(false)
		}
		fetchData()
	}, [])

	{
		console.log('Dans favoris >>>>>', data)
	}

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center">
			Loding ...
		</div>
	) : (
		<section className="m-auto w-5/6">
			<h1 className="flex justify-center  h-12 items-center font-bold text-white">
				Mes favoris
			</h1>
			<div className="flex flex-wrap justify-center w-full ">
				{data.map((favoris: favorisType) => {
					return (
						<div
							className={
								favoris.thumbnail.path && favoris.thumbnail.extension
									? 'shadow-white shadow-xl relative min-w-52  m-2 border-2 border-solid border-white rounded flex flex-col w-[18%] h-96'
									: 'hidden'
							}
							key={favoris._id}
						>
							<img
								className="h-full object-cover"
								src={`${favoris.thumbnail.path}.${favoris.thumbnail.extension}`}
								alt={`image de ${favoris.title}`}
							/>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default Favoris
