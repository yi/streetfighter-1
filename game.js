 document.addEventListener('DOMContentLoaded', function(event) {

   //SPRITES ARRAY
   var movies = {};
   var textures = {};
   var loop = 1,
     direction = 'forward';

   var framesPerSecond = 12.5;
   var msPerFrame = 1000 / framesPerSecond;
   var dirIndex = 1;

   //LOAD SPRITESHEET
   var assetsToLoader = ['resources/ken.json', 'resources/shoryuken.json', 'resources/tatsumaki.json'];
   loader = new PIXI.AssetLoader(assetsToLoader);
   loader.onComplete = onAssetsLoaded;
   loader.load();

   //CREATE STAGE
   var stage = new PIXI.Stage(0x000000);
   renderer = PIXI.autoDetectRenderer(800, 600);
   document.body.appendChild(renderer.view);

   function onAssetsLoaded() {

     //---------------------------------

     textures.stance = [];
     for (var i = 1; i <= 7; i++) {
       textures.stance.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.stance = PIXI.MovieClip.fromFrames(textures.stance);

     //---------------------------------

     textures.punch = [];
     for (var i = 1; i <= 7; i++) {
       textures.punch.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.punch = PIXI.MovieClip.fromFrames(textures.punch);

     //---------------------------------

     textures.walk = [];
     for (var i = 1; i <= 7; i++) {
       textures.walk.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.walk = PIXI.MovieClip.fromFrames(textures.walk);

     //---------------------------------

     textures.kick = [];
     for (var i = 1; i <= 7; i++) {
       textures.kick.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.kick = PIXI.MovieClip.fromFrames(textures.kick);

     //---------------------------------

     textures.roundhouse = [];
     for (var i = 1; i <= 7; i++) {
       textures.roundhouse.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.roundhouse = PIXI.MovieClip.fromFrames(textures.roundhouse);

     //---------------------------------

     textures.crouch = [];
     for (var i = 1; i <= 7; i++) {
       textures.crouch.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.crouch = PIXI.MovieClip.fromFrames(textures.crouch);


     //---------------------------------

     textures.jump = [];
     for (var i = 1; i <= 7; i++) {
       textures.jump.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.jump = PIXI.MovieClip.fromFrames(textures.jump);

     //---------------------------------

     textures.fireball = [];
     for (var i = 1; i <= 7; i++) {
       textures.fireball.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.fireball = PIXI.MovieClip.fromFrames(textures.fireball);

     //---------------------------------

     textures.hadoken = [];
     for (var i = 1; i <= 7; i++) {
       textures.hadoken.push('ken' + '_' + pad(i, 2) + '.png');
     }
     movies.hadoken = PIXI.MovieClip.fromFrames(textures.hadoken);


     //---------------------------------

     textures.shoryuken = [];
     for (var i = 1; i <= 7; i++) {
       textures.shoryuken.push('shoryuken' + pad(i, 2) + '_' + pad(i, 2) + '.png');
     }
     movies.shoryuken = PIXI.MovieClip.fromFrames(textures.shoryuken);

     //---------------------------------

     textures.tatsumaki = [];
     for (var i = 1; i <= 7; i++) {
       textures.tatsumaki.push('tatsumaki' + pad(i, 2) + '_' + pad(i, 2) + '.png');
     }
     movies.tatsumaki = PIXI.MovieClip.fromFrames(textures.tatsumaki);

     //---------------------------------

     for (var key in movies) {
       var movie = movies[key];
       movie.anchor.x = 0.5;
       movie.anchor.y = 0.5;
       movie.position.x = 400;
       movie.position.y = 300;
       // movie.scale.x *= 2;
       // movie.scale.y *= 2;
       movie.stop();
       stage.addChild(movie);
     }

     //---------------------------------

     requestAnimFrame(animate);
   }

   function animate() {
     requestAnimFrame(animate);

     var animationAgeInMs = new Date().getTime();


     for (var key in movies) {
       var movie = movies[key];
       //var frame = (Math.floor(animationAgeInMs / msPerFrame) % textures[movie].length);
       // movie.gotoAndStop(frame);
        // movie.play();
     }


     // shoryuken.gotoAndStop(Math.floor(animationAgeInMs / msPerFrame) % textures.shoryuken.length);
     // //shoryuken.position.y -= 0.5;

     // tatsumaki.gotoAndStop((Math.floor(animationAgeInMs / msPerFrame) % textures.tatsumaki.length));
     // //tatsumaki.position.x -= 0.5;

     renderer.render(stage);
   }

   function pad(num, size) {
     var s = '000000000' + num;
     return s.substr(s.length - size);
   }

 });