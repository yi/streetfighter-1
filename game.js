 document.addEventListener('DOMContentLoaded', function(event) {
     //SPRITES ARRAY
     var movies = {};
     var textures = {};
     //LOAD SPRITESHEET
     var assetsToLoader = ['resources/ken.json', 'resources/shoryuken.json', 'resources/tatsumaki.json'];
     var loader = new PIXI.AssetLoader(assetsToLoader);
     loader.onComplete = onAssetsLoaded;
     loader.load();
     //CREATE STAGE
     var stage = new PIXI.Stage(0x000000, true);
     var renderer = PIXI.autoDetectRenderer(384, 224);
     document.body.appendChild(renderer.view);

     function onAssetsLoaded() {
         //---------------------------------
         // create a texture from an image path
         var texture = PIXI.Texture.fromImage('resources/background.png');
         var bgk = new PIXI.Sprite(texture);
         bgk.position.x = 0;
         bgk.position.y = 0;
         stage.addChild(bgk);
         //---------------------------------
         addMovie('stance', [5, 6, 7, 8], 'ken');
         addMovie('walk', [13, 15, 16, 17, 18], 'ken');
         addMovie('punch', [9, 10, 11], 'ken');
         addMovie('kick', [22, 23, 24, 25], 'ken');
         addMovie('roundhouse', [26, 27, 28, 29, 30], 'ken');
         addMovie('crouch', [37], 'ken');
         addMovie('jump', [31, 32, 33, 34, 35, 36], 'ken');
         addMovie('fireball', [12, 14], 'ken');
         addMovie('hadoken', [1, 2, 3, 4], 'ken');
         addMovie('shoryuken', [1, 2, 3, 4, 5, 6, 7]);
         addMovie('tatsumaki', [1, 2, 3, 4, 5, 6, 7]);
         //---------------------------------
         for (var key in movies) {
             var movie = movies[key];
             movie.anchor.x = 0;
             movie.anchor.y = 1;
             movie.visible = false;
             movie.position.x = 25;
             movie.position.y = 200;
             movie.animationSpeed = 10 / 60;
             movie.interactive = true;
             stage.addChild(movie);
         }
         //---------------------------------
         reset();
         //---------------------------------
         document.onkeydown = commands;
         document.onkeyup = commandsOneOff;

         movies.stance.tap = function(touchData) {
             movies.current.visible = false;
             movies.current.stop();
             console.log('TAP!', touchData);
             movies.current = movies.hadoken;
             movies.hadoken.gotoAndStop(0);
             movies.hadoken.loop = false;
             movies.hadoken.visible = true;
             movies.hadoken.play();
             // movies.hadoken.onComplete = reset;
         };
         //---------------------------------
         requestAnimFrame(animate);
     }

     function commands(event) {
         console.log('onkeydown event detected!', event);
         movies.current.visible = false;
         movies.current.stop();
         switch (event.keyIdentifier) {
             case 'Down':
                 movies.current = movies.crouch;
                 movies.crouch.loop = false;
                 movies.crouch.visible = true;
                 movies.crouch.play();
                 break;
             case 'Left':
                 movies.current = movies.walk;
                 movies.walk.direction = 0;
                 movies.walk.visible = true;
                 movies.walk.play();
                 break;
             case 'Right':
                 movies.current = movies.walk;
                 movies.walk.direction = 1;
                 movies.walk.visible = true;
                 movies.walk.play();
                 break;
             default:
                 movies.current.visible = true;
                 movies.current.play();
                 break;
         }
     }

     function commandsOneOff(event) {
         console.log('onkeyup event detected!', event);
         for (var key in movies) {
             var movie = movies[key];
             movie.stop();
             movie.visible = false;
             movie.position.x = movies.current.x;
             movie.position.y = movies.current.position.y;
         }
         switch (event.keyIdentifier) {
             case 'Down':
                 movies.crouch.visible = false;
                 movies.crouch.gotoAndStop(0);
                 reset();
                 break;
             case 'Up':
                 movies.current = movies.jump;
                 movies.jump.direction = 1;
                 movies.jump.loop = false;
                 movies.jump.visible = true;
                 movies.jump.play();
                 movies.jump.onComplete = reset;
                 break;
             case 'Left':
             case 'Right':
                 movies.crouch.visible = false;
                 movies.crouch.gotoAndStop(0);
                 reset();
                 break;
             case 'U+0050': //'p'
                 movies.current = movies.punch;
                 movies.punch.loop = false;
                 movies.punch.visible = true;
                 movies.punch.play();
                 movies.punch.onComplete = reset;
                 break;
             case 'U+004B': //'k'
                 movies.current = movies.kick;
                 movies.kick.loop = false;
                 movies.kick.visible = true;
                 movies.kick.play();
                 movies.kick.onComplete = reset;
                 break;
             case 'U+0052': //'r'
                 movies.current = movies.roundhouse;
                 movies.roundhouse.loop = false;
                 movies.roundhouse.visible = true;
                 movies.roundhouse.play();
                 movies.roundhouse.onComplete = reset;
                 break;
             case 'U+0048': //'h'
                 movies.current = movies.hadoken;
                 movies.hadoken.gotoAndStop(0);
                 movies.hadoken.loop = false;
                 movies.hadoken.visible = true;
                 movies.hadoken.play();
                 // movies.hadoken.onComplete = reset;
                 break;
             case 'U+0053': //'s'
                 movies.current = movies.shoryuken;
                 movies.shoryuken.loop = false;
                 movies.shoryuken.visible = true;
                 movies.shoryuken.play();
                 movies.shoryuken.onComplete = reset;
                 break;
             case 'U+0054': //'t'
                 movies.current = movies.tatsumaki;
                 movies.tatsumaki.loop = false;
                 movies.tatsumaki.visible = true;
                 movies.tatsumaki.play();
                 movies.tatsumaki.onComplete = reset;
                 break;
             default:
                 reset();
                 break;
         }
     }

     function reset() {
         movies.current = movies.current || movies.stance;
         //---
         movies.current.visible = false;
         movies.current.gotoAndStop(0);
         //---
         movies.current = movies.stance;
         movies.current.visible = true;
         movies.current.position.y = 200;
         movies.current.play();
     }

     function addMovie(key, frames, prefix) {
         textures[key] = [];
         prefix = prefix || key;
         for (var frame in frames) {
             textures[key].push(prefix + '_' + pad(frames[frame], 2) + '.png');
         }
         movies[key] = PIXI.MovieClip.fromFrames(textures[key]);
     }

     function animate() {
         requestAnimFrame(animate);
         if (movies.jump.visible) {
             if (movies.jump.position.y < 130 && movies.jump.direction === 1) {
                 movies.jump.direction = 0;
             }
             movies.jump.position.y += movies.jump.direction === 1 ? -4 : 4;
         }
         if (movies.walk.visible && movies.walk.direction === 1) {
             movies.walk.position.x += movies.walk.position.x >= (384 - movies.walk.width) / 2 ? 0 : 2;
         }
         if (movies.walk.visible && movies.walk.direction === 0) {
             movies.walk.position.x -= movies.walk.position.x <= 0 ? 0 : 2;
         }
         if (!movies.fireball.visible && movies.hadoken.visible && movies.hadoken.currentFrame === 2) {
             movies.fireball.position.y = movies.current.position.y - 35;
             movies.fireball.position.x = movies.current.position.x + 50;
             movies.fireball.visible = true;
             movies.fireball.play();
         }
         if (movies.fireball.visible) {
             movies.fireball.position.x += 5;
             if (movies.fireball.position.x >= 384 - movies.fireball.width) {
                 movies.fireball.visible = false;
                 movies.fireball.stop();
                 reset();
             }
         }
         renderer.render(stage);
     }

     function pad(num, size) {
         var s = '000000000' + num;
         return s.substr(s.length - size);
     }
 });