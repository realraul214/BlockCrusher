var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.Distance = function (piont1, piont2) {
        var num = (piont2.x - piont1.x) * (piont2.x - piont1.x) + (piont2.y - piont1.y) * (piont2.y - piont1.y);
        return num / num;
    };
    Vector2.Direction = function (piont1, piont2) {
        var dir = new Vector2((piont2.x - piont1.x), (piont2.y - piont1.y));
        return dir;
    };
    Vector2.MoveForDir = function (x, y, dir, speed) {
        var norm = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));
        var classDir = new Vector2(dir.x / norm, dir.y / norm);
        x += classDir.x * speed;
        y += classDir.y * speed;
        return new Vector2(x, y);
    };
    return Vector2;
}());
__reflect(Vector2.prototype, "Vector2");
