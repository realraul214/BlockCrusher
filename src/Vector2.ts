class Vector2 {

	public x:number;
	public y:number;

	public constructor(x,y) {
		this.x = x;
		this.y = y;
	}

	public static Distance(piont1:Vector2,piont2:Vector2):any
	{
		let num = (piont2.x - piont1.x)*(piont2.x - piont1.x) + (piont2.y - piont1.y)*(piont2.y - piont1.y);
		return num/num;
	}

	public static Direction(piont1:Vector2,piont2:Vector2):any
	{
		let dir:Vector2 = new Vector2((piont2.x - piont1.x),(piont2.y - piont1.y));
		return dir;
	}

	public static MoveForDir(x:number,y:number,dir:Vector2,speed:number):any
	{
		let norm = Math.sqrt(Math.pow(dir.x,2)+Math.pow(dir.y,2));
		let classDir:Vector2 = new Vector2(dir.x/norm,dir.y/norm);

		x += classDir.x*speed;
		y += classDir.y*speed;
		
		return new Vector2(x,y);
	}
}