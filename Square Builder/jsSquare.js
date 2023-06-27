player.onChat("run", function on_on_chat() {
    
})
player.onChat("agent", function summonAgent() {
    player.say("Agent come over here!")
    agent.teleportToPlayer()
})
player.onChat("wall", function agentBuildWall(howLong: any) {
    agent.setSlot(1)
    for (let i = 0; i < howLong; i++) {
        agent.setAssist(PLACE_ON_MOVE, true)
        agent.move(FORWARD, 1)
    }
})
player.onChat("square", function agentBuildSquare(howLong: any) {
    agent.setSlot(1)
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < howLong; i++) {
            agent.setAssist(PLACE_ON_MOVE, true)
            agent.move(FORWARD, 1)
        }
        agent.turn(TurnDirection.Left)
    }
})
