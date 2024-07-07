import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create a new offer
export async function POST(request) {
  const {
    title,
    subtitle,
    bannerUrl,
    firstParagraphTitle,
    firstParagraphDescription,
    firstParagraphImageUrl1,
    firstParagraphImageUrl2,
    secondParagraphTitle,
    secondParagraphDescription,
    secondParagraphImageUrl1,
    secondParagraphImageUrl2,
  } = await request.json();

  try {
    const offer = await prisma.offer.create({
      data: {
        title,
        subtitle,
        bannerUrl,
        firstParagraphTitle,
        firstParagraphDescription,
        firstParagraphImageUrl1,
        firstParagraphImageUrl2,
        secondParagraphTitle,
        secondParagraphDescription,
        secondParagraphImageUrl1,
        secondParagraphImageUrl2,
      },
    });
    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json(
        { error: 'Error creating offer' },
        { status: 500 },
    );
  }
}

// Get all offers
export async function GET() {
  try {
    const offers = await prisma.offer.findMany();
    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(
        { error: 'Error fetching offers' },
        { status: 500 },
    );
  }
}

