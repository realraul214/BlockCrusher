var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this.config = Config.getInstance();
        _this.left = true;
        _this.up = true;
        _this.right = true;
        _this.scoreCount = 0;
        _this.des = 0;
        _this.rectArr = new Array();
        return _this;
    }
    MainScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.GameName.visible = true;
        this.StartButton.visible = true;
        this.StartButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StartGame, this);
    };
    MainScene.prototype.StartGame = function () {
        var _this = this;
        this.GameName.visible = false;
        this.StartButton.visible = false;
        this.CreatRect();
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) { _this.Player.x = e.stageX; }, this);
        this.ballRect = this.Ball.getBounds();
        this.playerRect = this.Player.getBounds();
        this.addEventListener(egret.Event.ENTER_FRAME, this.BallAction, this);
        this.config.pos = new Vector2(0, 0);
    };
    MainScene.prototype.BallAction = function () {
        this.ballRect.x = this.Ball.x;
        this.ballRect.y = this.Ball.y;
        this.playerRect.x = this.Player.x;
        this.playerRect.y = this.Player.y;
        if (this.ballRect.intersects(this.playerRect)) {
            var point = new Vector2(this.Player.x + this.Player.width / 2, this.Player.y + this.Player.height / 2);
            this.config.dir = Vector2.Direction(point, new Vector2(this.Ball.x, this.Ball.y));
            this.config.pos.x = this.Ball.x;
            this.config.pos.y = this.Ball.y;
            this.left = true;
            this.up = true;
            this.right = true;
        }
        if (this.Ball.x <= 0 && this.left) {
            this.left = false;
            this.up = true;
            this.right = true;
            var point = new Vector2(this.Ball.x, this.Ball.y);
            this.config.dir = Vector2.Direction(point, this.config.pos);
            this.config.dir.y -= this.config.dir.y * 2;
            this.config.pos.x = this.Ball.x;
            this.config.pos.y = this.Ball.y;
        }
        if (this.Ball.x >= this.width - this.ballRect.width && this.right) {
            this.left = true;
            this.up = true;
            this.right = false;
            var point = new Vector2(this.Ball.x, this.Ball.y);
            this.config.dir = Vector2.Direction(point, this.config.pos);
            this.config.dir.y -= this.config.dir.y * 2;
            this.config.pos.x = this.Ball.x;
            this.config.pos.y = this.Ball.y;
            console.log(this.config.dir);
        }
        if (this.Ball.y <= 0 && this.up) {
            this.left = true;
            this.up = false;
            this.right = true;
            var point = new Vector2(this.Ball.x, this.Ball.y);
            this.config.dir = Vector2.Direction(point, this.config.pos);
            console.log(this.config.dir);
            this.config.dir.x -= this.config.dir.x * 2;
            console.log(this.config.dir);
            this.config.pos.x = this.Ball.x;
            this.config.pos.y = this.Ball.y;
        }
        for (var i = 0; i < this.rectArr.length; i++) {
            if (this.rectArr[i].currentState != "destory") {
                var objectRect = this.rectArr[i].getBounds();
                objectRect.x = this.rectArr[i].x;
                objectRect.y = this.rectArr[i].y;
                if (this.ballRect.intersects(objectRect)) {
                    var point = new Vector2(this.Ball.x, this.Ball.y);
                    this.config.dir = Vector2.Direction(point, this.config.pos);
                    if (this.Ball.x <= this.rectArr[i].x + this.rectArr[i].width && this.Ball.x >= this.rectArr[i].x) {
                        this.config.dir.x -= this.config.dir.x * 2;
                    }
                    else {
                        this.config.dir.y -= this.config.dir.y * 2;
                    }
                    this.config.pos.x = this.Ball.x;
                    this.config.pos.y = this.Ball.y;
                    //this.removeChild(this.rectArr[i]);
                    this.rectArr[i].currentState = "destory";
                    this.GetScore();
                    this.left = true;
                    this.up = true;
                    this.right = true;
                    break;
                }
            }
        }
        var ballpoint = Vector2.MoveForDir(this.Ball.x, this.Ball.y, this.config.dir, this.config.ballSpeed);
        this.Ball.x = ballpoint.x;
        this.Ball.y = ballpoint.y;
        console.log(new Vector2(this.Ball.x, this.Ball.y));
    };
    MainScene.prototype.CreatRect = function () {
        for (var i = 0; i < this.config.rectCount; i++) {
            var rect = new GameRect();
            this.addChild(rect);
            rect.x = i * 64;
            rect.y = 150;
            this.rectArr.push(rect);
        }
    };
    MainScene.prototype.GetScore = function () {
        var count = 1 * this.config.level;
        this.scoreCount += count;
        this.Score.text = this.scoreCount.toString();
        this.des += 1;
        if (this.des == 10) {
            this.config.level += 1;
            this.config.ballSpeed += 5;
            this.CreatRect();
            this.des = 0;
        }
    };
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene", ["eui.UIComponent", "egret.DisplayObject"]);
