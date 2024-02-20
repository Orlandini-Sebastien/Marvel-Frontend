import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import oeil from '../assets/peil2.png'
import { motion } from 'framer-motion'
import notFound from '../assets/image_not_found.png'

type characterType = {
	_id: string
	name: string
	thumbnail: {
		path: string
		extension: string
	}
	description: string
}

type typeCharacters = {
	setData: React.Dispatch<React.SetStateAction<never[]>>
	data: {
		_id: string
		name: string
		thumbnail: {
			path: string
			extension: string
		}
		description: string
	}[]
}

const Characters = ({ data, setData }: typeCharacters) => {
	const [isLoading, setIsLoading] = useState(true)

	const [page, setPage] = useState(0)
	const descriptionToggleInitial: boolean[] = new Array(100).fill(false)
	const [descriptionToggle, setDescriptionToggle] = useState(
		descriptionToggleInitial
	)
	const [searchCharacter, setSearchCharacter] = useState('')

	const [favoritCharacterCookie, setFavoritCharacterCookie] = useState<
		string[]
	>([])

	const [nbPage, setNbpage] = useState(0)
	const [animationPage, setAnimationPage] = useState(false)
	console.log(animationPage)

	const handlesearchCharacter = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setPage(0)
		setSearchCharacter(value)
	}

	const pagination = () => {
		const array: number[] = []
		for (let i = 0; i < nbPage; i++) {
			array.push(i)
		}
		const newArray = array.map((number, index) => {
			return (
				<button
					key={index}
					onClick={() => {
						setPage(number)
					}}
					className={`${
						page - 5 > index || index > page + 5 ? 'hidden' : 'visible'
					} px-1 `}
				>
					{number + 1}
				</button>
			)
		})
		return newArray
	}

	const handleDescription = (index: number) => {
		const newValue = [...descriptionToggle]
		if (newValue[index] === false) newValue[index] = true
		else newValue[index] = false
		setDescriptionToggle(newValue)
	}
	const handleFavorite = (character: characterType) => {
		//Envoyer les préférences dans un cookie
		console.log(character._id)

		const depart = Cookies.get('FavoritCharacter')
		if (depart) {
			const array = JSON.parse(depart)
			const newFavorite: string[] = [...array]
			let newFavorite2: string[]
			if (newFavorite.includes(character._id)) {
				newFavorite2 = newFavorite.filter((a) => a !== character._id)
			} else {
				newFavorite.push(character._id)
				newFavorite2 = [...newFavorite]
			}
			setFavoritCharacterCookie(newFavorite2)
			console.log(favoritCharacterCookie)
			Cookies.set('FavoritCharacter', JSON.stringify(newFavorite2))
			const retour = Cookies.get('FavoritCharacter')
			if (retour) console.log(JSON.parse(retour))
		} else {
			Cookies.set('FavoritCharacter', JSON.stringify([character._id]))
		}
	}

	const Toggleheart = (character: characterType) => {
		const depart = Cookies.get('FavoritCharacter')
		if (depart) {
			const cookie = JSON.parse(depart)

			if (cookie.includes(character._id)) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}

	useEffect(() => {
		setAnimationPage(true)
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Pour afficher la page
				const response = await axios.get(
					`https://site--backend-marvel--cfvhczrj5zks.code.run/characters?page=${page}&character=${searchCharacter}`
				)
				setData(response.data.results)
				setNbpage(Math.ceil(response.data.count / 100))
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
	}, [page, searchCharacter, setData])

	return isLoading ? (
		<div className="flex h-[85vh] w-screen justify-center items-center text-white text-4xl">
			<div className="loader"></div>
		</div>
	) : (
		<motion.div
			animate={{ opacity: 100 }}
			initial={{ opacity: 0 }}
			transition={{ duration: 1 }}
		>
			<img
				className="w-full max-md:h-[50%]  fixed h-1/2   object-cover top-1/2 transform -translate-y-1/2 "
				src={oeil}
				alt="oeil"
			/>
			<section className="relative m-auto w-5/6">
				<div className="flex justify-center items-center">
					<h1 className="flex justify-center  h-12 items-center font-bold text-black border border-solid rounded bg-white shadow-white shadow-xl my-6">
						<label
							htmlFor="searchCharacter"
							className="flex justify-center  h-12 items-center font-bold "
						></label>
						<input
							type="text"
							placeholder="search"
							id="searchCharacter"
							name="searchCharacter"
							value={searchCharacter}
							onChange={handlesearchCharacter}
							className="bg-red-100 rounded h-7 mx-2"
						/>
					</h1>
				</div>

				<div className="flex flex-wrap justify-center w-full  ">
					{data.map((character: characterType, index: number) => {
						return (
							<div
								key={character._id}
								className="relative xl:w-1/4 lg:w-1/3 md:w-[40%] max-md:w-[70%]  "
							>
								<Link
									className="shadow-white shadow-xl relative  m-2  border-2 border-white border-solid  rounded  flex flex-col  h-96 cursor-alias  overflow-auto hover:scale-105 "
									to={`/character/${character._id}`}
									state={{ from: '/characters', character: character.name }}
									id="TheLink"
								>
									<img
										className="h-full object-cover"
										src={
											character.thumbnail.path !==
											'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
												? `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
												: notFound
										}
									/>

									<div className="absolute font-bold w-full  ">
										<div
											className={
												descriptionToggle[index]
													? 'hidden'
													: 'flex justify-center mx-8 text-center  bg-red-300 bg-opacity-60 rounded font-extrabold my-2 '
											}
										>
											{character.name}
										</div>
									</div>

									<div
										className={
											descriptionToggle[index]
												? 'absolute  font-bold  w-full bg-red-300 bg-opacity-60 flex rounded  flex-col '
												: 'hidden'
										}
									>
										<div className="flex mx-8 text-center  justify-center font-extrabold my-2 ">
											{character.name}
										</div>
										<div>{character.description}</div>
									</div>
								</Link>

								<button
									className={
										character.description
											? 'absolute left-1/2 transform -translate-x-1/2  z-10 bg-slate-100 bg-opacity-70  rounded bottom-4 border-2 border-red-400 font-bold '
											: 'hidden'
									}
									onClick={() => handleDescription(index)}
								>
									DESCRIPTION
								</button>
								<motion.button
									whileTap={{ scale: 0.8 }}
									onClick={() => handleFavorite(character)}
									className="absolute z-20 top-3 right-3 text-4xl"
								>
									{Toggleheart(character) ? <div>❤️‍🔥</div> : <div>❤️</div>}
								</motion.button>
							</div>
						)
					})}
				</div>

				<div className="text-white flex justify-center h-20 flex-wrap ">
					{pagination()}
				</div>
			</section>
		</motion.div>
	)
}

export default Characters
