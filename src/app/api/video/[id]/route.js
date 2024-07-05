import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.video.delete({
      where: { id: parseInt(id) },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting video:', error.message);

    if (error.code === 'P2025') { // Prisma specific error for record not found
      return NextResponse.json(
          { error: 'video not found' },
          { status: 404 },
      );
    }

    return NextResponse.json(
        { error: 'Error deleting video' },
        { status: 500 },
    );
  }
}export async function GET(request, { params }) {
  const { id } = params;

  try {
    const video = await prisma.video.findUnique({
      where: { id: parseInt(id) },
    });

    if (!video) {
      return NextResponse.json({ error: 'video not found' }, { status: 404 });
    } else {
      return NextResponse.json(video, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
        { error: 'Error fetching video' },
        { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, thumbnail } = await request.json();

  try {
    const video = await prisma.video.update({
      where: { id: parseInt(id) },
      data: {
        title,
        thumbnail,
      },
    });

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error updating video' },
        { status: 500 },
    );
  }
}
