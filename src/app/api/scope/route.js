import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const scopes = await prisma.scope.findMany();
    return NextResponse.json(scopes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching scopes' },
      { status: 500 },
    );
  }
}
