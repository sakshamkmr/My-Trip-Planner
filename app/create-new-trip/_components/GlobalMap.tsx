'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTripDetail } from '@/app/provider'


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!

export default function GlobalMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const tripDetailInfo = useTripDetail()
  
  //@ts-ignore
  const { tripDetailinfo,setTripDetailinfo } = useTripDetail();

  useEffect(() => {
    if (map.current) return // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.5946, 12.9716], // Bangalore coordinates
      zoom: 1.7,
      projection: 'globe'
    })

    map.current.on('style.load', () => {
      map.current!.setFog({}) // globe effect
    })
  }, [])

  useEffect(() => {
    if (!tripDetailInfo || !map.current) return

    // Clear existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    // Add new markers from itinerary
    tripDetailInfo.itinerary?.forEach((day: any) => {
      day.activities?.forEach((activity: any) => {
        if (activity.geocoordinates) {
          const coordinates: [number, number] = [
            activity.geocoordinates.longitude,
            activity.geocoordinates.latitude
          ]

          const marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat(coordinates)
            .setPopup(
              new mapboxgl.Popup().setText(activity.placeName)
            )
            .addTo(map.current!)

          markers.current.push(marker)
        }
      })
    })

    // Fly to first marker location
    if (markers.current.length > 0) {
      const firstCoord = markers.current[0].getLngLat()
      map.current!.flyTo({
        center: [firstCoord.lng, firstCoord.lat],
        zoom: 7,
        essential: true
      })
    }
  }, [tripDetailInfo])

  return (
    <div className="w-full h-[85vh] rounded-3xl border-4 border-gray-200 shadow-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}
