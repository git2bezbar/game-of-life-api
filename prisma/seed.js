const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  await prisma.type.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.config.deleteMany({})

  await prisma.user.createMany({
    data: [
      {
        username: "leonardPaillet",
        name: "Léonard",
        email: "leonard@paillet.dev",
        password: "leonardPaillet"
      },
      { 
        username: "romainVache",
        name: "Romain",
        email: "romain@vache.dev",
        password: "romainVache"
      },
      {
        username: "julienAuger",
        name: "Julien",
        email: "julien@auger.dev",
        password: "julienAuger"
      },
      {
        username: "ademDuran",
        name: "Adem",
        email: "adem@duran.dev",
        password: "ademDuran"
      },
    ]
  });
  
  await prisma.type.createMany({
    data: [
      { 
        name: 'Guns',
        description: 'A gun is a stationary pattern that emits spaceships (or rakes) repeatedly forever.'
      },
      { 
        name: 'Oscillators',
        description: 'An oscillator is a pattern that is a predecessor of itself. That is, it is a pattern that repeats itself after a fixed number of generations (known as its period).' 
      },
      {
        name: 'Still life',
        description: 'A still life (or stable pattern) is a pattern that does not change from one generation to the next, and thus may be thought of as an oscillator with period 1.'
      },
      {
        name: 'Spaceships',
        description: 'A spaceship is a finite pattern that reappears (without additions or losses) after a fixed number of generations displaced by a non-zero amount.'
      },
    ],
  });

  await prisma.config.createMany({
    data: [
      {
        name: 'Glider',
        bounding_box_x: 3,
        bounding_box_y: 3,
        pixels: '000010010111000',
        typeId: 4,
      },
      {
        name: 'Blinker',
        bounding_box_x: 3,
        bounding_box_y: 3,
        pixels: '000000111000000',
        typeId: 2,
      },
      {
        name: 'Block',
        bounding_box_x: 2,
        bounding_box_y: 2,
        pixels: '0011',
        typeId: 3,
      },
      {
        name: 'LWSS',
        bounding_box_x: 5,
        bounding_box_y: 4,
        pixels: '000010000100001100011',
        typeId: 4,
      },
    ],
  });
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
