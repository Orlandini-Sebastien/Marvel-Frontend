import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

type favorisCharacterType = {
	_id: string
	name: string
	thumbnail: {
		path: string
		extension: string
	}
	description: string
}
type favoriComicType = {
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
	const [data, setData] = useState<Array<favorisCharacterType>>([])
	const [data2, setData2] = useState<Array<favoriComicType>>([])
	const navigate = useNavigate()

	useEffect(() => {
		console.log('dedans')

		const fetchData = async () => {
			try {
				const depart = Cookies.get('FavoritCharacter')
				if (depart) {
					const cookie = JSON.parse(depart)
					console.log('cookie>>>', cookie)

					const data: never[] = []
					for (let i = 0; i < cookie.length; i++) {
						const response: AxiosResponse<never> = await axios.request({
							headers: {
								Authorization: `Bearer ${token}`,
							},
							method: 'GET',
							url: `https://site--backend-marvel--cfvhczrj5zks.code.run/character/${cookie[i]}`,
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

			try {
				const depart = Cookies.get('FavoritComic')
				if (depart) {
					const cookie = JSON.parse(depart)
					console.log('cookie>>>', cookie)

					const data2: never[] = []
					for (let i = 0; i < cookie.length; i++) {
						const response: AxiosResponse<never> = await axios.request({
							headers: {
								Authorization: `Bearer ${token}`,
							},
							method: 'GET',
							url: `https://site--backend-marvel--cfvhczrj5zks.code.run/comic/${cookie[i]}`,
						})

						data2.push(response.data)

						console.log('response', data2)
					}
					setData2(data2)
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
	},[])

	{
		console.log('Dans favorisCaracter >>>>>', data)
	}

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center">
			Loading ...
		</div>
	) : (
		<section>
			<section className="m-auto w-5/6">
				<h1 className="flex justify-center  h-12 items-center font-bold text-white">
					favoris Caracter
				</h1>
				<div className="flex flex-wrap justify-center w-full ">
					{data.map((favorisCaracter: favorisCharacterType) => {
						return (
							<div
								className={
									favorisCaracter.thumbnail.path &&
									favorisCaracter.thumbnail.extension
										? 'shadow-white cursor-alias  shadow-xl relative min-w-52  m-2 border-2 border-solid border-white rounded flex flex-col w-[18%] h-96 overflow-auto'
										: 'hidden'
								}
								key={favorisCaracter._id}
							>
								<img
									className="h-full object-cover"
									src={`${favorisCaracter.thumbnail.path}.${favorisCaracter.thumbnail.extension}`}
									alt={`image de ${favorisCaracter.name}`}
								/>
							</div>
						)
					})}
				</div>
			</section>
			<section className="m-auto w-5/6">
				<h1 className="flex justify-center  h-12 items-center font-bold text-white">
					favoris Comic
				</h1>
				<div className="flex flex-wrap justify-center w-full ">
					{data2.map((favorisComic: favoriComicType) => {
						return (
							<div
								className={
									favorisComic.thumbnail.path &&
									favorisComic.thumbnail.extension
										? 'shadow-white shadow-xl relative min-w-52  m-2 border-2 border-solid border-white rounded flex flex-col w-[18%] h-96 overflow-auto'
										: 'hidden'
								}
								key={favorisComic._id}
							>
								<img
									className="h-full object-cover"
									src={`${favorisComic.thumbnail.path}.${favorisComic.thumbnail.extension}`}
									alt={`image de ${favorisComic.title}`}
								/>
							</div>
						)
					})}
				</div>
			</section>
		</section>
	)
}

export default Favoris
