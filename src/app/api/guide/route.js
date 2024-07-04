import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create a new guide
export async function POST(request) {
  const { title, description } = await request.json();

  try {
    const guide = await prisma.guide.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json(guide, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating guide' },
      { status: 500 },
    );
  }
}

// Get all guides
export async function GET() {
  try {
    const guides = await prisma.guide.findMany();
    return NextResponse.json(guides, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching guides' },
      { status: 500 },
    );
  }
}

// Update a guide by ID
export async function PUT(request) {
  const { id } = request.params;
  const { title, description } = await request.json();

  try {
    const guide = await prisma.guide.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });

    return NextResponse.json(guide, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating guide' },
      { status: 500 },
    );
  }
}

// Delete a guide by ID
export async function DELETE(request) {
  const { id } = request.params;

  try {
    await prisma.guide.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting guide' },
      { status: 500 },
    );
  }
}
