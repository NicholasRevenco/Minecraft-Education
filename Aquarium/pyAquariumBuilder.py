#TIP: DO NOT MOVE WHEN THE CONTENTS OF THE CAGE ARE BEING BUILT

agent.set_item(SEAGRASS, 64, 1)
agent.set_item(TUBE_CORAL_BLOCK, 64, 2)

#contents inside cage
def contents(vari, vari2, vari3):
    #teleport player to center of cage
    player.teleport(pos(vari/2, 2, vari3/2))

    #put sea grass on the floor
    agent.set_assist(PLACE_ON_MOVE, True)
    agent.set_slot(1)
    for i in range(vari*1.5):
        agent.teleport(pos(randint(-vari/2+1, vari2/2-1), 0, randint(-vari/2+1, vari2/2-1)), NORTH)
        agent.move(FORWARD, 1)

    #spawn animals
    animals = [SQUID, TROPICAL_FISH, SQUID, SEA_TURTLE]
    for i in range(vari):
        mobs.spawn(animals[randint(0, len(animals)-1)], pos(0, 0, 0))
    agent.teleport_to_player()
    agent.set_assist(PLACE_ON_MOVE, True)
    agent.set_slot(2)

    #build coral blocks
    for i in range(vari/3):
        agent.move(FORWARD, 1)
        agent.move(FORWARD, 1)
        agent.move(FORWARD, 1)
        agent.move(UP, 1)
        agent.turn(RIGHT)
        
 #build cage
def cage(vari, vari2, vari3):
    blocks.fill(GLASS, pos(0, 0, 0), pos(vari, vari2, vari3), FillOperation.REPLACE)
    blocks.fill(WATER, pos(1, 1, 1), pos(vari-1, vari2, vari3-1), FillOperation.REPLACE)
    blocks.fill(SAND, pos(1, 1, 1), pos(vari-1, 1, vari3-1), FillOperation.REPLACE)

#one function to call all functions
def aquarium(vari, vari2, vari3):
    cage(vari, vari2, vari3)
    contents(vari, vari2, vari3)

player.on_chat("aquarium", aquarium)
