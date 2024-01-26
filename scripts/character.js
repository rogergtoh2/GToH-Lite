'use strict';
class OnlinePlayer {
  constructor(img, x = 0, y = 0, user = 'err') {
    this.x = x;
    this.y = y;
    this.img = img;
    this.location = -2;
    this.cosmetics = [];
    this.user = user;
    this.userText = new Text(this.user, this.x + 15, this.y - 15, 12);
  }
  tick() {
    this.userText.x = this.x + 15;
    this.userText.y = this.y - 5;
    AddDrawQueue('text', this.userText);
  }
}

class Character {
  constructor(img, x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.yAccel = 0;
    this.xAccel = 0;
    this.wallJump = 0;
    this.canJump = false;
    this.speed = 5;
    this.jump = 15;
    this.pressLeft = false;
    this.pressUp = false;
    this.pressRight = false;
    this.pressDown = false;
    this.partInc = 0;
    this.disableGravity = false;
    this.disableTouch = false;
    this.noClip = false;
    this.width = 30;
    this.height = 30;
    this.gravityReversed = false;
  }



  async tick() {
    var nJump = false;
    var bounce = false;
    var newlvl = false;
    var statuses = [];
    function touch(plyr) {

      if (plyr.disableTouch) return false;

      for (let i of world) {
        if (i.type === 'red' && redActive < 2) continue;
        if (i.type === 'blue' && redActive > 1) continue;
        if (i.type === 'orange' && Ticker % 80 < 40) continue;
        if (i.type === 'purple' && Ticker % 80 >= 40) continue;
        if ((!i.tags.includes('nc') || i.type === 'music') && colliding(plyr.x, plyr.y, plyr.width, plyr.height, i.x, i.y, i.width, i.height)) {
          switch (i.type) {
            case 'music':
              if (i.tags[0] !== curSong) {
                prevSong = curSong;
                if (i.tags[0] === 'shop') {
                  ShopEnter();
                }
                if (i.tags[0] === 'main') {
                  ShopLeave();
                }
                curSong = i.tags[0];
              }
              break;
            case 'block':
              return true;
            case 'win':
              LevelWon = true;
              break;
            case 'portal':
              newlvl = i.tags[0];
              break;
            case 'key':
              if (levelFormat === 1) {
                if (!perLevel.includes(i.tags[0].slice(3))) {
                  perLevel.push(i.tags[0].slice(3));

                }
              } else {
                if (!perLevel.includes(i.tags[0]))
                  perLevel.push(i.tags[0]);
              }
              break;
            case 'door':
              if (levelFormat === 1) {
                if (!perLevel.includes(i.tags[0].slice(4)))
                  return true;
              } else {
                if (!perLevel.includes(i.tags[0]))
                  return true;
              }

              break;
            case 'bounce':
              bounce = 1;
              break;
            case 'dbounce':
              bounce = 2;
              break;
            case 'rbounce':
              if (!statuses.includes('rbounce'))
                statuses.push('rbounce');
              break;
            case 'lbounce':
              if (!statuses.includes('lbounce'))
                statuses.push('lbounce');
              break;
            case 'greverse':
              plyr.gravityReversed = true;
              break;
            case 'gnormal':
              plyr.gravityReversed = false;
              break;
            case 'ice':
              if (!statuses.includes('icy'))
                statuses.push('icy');
              prevTouchIcy = true;
              return true;
            case 'mud':
              if (!statuses.includes('mud')) {
                statuses.push('mud');
              }
              break;
            case 'rjump':
              if (!statuses.includes('rjump')) {
                statuses.push('rjump');
              }
              return true;
            case 'die':
              newlvl = WorldId;
              return true;
            case 'tp':
              plyr.x = i.tags[0];
              plyr.y = i.tags[1];
              return;
            case 'vine':
              break;
            case 'dirt':
              return true;
            case 'decor':
              if(i.tags[1] === false && i.tags.includes('moderatorTest')) {
                i.tags[1] = true;
                window.open('https://forms.gle/ckB88jTSwNdWwWXbA', '_blank');
              }
              break;
            case 'njump':
              nJump = true;
            default:
              return true;           
          }
        }
      }
    }
    
    const gravitySign = this.gravityDisabled ? 1 : (this.gravityReversed ? -1 : 1)

    //fly yAccel slowdown
    if (!this.pressUp && !this.pressDown && this.gravityDisabled)
      this.yAccel -= Math.sign(this.yAccel);

    //gravity go down
    if (!this.gravityDisabled || this.pressDown)
      this.yAccel += gravitySign

    //limit gravity
    if ((this.yAccel > 18 && !this.gravityReversed) || (this.yAccel < -18 && this.gravityReversed)) this.yAccel -= gravitySign;
    if (Math.abs(this.yAccel) > this.speed && this.gravityDisabled) this.yAccel = this.speed * Math.sign(this.yAccel);

    //for bounce blocks
    touch(this);
    if (bounce === 1)
      this.yAccel = -20;

    if (bounce === 2)
      this.yAccel = 20;
    if (statuses.includes('lbounce'))
      this.xAccel = -20;
    if (statuses.includes('rbounce'))
      this.xAccel = 20;

    //set y position
    this.y += this.yAccel;

    touch(this);
    if (statuses.includes('mud')) {
      this.yAccel = 0;
    }
    //xAccel slowdown
    if ((!this.pressRight && !this.pressLeft && (!prevTouchIcy || this.gravityDisabled)) || statuses.includes('mud')) {
      this.xAccel -= Math.sign(this.xAccel);
    }
    if (Math.abs(this.xAccel) > 30)
      this.xAccel = Math.sign(this.xAccel) * 30;
    //if touch floor move up
    /*
    if (this.y > myCanvas.height - this.img.height) {
      this.y = myCanvas.height - this.img.height;
      this.yAccel = 0;
      this.canJump = true;
    }
    */


    if (touch(this) && !this.noClip) {
      if ((this.yAccel > 0 && !this.gravityReversed) || (this.yAccel < 0 && this.gravityReversed) || statuses.includes('mud')) {
        if (!statuses.includes('rjump'))
          this.canJump = true;
        prevTouchIcy = false;
        for (let o = 0; o < 19; o++) {
          if (!touch(this)) break;
          this.y -= gravitySign;
          if (o === 18) {
            this.y += 19 * gravitySign;
            while (touch(this))
              this.y += gravitySign;
          }
        }
        if (this.yAccel > 16) {
          shakeX = (5 - Math.random() * 3) * Math.sign(Math.random() - 0.5);
          shakeY = (5 - Math.random() * 3) * Math.sign(Math.random() - 0.5);
          for (let i = 0; i < 7; i++) {
            worldParticle.push(new Particle(this.x + 10, this.y + 10, (Math.random() - 0.5) * 10, -Math.random() * 2 - 3, true, 40, 0.1));
          }
        }

      } else {
        for (let i = 0; i < 3; i++) {
          if (!touch(this)) break;
          this.x -= 1;
          if (i === 2) this.x += 3;
        }

        for (let i = 0; i < 3; i++) {
          if (!touch(this)) break;
          this.x += 1;
          if (i === 2) this.x -= 3;
        }

        while (touch(this)) this.y += gravitySign;
      }
      this.yAccel = 0;
    } //(touch(this, i))




    //no jump if fall
    if (this.yAccel * gravitySign > 3)
      this.canJump = false;

    //when key down move left/right + walljump
    if (this.wallJump === 0 || this.disableTouch) {
      this.xAccel += this.pressRight - this.pressLeft;
    }
    else
      this.wallJump--;

    //limit xAccel
    if (Math.abs(this.xAccel) > this.speed + ((statuses.includes('icy')) ? 3 : 0) - ((statuses.includes('mud')) ? 3 : 0)&& this.wallJump === 0) {
      this.xAccel -= Math.sign(this.xAccel);
    }

    //change x position based on Accel
    this.x += this.xAccel;
    if (!this.noClip && !this.disableTouch) {
      for (let i = 0; i < 14; i++) {
        if (!touch(this))
          break;
        this.y -= gravitySign;
        if (i === 13) {
          this.y += 14 * gravitySign;
          while (touch(this)) {
            this.x -= Math.sign(this.xAccel);
          }
          if (this.pressUp && Math.abs(this.xAccel) > 2) {
            if (this.wallJump < 3 && !nJump) {
              this.xAccel *= -1.2;
              this.xAccel = Math.round(this.xAccel);
              this.yAccel = this.jump / -1.5 * gravitySign;
              this.wallJump = 7;
            }
          } else
            this.xAccel = 0;
        }
      }

    }


    //particleStuff
    this.partInc++;
    if (Math.abs(this.xAccel) > 0 && this.canJump && this.partInc > (Math.random() * 10) + 42 - (8 * Math.abs(this.xAccel))) {
      this.partInc = 0;
      worldParticle.push(new Particle(this.x + 10, this.y + 25, -this.xAccel, Math.random() * -3 - 2, true, 25, 0.2, 5));
    }


    //jump
    if (!this.gravityDisabled) {

      if (this.pressUp && (this.canJump || statuses.includes('mud')) && !prevMudJump) {
        this.yAccel = -this.jump * gravitySign;
        this.canJump = false;
        if (statuses.includes('mud'))
          prevMudJump = true;
      }
      if (!this.pressUp) prevMudJump = false;

    } else if (this.pressUp)
      this.yAccel -= gravitySign;
    if (this.y > 1000) {
      if (IsBuilding) {
        CreateWorld({
          "format": 2,
          "spawn": spawnPos,
          "data": creatorBlocks
        }, false);
      } else
        CreateWorld(WorldId);
    }
    if (newlvl !== false) {
      if (newlvl === -1) {
        if (PlayTest) {
          CreateWorld(creatorBlocks, false);
        } else
        StartLevelCreator();
      } else {
        CreateWorld(newlvl);
      }
    }
  }


}
