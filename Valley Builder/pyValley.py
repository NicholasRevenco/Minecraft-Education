# valley function only works with a valley of a perameter set to 20
def pyramid(baesLength):
    mainBlocks = [GRASS, GRASS, GRASS, GRASS, GRANITE, COBBLESTONE, DIRT]
    ore = [COAL_ORE, COAL_ORE, GOLD_ORE, EMERALD_ORE, DIAMOND_ORE]
    height = 0
    newLength = baesLength

    for i in range(1, newLength-randint(0, 3)):
        pos1 = pos(i, height, i)
        pos2 = pos(newLength, height, newLength-1)

        blocks.fill(mainBlocks[randint(0, len(mainBlocks)-1)], pos1, pos2, FillOperation.REPLACE)

        for j in range(randint(0, newLength)):
            orePos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(ore[randint(0, ore.length-1)], orePos)

        chck = randint(1, 20)
        if chck in (1, 2, 3):
            fluidPos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(WATER, fluidPos)
        elif chck == 4:
            fluidPos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(LAVA, fluidPos)

        newLength -= 1
        height += 1

def valley(baseLength):
    for i in range(0, 5):
        posStart = player.position()
        xLoc = posStart.get_value(Axis.X)
        yLoc = posStart.get_value(Axis.Y)
        player.teleport(pos(baseLength-10, 0, 0))
        pyramid(baseLength)
        player.teleport(pos(-15, 0, 8))
        pyramid(baseLength+randint(0, baseLength/3))
        player.teleport(pos(baseLength-10, 0, 0))

player.on_chat("valley", valley)