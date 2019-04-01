var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
        this.rectCount = 10;
        this.ballSpeed = 15;
        this.dir = new Vector2(0, 1);
        this.level = 1;
    }
    Config.getInstance = function () {
        if (!Config.Instance) {
            Config.Instance = new Config();
        }
        return Config.Instance;
    };
    return Config;
}());
__reflect(Config.prototype, "Config");
