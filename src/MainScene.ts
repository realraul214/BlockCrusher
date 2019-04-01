class MainScene extends eui.Component implements  eui.UIComponent {

	public GameName:eui.Label;
	public StartButton:eui.Image;
	public Player:eui.Image;
	public Ball:eui.Image;
	public Score:eui.Label;

	ballRect:egret.Rectangle
	playerRect:egret.Rectangle
	config:Config = Config.getInstance();
	left:boolean = true;
	up:boolean = true;
	right:boolean = true;
	scoreCount:number = 0;
	des:number =0;

	rectArr:Array<GameRect> = new Array<GameRect>();

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.GameName.visible = true;
		this.StartButton.visible = true;
		this.StartButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartGame,this);
	}

	StartGame()
	{
		this.GameName.visible = false;
		this.StartButton.visible = false
		this.CreatRect();
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,(e:egret.TouchEvent)=>{this.Player.x = e.stageX},this);
		this.ballRect = this.Ball.getBounds();
		this.playerRect = this.Player.getBounds();
		this.addEventListener(egret.Event.ENTER_FRAME,this.BallAction,this);
		this.config.pos = new Vector2(0,0);
	}

	BallAction()
	{
		this.ballRect.x = this.Ball.x;
		this.ballRect.y = this.Ball.y;
		this.playerRect.x = this.Player.x;
		this.playerRect.y = this.Player.y;
		if(this.ballRect.intersects(this.playerRect))		
		{
			let point:Vector2 = new Vector2(this.Player.x + this.Player.width/2,this.Player.y + this.Player.height/2);
			this.config.dir = Vector2.Direction(point,new Vector2(this.Ball.x,this.Ball.y));
			this.config.pos.x = this.Ball.x;
			this.config.pos.y = this.Ball.y;
			this.left = true;
			this.up = true;
			this.right = true;
		}
		if(this.Ball.x <= 0 && this.left)
		{
			this.left = false;
			this.up = true;
			this.right = true;
			let point:Vector2 = new Vector2(this.Ball.x,this.Ball.y);
			this.config.dir = Vector2.Direction(point,this.config.pos);
			this.config.dir.y -= this.config.dir.y*2;
			this.config.pos.x = this.Ball.x;
			this.config.pos.y = this.Ball.y;
			
		}
		if(this.Ball.x >= this.width-this.ballRect.width && this.right)
		{
			this.left = true;
			this.up = true;
			this.right = false;
			let point:Vector2 = new Vector2(this.Ball.x,this.Ball.y);
			this.config.dir = Vector2.Direction(point,this.config.pos);
			this.config.dir.y -= this.config.dir.y*2;
			this.config.pos.x = this.Ball.x;
			this.config.pos.y = this.Ball.y;
			console.log(this.config.dir)
		}
		if(this.Ball.y <= 0 && this.up)
		{
			this.left = true;
			this.up = false;
			this.right = true;
			let point:Vector2 = new Vector2(this.Ball.x,this.Ball.y);
			this.config.dir = Vector2.Direction(point,this.config.pos);
			console.log(this.config.dir)
			this.config.dir.x -= this.config.dir.x*2;
			console.log(this.config.dir)
			this.config.pos.x = this.Ball.x;
			this.config.pos.y = this.Ball.y;
		}
		for(var i=0;i<this.rectArr.length;i++)
		{
			if(this.rectArr[i].currentState != "destory")
			{
				let objectRect:egret.Rectangle = this.rectArr[i].getBounds();
				objectRect.x = this.rectArr[i].x;
				objectRect.y = this.rectArr[i].y;
				if(this.ballRect.intersects(objectRect))
				{
					let point:Vector2 = new Vector2(this.Ball.x,this.Ball.y);
					this.config.dir = Vector2.Direction(point,this.config.pos);
					if(this.Ball.x <= this.rectArr[i].x + this.rectArr[i].width && this.Ball.x >= this.rectArr[i].x)
					{
						this.config.dir.x -= this.config.dir.x*2;
					}
					else
					{
						this.config.dir.y -= this.config.dir.y*2;
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
		let ballpoint:Vector2 = Vector2.MoveForDir(this.Ball.x,this.Ball.y,this.config.dir,this.config.ballSpeed);
		this.Ball.x = ballpoint.x;
		this.Ball.y = ballpoint.y;
		console.log(new Vector2(this.Ball.x,this.Ball.y));
	}

	CreatRect()
	{
		for(var i=0;i<this.config.rectCount;i++)
		{
			let rect:GameRect = new GameRect();
			this.addChild(rect);
			rect.x = i*64;
			rect.y = 150;

			this.rectArr.push(rect);
		}
	}

	GetScore()
	{
		let count:number = 1*this.config.level;
		this.scoreCount += count;
		this.Score.text = this.scoreCount.toString();
		
		this.des += 1;

		if(this.des == 10)
		{
			this.config.level += 1;
			this.config.ballSpeed += 5;
			this.CreatRect();

			this.des = 0;
		}
	}
	
}