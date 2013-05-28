//set main namespace
goog.provide('benchmark');

// get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.animation.MoveBy');
goog.require('lime.transitions.Dissolve');
goog.require('benchmark.Button');
goog.require('benchmark.Help');

// constant iPad size
benchmark.WIDTH = 720;
benchmark.HEIGHT = 1004;

// entrypoint
benchmark.start = function() {
	benchmark.director = new lime.Director(document.body, benchmark.WIDTH,
			benchmark.HEIGHT);
	benchmark.director.makeMobileWebAppCapable();
	//benchmark.director.setDisplayFPS(false);

	benchmark.loadMenu();
};

/**
 * Different modes
 * 
 * @enum {number}
 */
benchmark.Mode = {
	CLASSIC : 0,
	TIMED : 1
};

// load menu scene
benchmark.loadMenu = function() {
	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(benchmark.WIDTH / 2, 0);
	if (benchmark.isBrokenChrome())
		layer.setRenderer(lime.Renderer.CANVAS);
	scene.appendChild(layer);

	// var title = new
	// lime.Sprite().setFill('assets/main_title.png').setPosition(0, 290);
	// title.qualityRenderer = true;
	// layer.appendChild(title);
	var msg = new lime.Label().setText('hello!').setFontColor(
	'black').setFontSize(24).setPosition(0, 300);
	layer.appendChild(msg);

	var menu = new lime.Layer().setPosition(0, 500);
	layer.appendChild(menu);
	var moveLeft = new lime.animation.MoveBy(-benchmark.WIDTH, 0)
			.setDuration(0.2).enableOptimizations();
	var moveRight = new lime.animation.MoveBy(benchmark.WIDTH, 0)
			.setDuration(0.2).enableOptimizations();

	var btns1 = new lime.Layer().setPosition(0, 0);
	menu.appendChild(btns1);

	btn = benchmark.makeButton('Test Multi-touch').setPosition(0, 100);
	goog.events.listen(btn, 'click', function(e) {
	        menu.runAction(moveRight);
	});
	btns1.appendChild(btn);

	var btn = benchmark.makeButton('Test Sprite').setPosition(0, 200);
	goog.events.listen(btn, 'click', function(e) {
		menu.runAction(moveLeft);
	});
	btns1.appendChild(btn);

	btn = benchmark.makeButton('Help').setPosition(0, 300);
	goog.events.listen(btn, 'click', function(e) {
		benchmark.loadHelpScene();
	});
	btns1.appendChild(btn);

	btn = benchmark.makeButton('Dummy').setPosition(0, 400);
	goog.events.listen(btn, 'click', function(e) {
		msg.setText('dummy');
	});
	btns1.appendChild(btn);

	// second area that will slide in
	var btns2 = new lime.Layer().setPosition(benchmark.WIDTH, 0);
	menu.appendChild(btns2);

	var lbl = new lime.Label().setText('Select sprite number:').setFontColor(
			'#fff').setFontSize(24).setPosition(0, 20);
	btns2.appendChild(lbl);

	btn = benchmark.makeButton('5 x 5').setPosition(0, 100);
	goog.events.listen(btn, 'click', function() {
		// benchmark.testSprite(5,5);
	});
	btns2.appendChild(btn);

	btn = benchmark.makeButton('10 x 10').setPosition(0, 200);
	goog.events.listen(btn, 'click', function() {
		// benchmark.testSprite(10,10);
	});
	btns2.appendChild(btn);

	btn = benchmark.makeButton('20 x 20').setPosition(0, 300);
	goog.events.listen(btn, 'click', function() {
		// benchmark.testSprite(20,20);
	});
	btns2.appendChild(btn);

	btn = benchmark.makeButton('Back').setPosition(0, 400);
	goog.events.listen(btn, [ 'mousedown', 'touchstart' ], function() {
		menu.runAction(moveRight);
	});
	btns2.appendChild(btn);

	// second area that will slide in
	var btns3 = new lime.Layer().setPosition(-benchmark.WIDTH, 0);
	menu.appendChild(btns3);

	var lbl = new lime.Label().setText('Select touches:').setFontColor('#fff')
			.setFontSize(24).setPosition(0, 20);
	btns3.appendChild(lbl);

	btn = benchmark.makeButton('3 fingers').setPosition(0, 100);
	goog.events.listen(btn, 'click', function() {
		// benchmark.testTouch(3);
	});
	btns3.appendChild(btn);

	btn = benchmark.makeButton('4 fingers').setPosition(0, 200);
	goog.events.listen(btn, 'click', function() {
		// benchmark.testTouch(4);
	});
	btns3.appendChild(btn);

	btn = benchmark.makeButton('5 fingers').setPosition(0, 300);
	goog.events.listen(btn, 'click', function() {
		// benchmark.testTouch(5);
	});
	btns3.appendChild(btn);

	btn = benchmark.makeButton('Back').setPosition(0, 400);
	goog.events.listen(btn, [ 'mousedown', 'touchstart' ], function() {
		menu.runAction(moveLeft);
	});
	btns3.appendChild(btn);

	// set current scene active
	benchmark.director.replaceScene(scene, lime.transitions.Dissolve);
};

// helper for same size buttons
benchmark.makeButton = function(text) {
	var btn = new benchmark.Button(text).setSize(300, 90);
	return btn;
};

benchmark.isBrokenChrome = function() {
	return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
};

// load new help scene
benchmark.loadHelpScene = function() {
	var scene = new benchmark.Help();
	benchmark.director.replaceScene(scene, lime.transitions.Dissolve);
};

// this is required for outside access after code is compiled in
// ADVANCED_COMPILATIONS mode
goog.exportSymbol('benchmark.start', benchmark.start);
