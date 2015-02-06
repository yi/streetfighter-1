    // create a renderer instance.
    renderer = PIXI.autoDetectRenderer(800, 600);

    // Listen for mouse events on canvas
    renderer.view.addEventListener("mousedown", mouseDownHandler, true);
    renderer.view.addEventListener("mousemove", mouseDownHandler, true);
    renderer.view.addEventListener("mouseup", mouseUpHandler, true);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0xAAAAAA);

    var texture = PIXI.Texture.fromImage("assets/greenblob.png")
      .baseTexture;
    var size = 80;
    var allDirections = [];
    var tempTexture;
    var currentAnimation;
    var isMouseDown = false;
    for (var i = 0; i < 8; i++) {
      var animationTextures = [];
      for (var j = 0; j < 8; j++) {
        tempTexture = new PIXI.Texture(texture, {
          x: j * size,
          y: i * size,
          width: size,
          height: size
        });
        PIXI.TextureCache[(i * 8) + j] = tempTexture;
        animationTextures.push(tempTexture);
      };
      var oneWayAnimation = new PIXI.MovieClip(animationTextures);
      oneWayAnimation.stop();
      oneWayAnimation.visible = false;
      if (i == 7) {
        oneWayAnimation.stop();
        oneWayAnimation.visible = true;
        currentAnimation = oneWayAnimation;

      }
      oneWayAnimation.position.x = 400 - 40;
      oneWayAnimation.position.y = 300 - 40;
      stage.addChild(oneWayAnimation);
      allDirections.push(oneWayAnimation)
    };

    // start animating
    requestAnimFrame(animate);

    var framesPerSecond = 12;
    var msPerFrame = 1000 / framesPerSecond;
    var walkCycleFrameCount = 8;
    var dirIndex = 1;

    function animate() {
      var animationAgeInMs = new Date()
        .getTime();
      if (isMouseDown)
        currentAnimation.gotoAndStop((Math.floor(animationAgeInMs / msPerFrame) % walkCycleFrameCount));

      renderer.render(stage);
      requestAnimFrame(animate);
    }

    function mouseDownHandler(e) {
      if (e.type == "mousedown")
        isMouseDown = true;

      if (!isMouseDown)
        return;

      var angle = Math.atan2((e.offsetX - currentAnimation.position.x - 40), (e.offsetY - currentAnimation.position.y - 40));
      //console.log("delta["+angle+"]: " + (e.offsetX - currentAnimation.position.x - 40) + "/" + (e.offsetY - currentAnimation.position.y - 40));

      if (angle < 0.4 && angle > -0.4)
        dirIndex = 3; // looking down
      else if (angle < -0.4 && angle > -1.2)
        dirIndex = 4; // bottom left
      else if (angle < -1.2 && angle > -2.0)
        dirIndex = 5; // left
      else if (angle < -2.0 && angle > -2.8)
        dirIndex = 6; // top left
      else if ((angle < -2.8 && angle > -3.2) || (angle < 3.2 && angle > 2.8))
        dirIndex = 7; // up
      else if (angle < 2.8 && angle > 2.0)
        dirIndex = 8; // right top
      else if (angle < 2.0 && angle > 1.2)
        dirIndex = 1; // right
      else if (angle < 1.2 && angle > 0.4)
        dirIndex = 2; // right bottom

      currentAnimation.stop();
      currentAnimation.visible = false;
      currentAnimation = allDirections[dirIndex - 1];
      currentAnimation.visible = true;
      e.preventDefault();
    }

    function mouseUpHandler(e) {
      isMouseDown = false;
      e.preventDefault();
    }