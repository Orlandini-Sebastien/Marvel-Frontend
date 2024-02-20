import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import favorit from '../assets/favorits.png'
import { motion } from 'framer-motion'
import notFound from '../assets/image_not_found.png'

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
	const descriptionToggleInitial: boolean[] = new Array(100).fill(false)
	const [descriptionToggleCharacter, setDescriptionToggleCharacter] = useState<
		Array<boolean>
	>(descriptionToggleInitial)

	const descriptionToggleInitial2: boolean[] = new Array(100).fill(false)
	const [descriptionToggleComic, setDescriptionToggleComic] = useState<
		Array<boolean>
	>(descriptionToggleInitial2)

	const handleDescriptionCharacter = (index: number) => {
		const newValue = [...descriptionToggleCharacter]
		if (newValue[index] === false) newValue[index] = true
		else newValue[index] = false
		setDescriptionToggleCharacter(newValue)
	}

	const handleDescriptionComic = (index: number) => {
		const newValue = [...descriptionToggleComic]
		if (newValue[index] === false) newValue[index] = true
		else newValue[index] = false
		setDescriptionToggleComic(newValue)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const autorisation = await axios.request({
					headers: {
						Authorization: `Bearer ${token}`,
					},
					method: 'POST',
					url: `https://site--backend-marvel--cfvhczrj5zks.code.run/favoris`,
				})
				console.log(autorisation.data)
			} catch (error) {
				navigate('/')
				setDisplayLogin(true)
			}

			try {
				const depart = Cookies.get('FavoritCharacter')
				if (depart) {
					const cookie = JSON.parse(depart)

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
	}, [])

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center text-white text-4xl">
			<div className="loader"></div>
		</div>
	) : (
		<motion.section
			animate={{ opacity: 100 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 1 }}
		>
			<img
				className="w-full max-md:h-[50%]  fixed h-1/2   object-cover top-1/2 transform -translate-y-1/2 -z-10  "
				src={favorit}
				alt="oeil"
			/>
			{data.length > 0 ? (
				<section className="m-auto w-5/6">
					<h1 className="flex justify-center  h-12 items-center font-bold text-black border border-solid rounded bg-white/70 shadow-white shadow-xl my-6">
						FAVORITE CHARACTERS
					</h1>
					<div className="flex flex-wrap justify-center w-full ">
						{data.map(
							(favorisCaracter: favorisCharacterType, index: number) => {
								return (
									<div
										className={
											favorisCaracter.thumbnail.path &&
											favorisCaracter.thumbnail.extension
												? 'shadow-white cursor-alias  shadow-xl relative min-w-52  m-2 border-2 border-solid border-white rounded flex flex-col w-[18%] h-96 overflow-auto '
												: 'hidden'
										}
										key={favorisCaracter._id}
									>
										<img
											className="h-full object-cover"
											src={
												favorisCaracter.thumbnail.path !==
												'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
													? `${favorisCaracter.thumbnail.path}/portrait_uncanny.${favorisCaracter.thumbnail.extension}`
													: notFound
											}
											alt={`image de ${favorisCaracter.name}`}
										/>

										<div
											className={
												descriptionToggleCharacter[index]
													? 'absolute  font-bold  w-full bg-red-300 bg-opacity-60 flex rounded  flex-col '
													: 'hidden'
											}
										>
											<div className="flex mx-8 text-center  justify-center font-extrabold my-2 ">
												{favorisCaracter.name}
											</div>
											<div>{favorisCaracter.description}</div>
										</div>
										<button
											className={
												favorisCaracter.description
													? 'absolute left-1/2 transform -translate-x-1/2  z-10 bg-slate-100 bg-opacity-70  rounded bottom-4 border-2 border-red-400 font-bold '
													: 'hidden'
											}
											onClick={() => handleDescriptionCharacter(index)}
										>
											DESCRIPTION
										</button>
									</div>
								)
							}
						)}
					</div>
				</section>
			) : (
				<section className="text-white justify-center flex items-center font-extrabold flex-col">
					<div>No favorite characters</div>
					<div>😞</div>
				</section>
			)}
			<section className="my-6">
				{data2.length > 0 ? (
					<section className="m-auto w-5/6">
						<h1 className="flex justify-center  h-12 items-center font-bold text-black border border-solid rounded bg-white/70 shadow-white shadow-xl my-6">
							FAVORITE COMICS
						</h1>
						<div className="flex flex-wrap justify-center w-full ">
							{data2.map((favorisComic: favoriComicType, index: number) => {
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
											src={
												favorisComic.thumbnail.path !==
												'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
													? `${favorisComic.thumbnail.path}/portrait_uncanny.${favorisComic.thumbnail.extension}`
													: notFound
											}
											alt={`image de ${favorisComic.title}`}
										/>

										<div
											className={
												descriptionToggleComic[index]
													? 'absolute  font-bold  w-full bg-red-300 bg-opacity-60 flex rounded  flex-col '
													: 'hidden'
											}
										>
											<div className="flex mx-8 text-center  justify-center font-extrabold my-2 ">
												{favorisComic.title}
											</div>
											<div>{favorisComic.description}</div>
										</div>
										<button
											className={
												favorisComic.description
													? 'absolute left-1/2 transform -translate-x-1/2  z-10 bg-slate-100 bg-opacity-70  rounded bottom-4 border-2 border-red-400 font-bold '
													: 'hidden'
											}
											onClick={() => handleDescriptionComic(index)}
										>
											DESCRIPTION
										</button>
									</div>
								)
							})}
						</div>
					</section>
				) : (
					<section className="text-white justify-center flex items-center font-extrabold flex-col">
						<div>No favorite comics</div>
						<div>😞</div>
					</section>
				)}
			</section>
		</motion.section>
	)
}

export default Favoris
