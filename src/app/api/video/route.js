import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create a new video
export async function POST(request) {
  const { id, title, thumbnail } = await request.json();

  try {
    const video = await prisma.video.create({
      data: {
        id,
        title,
        thumbnail,
      },
    });
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error creating video' },
        { status: 500 },
    );
  }
}

// Get all videos
export async function GET() {
  try {
    const videos = await prisma.video.findMany();
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error fetching videos' },
        { status: 500 },
    );
  }
}

// Update a video by ID
export async function PUT(request) {
  const { id } = await request.json();
  const { title, thumbnail } = await request.json();

  try {
    const video = await prisma.video.update({
      where: { id },
      data: { title, thumbnail },
    });

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error updating video' },
        { status: 500 },
    );
  }
}

// Delete a video by ID
export async function DELETE(request) {
  const { id } = await request.json();

  try {
    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error deleting video' },
        { status: 500 },
    );
  }
}
