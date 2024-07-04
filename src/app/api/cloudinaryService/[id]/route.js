import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const publicId = searchParams.get('public_id');

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { message: 'Missing Cloudinary credentials' },
      { status: 400 },
    );
  }

  if (!publicId) {
    return NextResponse.json(
      { message: 'Missing public_id parameter' },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/${publicId}`,
      {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      },
    );

    const image = {
      id: response.data.public_id,
      url: response.data.secure_url,
    };

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { message: error.message },
      { status: error.response.status },
    );
  }
}

export async function DELETE(request) {
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { message: 'Missing Cloudinary credentials' },
      { status: 400 },
    );
  }

  const { public_id } = await request.json();

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = crypto
    .createHash('sha256')
    .update(`public_id=${public_id}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        public_id: public_id,
        timestamp: timestamp,
        api_key: apiKey,
        signature: signature,
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { message: error.message },
      { status: error.response.status },
    );
  }
}
