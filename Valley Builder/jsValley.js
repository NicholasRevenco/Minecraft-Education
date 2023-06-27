//  valley function only works with a valley of a perameter set to 20
function pyramid(baesLength: number) {
    let pos1: Position;
    let pos2: Position;
    let orePos: Position;
    let chck: number;
    let fluidPos: Position;
    let mainBlocks = [GRASS, GRASS, GRASS, GRASS, GRANITE, COBBLESTONE, DIRT]
    let ore = [COAL_ORE, COAL_ORE, GOLD_ORE, EMERALD_ORE, DIAMOND_ORE]
    let height = 0
    let newLength = baesLength
    for (let i = 1; i < newLength - randint(0, 3); i++) {
        pos1 = pos(i, height, i)
        pos2 = pos(newLength, height, newLength - 1)
        blocks.fill(mainBlocks[randint(0, mainBlocks.length - 1)], pos1, pos2, FillOperation.Replace)
        for (let j = 0; j < randint(0, newLength); j++) {
            orePos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(ore[randint(0, ore.length - 1)], orePos)
        }
        chck = randint(1, 20)
        if ([1, 2, 3].indexOf(chck) >= 0) {
            fluidPos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(WATER, fluidPos)
        } else if (chck == 4) {
            fluidPos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(LAVA, fluidPos)
        }
        
        newLength -= 1
        height += 1
    }
}

player.onChat("valley", function valley(baseLength: number) {
    let posStart: Position;
    let xLoc: number;
    let yLoc: number;
    for (let i = 0; i < 5; i++) {
        posStart = player.position()
        xLoc = posStart.getValue(Axis.X)
        yLoc = posStart.getValue(Axis.Y)
        player.teleport(pos(baseLength - 10, 0, 0))
        pyramid(baseLength)
        player.teleport(pos(-15, 0, 8))
        pyramid(baseLength + randint(0, baseLength / 3))
        player.teleport(pos(baseLength - 10, 0, 0))
    }
})
