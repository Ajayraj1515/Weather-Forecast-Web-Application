import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './index.css'

const CITIES_API_URL =
  'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset='

const CitiesTable = () => {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCities, setFilteredCities] = useState([])
  const observer = useRef()

  const fetchCities = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${CITIES_API_URL}${offset}`)
      console.log('API Response:', response.data.results)

      const newCities = response.data.results.map(record => ({
        id: record.geoname_id,
        name: record.name,
        country: record.cou_name_en,
        timezone: record.timezone,
      }))

      setCities(prevCities => [...prevCities, ...newCities])
      setOffset(prevOffset => prevOffset + 20)

      if (newCities.length === 0) setHasMore(false)
    } catch (error) {
      console.error('Error fetching cities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = entries => {
    const target = entries[0]
    if (target.isIntersecting && !loading && hasMore) {
      fetchCities()
    }
  }

  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const filtered = cities.filter(
      city =>
        city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredCities(filtered)
  }, [searchQuery, cities])

  useEffect(() => {
    fetchCities()
  }, [])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observerInstance = new IntersectionObserver(handleScroll, options)
    if (observer.current) {
      observerInstance.observe(observer.current)
    }
    return () => {
      if (observerInstance) observerInstance.disconnect()
    }
  }, [loading, hasMore])

  return (
    <div className="container">
      <h1>Cities Table</h1>
      <input
        type="text"
        placeholder="Search by city or country..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <tr key={city.id}>
              <td>
                <a
                  href={`/weather/${city.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {city.name}
                </a>
              </td>
              <td>{city.country}</td>
              <td>{city.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading more cities...</p>}
      <div id="scroll-anchor" ref={observer} />
    </div>
  )
}

export default CitiesTable
