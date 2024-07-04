import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.blog.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error deleting blog' },
        { status: 500 },
    );
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    } else {
      return NextResponse.json(blog, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
        { error: 'Error fetching blog' },
        { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description, article, coverImageUrl, bodyImageUrl } = await request.json();

  try {
    const blog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        article,
        coverImageUrl,
        bodyImageUrl
      },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error updating blog' },
        { status: 500 },
    );
  }
}
