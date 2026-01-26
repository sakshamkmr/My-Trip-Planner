'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTripDetail } from '@/context/TripDetailContext'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!

export default function GlobalMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])

  const { tripDetailInfo } = useTripDetail()

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.5946, 12.9716],
      zoom: 1.7,
      projection: 'globe'
    })

    map.current.on('style.load', () => {
      map.current!.setFog({})
    })
  }, [])

  useEffect(() => {
    if (!tripDetailInfo || !map.current) return

    markers.current.forEach(marker => marker.remove())
    markers.current = []

    tripDetailInfo.itinerary?.forEach((day: any) => {
      day.activities?.forEach((activity: any) => {

        if (!activity.geo_coordinates) return

        const coordinates: [number, number] = [
          activity.geo_coordinates.longitude,
          activity.geo_coordinates.latitude
        ]

        const marker = new mapboxgl.Marker({ color: 'red' })
          .setLngLat(coordinates)
          .setPopup(
            new mapboxgl.Popup().setText(activity.place_name)
          )
          .addTo(map.current!)

        markers.current.push(marker)
      })
    })

    if (markers.current.length > 0) {
      const first = markers.current[0].getLngLat()
      map.current!.flyTo({
        center: [first.lng, first.lat],
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
