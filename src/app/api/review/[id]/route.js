import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Delete a review by ID
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.review.delete({
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

// Get a review by ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    } else {
      return NextResponse.json(review, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
        { error: 'Error fetching review' },
        { status: 500 },
    );
  }
}

// Update a review by ID
export async function PUT(request, { params }) {
  const { id } = params;
  const { username, comment, rating, product, avatarUrl } = await request.json();

  try {
    const review = await prisma.review.update({
      where: { id: parseInt(id) },
      data: {
        username,
        comment,
        rating,
        product,
        avatarUrl,
      },
    });

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error updating review' },
        { status: 500 },
    );
  }
}
