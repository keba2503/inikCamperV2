import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Obtener un config por ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const config = await prisma.config.findUnique({
      where: { id: parseInt(id) },
    });

    if (!config) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    }

    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json(
      { error: 'Error fetching config' },
      { status: 500 },
    );
  }
}

// Actualizar un config por ID
export async function PUT(request, { params }) {
  const { id } = params;
  const { scope_id, title, subtitle, description, additional_text } =
    await request.json();

  try {
    const config = await prisma.config.update({
      where: { id: parseInt(id) },
      data: {
        scope_id: parseInt(scope_id, 10),
        title,
        subtitle,
        description,
        additional_text,
      },
    });

    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json(
      { error: 'Error updating config' },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const existingConfig = await prisma.config.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingConfig) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    }

    await prisma.config.delete({
      where: { id: parseInt(id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting config:', error);
    return NextResponse.json(
      { error: 'Error deleting config' },
      { status: 500 },
    );
  }
}
