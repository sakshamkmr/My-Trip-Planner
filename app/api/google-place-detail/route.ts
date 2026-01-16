import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const { placeName }: { placeName: string } = await request.json()
    
    const baseURL = 'https://places.googleapis.com/v1/places:searchText'
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACE_API_KEY!,
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
      }
    }
    
    const result = await axios.post(
      baseURL,
      {
        textQuery: placeName
      },
      config
    )
    const placeRefName = result?.data?.places[0]?.photos[0]?.name
    const photoURL = `https://places.googleapis.com/v1/${placeRefName}?key=${process.env.GOOGLE_PLACE_API_KEY!}`
    
    return NextResponse.json(photoURL)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
