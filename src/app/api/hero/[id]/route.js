import {PrismaClient} from '@prisma/client';
import {NextResponse} from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request, {params}) {
    const {id} = params;

    try {
        await prisma.hero.delete({
            where: {id: parseInt(id)},
        });

        return new Response(null, {status: 204}); // Respuesta vacía para el estado 204
    } catch (error) {
        console.error('Error deleting hero:', error.message);

        if (error.code === 'P2025') { // Prisma specific error for record not found
            return NextResponse.json(
                {error: 'hero not found'},
                {status: 404},
            );
        }

        return NextResponse.json(
            {error: 'Error deleting hero'},
            {status: 500},
        );
    }
}

export async function GET(request, {params}) {
    const {id} = params;

    try {
        const hero = await prisma.hero.findUnique({
            where: {id: parseInt(id)},
        });

        if (!hero) {
            return NextResponse.json({error: 'hero not found'}, {status: 404});
        } else {
            return NextResponse.json(hero, {status: 200});
        }
    } catch (error) {
        return NextResponse.json(
            {error: 'Error fetching hero'},
            {status: 500},
        );
    }
}

export async function PUT(request, {params}) {
    const {id} = params;
    const {title, description, imageUrl} = await request.json();

    try {
        const hero = await prisma.hero.update({
            where: {id: parseInt(id)},
            data: {
                title,
                description,
                imageUrl,
            },
        });

        return NextResponse.json(hero, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: 'Error updating hero'},
            {status: 500},
        );
    }
}
