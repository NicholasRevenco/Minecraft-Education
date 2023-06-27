//  parameter one of the call function should be the width of the building
//  parameter two fo the call function should be the height of the building
agent.setItem(PILLAR_QUARTZ_BLOCK, 64, 1)
agent.setItem(GLASS_PANE, 64, 2)
agent.setItem(QUARTZ_SLAB, 64, 3)
//  remember to add blocks to Agent's inventory
function agentBuildWall(howLong: any) {
    for (let i = 0; i < howLong; i++) {
        agent.move(FORWARD, 1)
    }
}

function agentBuildSquare(howLong: number) {
    for (let x = 0; x < 4; x++) {
        for (let i = 0; i < howLong - 1; i++) {
            agent.move(FORWARD, 1)
        }
        agent.turn(TurnDirection.Right)
    }
}

//  building builder
//  roof function
function agentBuildRoof(howLong: number) {
    agent.setSlot(3)
    for (let j = 0; j < howLong; j++) {
        for (let i = 0; i < howLong - 1; i++) {
            agent.move(FORWARD, 1)
        }
        if (j % 2 == 1) {
            agent.turn(TurnDirection.Left)
            agent.move(FORWARD, 1)
            agent.turn(TurnDirection.Left)
        } else {
            agent.turn(TurnDirection.Right)
            agent.move(FORWARD, 1)
            agent.turn(TurnDirection.Right)
        }
        
    }
}

player.onChat("building", function agentBuildRoom(howLong: number, howHigh: any) {
    agent.teleport(pos(5, 5, 0), WEST)
    //  using agentBuildSquare function, create as many squares as we want for a room
    for (let h = 0; h < howHigh; h++) {
        if (h % 2 == 1) {
            agent.setSlot(1)
        } else {
            agent.setSlot(2)
        }
        
        agentBuildSquare(howLong)
        agent.move(UP, 1)
        agent.setAssist(PLACE_ON_MOVE, false)
        agent.move(LEFT, 1)
        agent.setAssist(PLACE_ON_MOVE, true)
    }
    agentBuildRoof(howLong)
})
