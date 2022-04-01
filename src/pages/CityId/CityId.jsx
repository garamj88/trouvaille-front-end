// import { useState, useRef, useEffect } from 'react'
import * as cityService from '../../services/cityService'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MapBox from '../../components/MapBox/MapBox'
// import MapBoxTwo  from '../../components/MapBox/MapBoxTwo'
import PlaceCard from '../../components/PlaceCard/PlaceCard'
import styles from './CityId.module.css'
import ItineraryCard from '../../components/ItineraryCard/ItineraryCard'

const CityId = (props) => {
  const location = useLocation()
  const [cityDetails, setCityDetails] = useState(null)

  useEffect(() => {
    cityService.getOne(location.state.city._id)
      .then(city => {
        setCityDetails(city)
      })
  }, [location.state.city._id])

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <header className="bg-white">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{cityDetails?.city}</h2>
        </header>

        <div className="mt-6 lg:grid grid-cols-3 xl:gap-x-8">
          {cityDetails ?
            <>
              <div className="sm:gap-y-8 lg:col-span-2 gap-x-8">
                <h3 className="mt-2 pr-3 text-sm text-gray-600">{cityDetails?.desc}</h3>
              </div>
              <div className="sm:gap-y-8 lg:col-span-1 gap-x-8">
                <p className="mt-2 text-sm text-gray-500">Population: </p>
                <p className="font-small text-gray-900">{cityDetails?.population}</p>
                <p className="mt-2 text-sm text-gray-500">Walkable? </p>
                <p className="font-small text-gray-900"> {cityDetails?.walkable ? 'You can walk!' : 'Get a bike'} </p>
              </div>
            </>
            :
            <div>
              <p className="font-medium text-gray-900">Loading City Details...</p>
            </div>
          }

          <div className="px-2 sm:gap-y-16 lg:col-span-2 mt-2 gap-x-8">
            <div>
              {
                cityDetails &&
                <MapBox className="w-full h-full object-center object-cover lg:w-full lg:h-full" city={cityDetails?.city} state={cityDetails?.state} places={cityDetails?.places} />
              }
              {/* {
            cityDetails && 
              <MapBoxTwo city={cityDetails?.city} state={cityDetails?.state} places={cityDetails?.places} />
          } */}
            </div>
          </div>

          <div className="shadow-sm sm:gap-y-16 lg:col-span-1 mt-2 gap-x-8 border-2">
            <ItineraryCard city={cityDetails} handleAddItinerary={props.handleAddItinerary} />
          </div>
          <div><br /> <br />
            <h3 className="flex content-center justify-center">Places to go in {cityDetails?.city}</h3>
            {cityDetails?.places ?
              <div className="flex content-center justify-center">
                {cityDetails?.places.map(place => (
                  <PlaceCard key={place._id} place={place} />
                ))}
              </div>
              :
              <div>
                <p>Loading Places ...</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CityId