import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Elimina una oferta por su ID
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.offer.delete({
      where: { id: parseInt(id) },
    });

    return new Response(null, { status: 204 }); // Empty response for status 204
  } catch (error) {
    console.error('Error deleting review:', error.message);

    if (error.code === 'P2025') { // Prisma specific error for record not found
      return NextResponse.json(
          { error: 'Review not found' },
          { status: 404 },
      );
    }

    return NextResponse.json(
        { error: 'Error deleting review' },
        { status: 500 },
    );
  }
}

// Obtiene una oferta por su ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const offer = await prisma.offer.findUnique({
      where: { id: parseInt(id) },
    });

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    } else {
      return NextResponse.json(offer, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching offer:', error);
    return NextResponse.json(
        { error: 'Error fetching offer' },
        { status: 500 },
    );
  }
}

// Actualiza una oferta por su ID
export async function PUT(request, { params }) {
  const { id } = params;
  const {
    title,
    subtitle,
    bannerUrl,
    firstParagraphTitle,
    firstParagraphDescription,
    firstParagraphImageUrl1,
    firstParagraphImageUrl2,
    secondParagraphTitle,
    secondParagraphDescription,
    secondParagraphImageUrl1,
    secondParagraphImageUrl2,
  } = await request.json();

  try {
    const offer = await prisma.offer.update({
      where: { id: parseInt(id) },
      data: {
        title,
        subtitle,
        bannerUrl,
        firstParagraphTitle,
        firstParagraphDescription,
        firstParagraphImageUrl1,
        firstParagraphImageUrl2,
        secondParagraphTitle,
        secondParagraphDescription,
        secondParagraphImageUrl1,
        secondParagraphImageUrl2,
      },
    });

    return NextResponse.json(offer, { status: 200 });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json(
        { error: 'Error updating offer' },
        { status: 500 },
    );
  }
}
