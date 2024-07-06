import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';

const prisma = new PrismaClient();

// Create a new review
export async function POST(request) {
    const {username, comment, rating, product, avatarUrl} = await request.json();

    try {
        const review = await prisma.review.create({
            data: {
                username,
                comment,
                rating,
                product,
                avatarUrl,
            },
        });
        return NextResponse.json(review, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {error: 'Error creating review'},
            {status: 500}
        );
    }
}

// Get all reviews
export async function GET() {
    try {
        const reviews = await prisma.review.findMany();
        return NextResponse.json(reviews, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: 'Error fetching reviews'},
            {status: 500},
        );
    }
}

