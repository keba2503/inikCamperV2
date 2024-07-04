import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create a new config
export async function POST(request) {
  const { scope_id, title, subtitle, description, additional_text } =
    await request.json();

  try {
    const config = await prisma.config.create({
      data: {
        scope_id,
        title,
        subtitle,
        description,
        additional_text,
      },
    });
    return NextResponse.json(config, { status: 201 });
  } catch (error) {
    console.error('Error creating config:', error); // Log the error
    return NextResponse.json(
      { error: 'Error creating config' },
      { status: 500 },
    );
  }
}

// Get all configs
export async function GET() {
  try {
    const configs = await prisma.config.findMany();
    return NextResponse.json(configs, { status: 200 });
  } catch (error) {
    console.error('Error fetching configs:', error); // Log the error
    return NextResponse.json(
      { error: 'Error fetching configs' },
      { status: 500 },
    );
  }
}

// Update a config by ID
export async function PUT(request) {
  const { id } = request.params;
  const { scope_id, title, subtitle, description, additional_text } =
    await request.json();

  try {
    const config = await prisma.config.update({
      where: { id: parseInt(id) },
      data: {
        scope_id,
        title,
        subtitle,
        description,
        additional_text,
      },
    });

    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error('Error updating config:', error); // Log the error
    return NextResponse.json(
      { error: 'Error updating config' },
      { status: 500 },
    );
  }
}

// Delete a config by ID
export async function DELETE(request) {
  const { id } = request.params;

  try {
    await prisma.config.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error deleting config:', error); // Log the error
    return NextResponse.json(
      { error: 'Error deleting config' },
      { status: 500 },
    );
  }
}
