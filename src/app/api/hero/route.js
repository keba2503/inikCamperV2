import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create a new hero
export async function POST(request) {
    const { title, subtitle, description, imageUrl } = await request.json();

    try {
        const hero = await prisma.hero.create({
            data: {
                title,
                subtitle,
                description,
                imageUrl,
            },
        });
        return NextResponse.json(hero, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error creating hero' },
            { status: 500 },
        );
    }
}

// Get all heroes
export async function GET() {
    try {
        const heroes = await prisma.hero.findMany();
        return NextResponse.json(heroes, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching heroes' },
            { status: 500 },
        );
    }
}

// Update a hero by ID
export async function PUT(request) {
    const { id } = request.params;
    const { title, subtitle, description, imageUrl } = await request.json();

    try {
        const hero = await prisma.hero.update({
            where: { id: parseInt(id) },
            data: {
                title,
                subtitle,
                description,
                imageUrl,
            },
        });

        return NextResponse.json(hero, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error updating hero' },
            { status: 500 },
        );
    }
}

// Delete a hero by ID
export async function DELETE(request) {
    const { id } = request.params;

    try {
        await prisma.hero.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error deleting hero' },
            { status: 500 },
        );
    }
}
