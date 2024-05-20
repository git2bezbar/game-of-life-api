const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

  const deletedTypes = await prisma.type.deleteMany({})

  const types = await prisma.type.createMany({
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
  })
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
