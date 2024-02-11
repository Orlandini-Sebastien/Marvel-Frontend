import { useEffect, useState } from 'react'
import axios from 'axios'
import fontComic from '../assets/font-comics.png'
import Cookies from 'js-cookie'
type comicType = {
	_id: string
	title: string
	thumbnail: {
		path: string
		extension: string
	}
	description: string
}

const Comics = () => {
	const descriptionToggleInitial: boolean[] = new Array(100).fill(false)
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<comicType[]>([])
	const [page, setPage] = useState(0)
	const [descriptionToggle, setDescriptionToggle] = useState(
		descriptionToggleInitial
	)
	const [searchComic, setSearchComic] = useState('')
	const [favoritComicCookie, setFavoritComicCookie] = useState<string[]>([])
	const [nbPage, setNbpage] = useState(0)

	const handlesearchComic = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value
		setPage(0)
		setSearchComic(value)
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
					className="px-1"
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

	const handleFavorite = (comic: comicType) => {
		//Envoyer les préférences dans un cookie
		console.log(comic._id)

		const depart = Cookies.get('FavoritComic')
		if (depart) {
			const array = JSON.parse(depart)
			const newFavorite: string[] = [...array]
			let newFavorite2: string[]
			if (newFavorite.includes(comic._id)) {
				newFavorite2 = newFavorite.filter((a) => a !== comic._id)
			} else {
				newFavorite.push(comic._id)
				newFavorite2 = [...newFavorite]
			}
			setFavoritComicCookie(newFavorite2)
			console.log(favoritComicCookie)
			Cookies.set('FavoritComic', JSON.stringify(newFavorite2))
			const retour = Cookies.get('FavoritComic')
			if (retour) console.log(JSON.parse(retour))
		} else {
			Cookies.set('FavoritComic', JSON.stringify([comic._id]))
		}
	}

	const Toggleheart = (comic: comicType) => {
		const depart = Cookies.get('FavoritComic')
		if (depart) {
			const cookie = JSON.parse(depart)

			if (cookie.includes(comic._id)) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}

	useEffect(() => {
		console.log('dedans')

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--backend-marvel--cfvhczrj5zks.code.run/comics?page=${page}&comic=${searchComic}`
				)
					console.log(response)
				setData(response.data)
			} catch (error) {
				console.log('catch app>>>', error)
			}
			setIsLoading(false)
		}
		fetchData()
		const fetchPage = async () => {
			try {
				// Pour trouver le nombre de page
				let firstPage: number = 0
				let initial: number = 1
				while (initial > 0) {
					const ask = await axios.get(
						`https://site--backend-marvel--cfvhczrj5zks.code.run/comics?page=${firstPage}&comic=${searchComic}`
					)
					initial = ask.data.length

					if (initial !== 0) {
						firstPage += 1
					}
				}
				setNbpage(firstPage)
			} catch (error) {
				console.log('catch app>>>', error)
			}
		}
		fetchPage()
	}, [page, searchComic])

	{
		console.log('Dans comics >>', data)
	}

	return isLoading ? (
		<div className="flex w-screen justify-center items-center">Loading ...</div>
	) : (
		<div>
					<img className="w-full  fixed  object-cover top-1/2 transform -translate-y-1/2  " src={fontComic} alt="oeil" /><section className="m-auto w-5/6">
			<div className="flex justify-center items-center">
				<label
					htmlFor="searchComic"
					className="flex justify-center  h-12 items-center font-bold text-white"
				>
					Comics
				</label>
				<input
					type="text"
					placeholder="search"
					id="searchComic"
					name="searchComic"
					value={searchComic}
					onChange={handlesearchComic}
					className="bg-red-100 rounded h-7 mx-2"
				/>
			</div>
			<div className="flex flex-wrap justify-center w-full ">
				{data.map((comic: comicType, index: number) => {
					return (
						<div
							className="relative xl:w-1/4 lg:w-1/3 md:w-1/2 cursor-alias  "
							key={comic._id}
						>
							<div className="shadow-white shadow-xl relative  m-2  border-2 border-white border-solid  rounded  flex flex-col  h-96  ">
								<img
									className=" h-full object-cover"
									src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
									alt={`image de ${comic.title}`}
								/>
								<div className="absolute font-bold w-full  ">
									<div
										className={
											descriptionToggle[index]
												? 'hidden'
												: 'text-center  bg-red-300 bg-opacity-60 rounded font-extrabold my-2 mx-8'
										}
									>
										{comic.title}
									</div>
								</div>
								<div
									className={
										descriptionToggle[index]
											? 'absolute  font-bold px-4 w-full bg-red-300 bg-opacity-60 flex rounded  flex-col h-[90%] overflow-auto  '
											: 'hidden'
									}
								>
									<div className="flex mx-8 text-center font-extrabold my-2  ">
										{comic.title}
									</div>
									<div>{comic.description}</div>
								</div>
							</div>

							<button
								className={
									comic.description
										? 'absolute left-1/2 transform -translate-x-1/2  z-10 bg-slate-100 bg-opacity-70  rounded bottom-4 border-2 border-red-400 font-bold '
										: 'hidden'
								}
								onClick={() => handleDescription(index)}
							>
								DESCRIPTION
							</button>
							<button
								onClick={() => handleFavorite(comic)}
								className="absolute z-20 top-3 right-3 text-3xl"
							>
								{Toggleheart(comic) ? <div>❤️‍🔥</div> : <div>❤️</div>}
							</button>
						</div>
					)
				})}
			</div>

			<div className="text-white flex justify-center h-20 ">{pagination()}</div>
		</section>
		</div>
		
	)
}

export default Comics
