import { NextResponse } from 'next/server';
import axios from 'axios';

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

  let allImages = [];
  let nextCursor = null;

  try {
    do {
      const response = await axios.get(
          `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
          {
            params: {
              type: 'upload',
              prefix: 'inikcamper/review/',
              max_results: 500, // Aquí especificamos hasta 500 resultados por solicitud
              next_cursor: nextCursor,
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

      allImages = allImages.concat(images);
      nextCursor = response.data.next_cursor;

    } while (nextCursor);

    return NextResponse.json(allImages);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
        { message: error.message },
        { status: error.response ? error.response.status : 500 },
    );
  }
}
