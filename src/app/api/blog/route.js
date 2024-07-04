import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create a new blog
export async function POST(request) {
  const { title, description, article, coverImageUrl, bodyImageUrl } = await request.json();

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        article,
        coverImageUrl,
        bodyImageUrl,
      },
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error creating blog' },
        { status: 500 },
    );
  }
}

// Get all blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
        { error: 'Error fetching blogs' },
        { status: 500 },
    );
  }
}

// Update a blog by ID
export async function PUT(request) {
  const { id } = request.params;
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

// Delete a blog by ID
export async function DELETE(request) {
  const { id } = request.params;

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
