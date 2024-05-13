const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function findAll(){
    const types = await prisma.type.findMany({})
    return types
}

async function find(id) {
    const type = await prisma.type.findUnique({
        where: {
            id: id,
        }
    })
    return type
}

async function create(datas){
    const type = await prisma.type.create({
        data: datas
    })
}

async function update(id, datas){
    const type = await prisma.type.update({
        data: datas,
        where: { id: id },
    })
}

async function remove(id){
    const type = await prisma.type.delete({
        where: { id: id },
    })
}



module.exports = {
    findAll,
    find,
    create,
    update,
    remove
};