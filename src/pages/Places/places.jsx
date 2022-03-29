import { useState, useEffect } from 'react'
import * as placeService from '../../services/placeService.js'
import { Link } from 'react-router-dom'
import PlaceCard from '../../components/PlaceCard/PlaceCard'
import styles from './places.module.css'

const Places = (props) => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    placeService.getAllPlaces()
      .then(places => setPlaces(places))
  }, [])

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Places</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {places.length ?
            places.map((place, i) => (
                <div className="group relative">
                  <PlaceCard
                    key={place._id + i}
                    place={place}
                  />
               {/* <p key={place._id}>{place.name}</p> */}
                </div>
              ))
            :
            <div>
              <p>No places yet</p>
              <Link to="/places/add">Add a Place</Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Places