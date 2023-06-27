// TIP: DO NOT MOVE WHEN THE CONTENTS OF THE CAGE ARE BEING BUILT
agent.setItem(SEAGRASS, 64, 1)
agent.setItem(TUBE_CORAL_BLOCK, 64, 2)
// contents inside cage
function contents(vari: number, vari2: number, vari3: number) {
    let i: number;
    // teleport player to center of cage
    player.teleport(pos(vari / 2, 2, vari3 / 2))
    // put sea grass on the floor
    agent.setAssist(PLACE_ON_MOVE, true)
    agent.setSlot(1)
    for (i = 0; i < vari * 1.5; i++) {
        agent.teleport(pos(randint(-vari / 2 + 1, vari2 / 2 - 1), 0, randint(-vari / 2 + 1, vari2 / 2 - 1)), NORTH)
        agent.move(FORWARD, 1)
    }
    // spawn animals
    let animals = [SQUID, TROPICAL_FISH, SQUID, SEA_TURTLE]
    for (i = 0; i < vari; i++) {
        mobs.spawn(animals[randint(0, animals.length - 1)], pos(0, 0, 0))
    }
    agent.teleportToPlayer()
    agent.setAssist(PLACE_ON_MOVE, true)
    agent.setSlot(2)
    // build coral blocks
    for (i = 0; i < vari / 3; i++) {
        agent.move(FORWARD, 1)
        agent.move(FORWARD, 1)
        agent.move(FORWARD, 1)
        agent.move(UP, 1)
        agent.turn(RIGHT)
    }
}

// build cage
function cage(vari: number, vari2: number, vari3: number) {
    blocks.fill(GLASS, pos(0, 0, 0), pos(vari, vari2, vari3), FillOperation.Replace)
    blocks.fill(WATER, pos(1, 1, 1), pos(vari - 1, vari2, vari3 - 1), FillOperation.Replace)
    blocks.fill(SAND, pos(1, 1, 1), pos(vari - 1, 1, vari3 - 1), FillOperation.Replace)
}

// one function to call all functions
player.onChat("aquarium", function aquarium(vari: number, vari2: number, vari3: number) {
    cage(vari, vari2, vari3)
    contents(vari, vari2, vari3)
})
