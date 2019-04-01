class Config {

	private static Instance:Config;

	rectCount:number = 10;
	ballSpeed:number = 15;
	dir:Vector2 = new Vector2(0,1);
	pos:Vector2;
	level:number = 1;

	private constructor() {
	}

	public static getInstance():any
	{
		if(!Config.Instance)
		{
			Config.Instance = new Config();
		}
		return Config.Instance;
	}
}