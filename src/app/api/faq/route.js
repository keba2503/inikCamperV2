import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create a new guide
export async function POST(request) {
  const { question, answer } = await request.json();

  try {
    const FAQ = await prisma.FAQ.create({
      data: {
        question,
        answer,
      },
    });
    return NextResponse.json(FAQ, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating faq' }, { status: 500 });
  }
}

// Get all guides
export async function GET() {
  try {
    const faqs = await prisma.FAQ.findMany();
    return NextResponse.json(faqs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching faqs' }, { status: 500 });
  }
}

// Get a guide by ID
// Update a guide by ID
export async function PUT(request) {
  const { id } = request.params;
  const { question, answer } = await request.json();

  try {
    const FAQ = await prisma.FAQ.update({
      where: { id: parseInt(id) },
      data: { question, answer },
    });

    return NextResponse.json(FAQ, { status: 200 });
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
    await prisma.FAQ.delete({
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
