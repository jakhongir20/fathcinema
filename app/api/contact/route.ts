import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const url = process.env.GOOGLE_SHEET_URL

    if (!url) {
      return NextResponse.json(
        { error: 'Sheet URL not configured' },
        { status: 500 }
      )
    }

    const params = new URLSearchParams({
      name: body.name || '',
      company: body.company || '',
      position: body.position || '',
      phone: body.phone || '',
    })

    const res = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
    })

    const text = await res.text()
    console.log('Google Script response:', res.status, text)

    return NextResponse.json({ status: 'success' })
  } catch (err) {
    console.error('Google Script error:', err)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
