import dynamic from 'next/dynamic'

const Dynamic = dynamic(() => import('./Dynamic'), {
  ssr: false // Disable server-side rendering for this component
})

const Map = ({ cities, selectedCity, flag }) => {
  return <Dynamic cities={cities} selectedCity={selectedCity} flag={flag} />
}

export default Map
