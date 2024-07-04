import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  const { id } = params;

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

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const guide = await prisma.guide.findUnique({
      where: { id: parseInt(id) },
    });

    if (!guide) {
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    } else {
      return NextResponse.json(guide, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching guide' },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
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
