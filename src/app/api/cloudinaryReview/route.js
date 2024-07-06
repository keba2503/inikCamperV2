import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export async function GET() {
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { message: 'Missing Cloudinary credentials' },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
      {
        params: {
          type: 'upload',
          prefix: 'inikcamper/review/',
        },
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      },
    );

    const images = response.data.resources.map((resource) => ({
      id: resource.public_id,
      url: resource.secure_url,
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
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

  if (!public_id) {
    return NextResponse.json(
        { message: 'Missing public_id parameter' },
        { status: 400 },
    );
  }

  console.log(`Attempting to delete image with public_id: ${public_id}`);

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

    console.log(`Cloudinary response: ${JSON.stringify(response.data)}`);

    if (response.data.result !== 'ok') {
      throw new Error('Error deleting image from Cloudinary');
    }

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
        { message: `Error deleting image: ${error.message}` },
        { status: error.response ? error.response.status : 500 },
    );
  }
}