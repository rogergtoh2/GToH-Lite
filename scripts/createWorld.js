function CreateBlocks(x, y, type = 'block', length = 1, height = 1, extraTags = [], oImg = null) {
  let blockSize = 30;
  if (type === 'text') {
    worldText.push(new Text(extraTags[0], x + 15, y + extraTags[1], extraTags[1]))
  } else {
   if (type === 'small') {
    blockSize = 5;
  }
  for (let w = 0; w < length; w++) {
    for (let h = 0; h < height; h++) {
      world.push(new Block(type, x + (w * blockSize), y + (h * blockSize), extraTags, oImg));
    }
  }
}
}
function CreateWorld(id, useID = true) {
  RecentTower = WorldId;
  if (useID)
    WorldId = id;
  else
    WorldId = -1;
  
  if (useID && id < 1) {
    LobbyWorld = id;
    Replaying = false;
    if (TasMode) {
      TasMode = false;
      removeEventListener('keydown', keyHandle);
      GAME = setInterval(GameTick, 25);
    }
  }

  world = [];
  worldText = [];
  worldParticle = [];
  perLevel = [];

  let lvl;
  if (useID)
    lvl = lvlData[id];
  else {
    if (Array.isArray(id)) {
    lvl = {"format": 2, "spawn": [150, 60], "data": id};
    
    }
    else {
    lvl = id;
    }
  }
    
  if ("format" in lvl) {
    levelFormat = lvl.format;
  } else 
    levelFormat = 1;
  for (let i = 0; i < lvl.data.length; i++) {
    CreateBlocks(...lvl.data[i]);
  }
  if ("music" in lvl) {
    setSong(lvl.music);
  }
  if (id === -2) {
    const o = [-500, 1000];
    worldText.push(new Text('CUBE OF PRELOADING', o[0], o[1]-25, 20));
    for (let i = 0; i < 10; i++) {
      CreateBlocks(o[0] + i * 5, o[1]+1 , 'key', 1, 1, [i]);
      CreateBlocks(o[0] + i * 5, o[1], 'door', 1, 1, [i]);
    }
    
    //worldText.push(new Text('tab to see players online', 670, -120, 12));
    //worldText.push(new Text('L to set username', 670, -100, 12));
    //worldText.push(new Text('/ for console', 670, -80, 12));
    worldText.push(new Text('GToH Expanded 0.4.0', 670, -40, 12));
    //worldText.push(new Text('Coming March 19...', 360, -320, 12));
    world.push(new AnimatedBlock(635, -320, 'portalgreyanim.png',
  }
  Player = new Character(PlayerSkin);
  Player.x = lvl.spawn[0];
  Player.y = lvl.spawn[1];
  camX = Player.x - (myCanvas.width / camZ) / 2;
  camY = Player.y;
  Player.yAccel = -3;
  Player.xAccel = 0;
  Player.canJump = true;
  Player.wallJump = 0;
  if (LobbyWorld !== WorldId) {
    Timer = 0;
    if (!Replaying) {
    ReplayKeys = [WorldId];
    ReplayPos = [WorldId];
    }
  }
  Ticker = 0;
  redActive = 1;
  if (!TasMode && !Replaying)
    cheatsEnabled = false;
  startTime = Date.now();
}
