import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.fAQ.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error(error); // Log the actual error
    return NextResponse.json({ error: 'Error deleting FAQ' }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const faq = await prisma.fAQ.findUnique({
      where: { id: parseInt(id) },
    });

    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    } else {
      return NextResponse.json(faq, { status: 200 });
    }
  } catch (error) {
    console.error(error); // Log the actual error
    return NextResponse.json({ error: 'Error fetching FAQ' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { question, answer } = await request.json();

  try {
    const faq = await prisma.fAQ.update({
      where: { id: parseInt(id) },
      data: { question, answer },
    });

    return NextResponse.json(faq, { status: 200 });
  } catch (error) {
    console.error(error); // Log the actual error
    return NextResponse.json({ error: 'Error updating FAQ' }, { status: 500 });
  }
}
