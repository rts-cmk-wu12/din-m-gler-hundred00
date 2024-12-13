
// it might have worked. wouldnt know because google wont let me use the api no matter what i try. unfortunate but i refuse to delete it so it shows that i did in fact try.

import { useEffect, useRef, useMemo, useState } from "react"
import dynamic from "next/dynamic"

const Map = ({ address }) => {
    const mapRef = useRef(null)
    const [googleLoaded, setGoogleLoaded] = useState(false)
    const geocoder = useMemo(() => googleLoaded ? new google.maps.Geocoder() : null, [googleLoaded])

    useEffect(() => {
        import('@googlemaps/js-api-loader').then(({ Loader }) => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                version: "weekly"
            })
            loader.load().then(() => {
                setGoogleLoaded(true)
            })
        })
    }, [])

    useEffect(() => {
        if (googleLoaded && geocoder) {
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === "OK") {
                    const map = new google.maps.Map(mapRef.current, {
                        center: results[0].geometry.location,
                        zoom: 8
                    })
                    const marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    })
                } else {
                    console.error(`Geocode was not successful for the following reason: ${status}`)
                }
            })
        }
    }, [address, googleLoaded, geocoder])

    return <div style={{ height: "400px" }} ref={mapRef} />
}

export default dynamic(() => Promise.resolve(Map), { ssr: false })
