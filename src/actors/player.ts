import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor{
    //propriedades do player
    private velocidade: number = 180
    private ultimaDirecao: string = "donw"

    private temObjetoProximo: boolean= false
    private ultimoColisor?: Collider 




    //configuraçao do player
    constructor(posicao: Vector){
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name:"Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
        //configurar spritesheet do player
        const PlayerSpriteSheet = SpriteSheet.fromImageSource({
           image: Resources.PlayerSpriteSheet,
           grid: {
            spriteWidth: 32,
            spriteHeight: 64,
            columns: 56,
            rows: 20
           },
           spacing: {
            originOffset: {
                y: 0
            }
           }
        })

        //criar as animações
        const duracaoFrameAnimacao = 70
        //animações idle
        //idle esquerda
        const leftIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12, 1)},
                { graphic: PlayerSpriteSheet.getSprite(13, 1)},
                { graphic: PlayerSpriteSheet.getSprite(14, 1)},
                { graphic: PlayerSpriteSheet.getSprite(15, 1)},
                { graphic: PlayerSpriteSheet.getSprite(16, 1)},
                { graphic: PlayerSpriteSheet.getSprite(17, 1)}
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-idle",leftIdle)
        

        //idle direita
        const rightIdle = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(0,1) },
                {graphic: PlayerSpriteSheet.getSprite(1,1) },
                {graphic: PlayerSpriteSheet.getSprite(2,1) },
                {graphic: PlayerSpriteSheet.getSprite(3,1) },
                {graphic: PlayerSpriteSheet.getSprite(4,1) },
                {graphic: PlayerSpriteSheet.getSprite(5,1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-idle", rightIdle)


        //idle frente
        const upIdle = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(6,1) },
                {graphic: PlayerSpriteSheet.getSprite(7,1) },
                {graphic: PlayerSpriteSheet.getSprite(8,1) },
                {graphic: PlayerSpriteSheet.getSprite(9,1) },
                {graphic: PlayerSpriteSheet.getSprite(10,1) },
                {graphic: PlayerSpriteSheet.getSprite(11,1) },
                ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-idle", upIdle)

        //idle tras
        const donwIdle = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(18,1) },
                {graphic: PlayerSpriteSheet.getSprite(19,1) },
                {graphic: PlayerSpriteSheet.getSprite(20,1) },
                {graphic: PlayerSpriteSheet.getSprite(21,1) },
                {graphic: PlayerSpriteSheet.getSprite(22,1) },
                {graphic: PlayerSpriteSheet.getSprite(23,1) },

               
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-idle", donwIdle)

        //definir animação inicial do player
        this.graphics.use("up-idle")

        //animaçoes walk
        //andar para a esquerda
        const leftWalk = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(12, 2) },
                {graphic: PlayerSpriteSheet.getSprite(13, 2) },
                {graphic: PlayerSpriteSheet.getSprite(14, 2) },
                {graphic: PlayerSpriteSheet.getSprite(15, 2) },
                {graphic: PlayerSpriteSheet.getSprite(16, 2) },
                {graphic: PlayerSpriteSheet.getSprite(17, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-walk", leftWalk)

        //andar para a direita
        const rightWalk = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(0, 2) },
                {graphic: PlayerSpriteSheet.getSprite(1, 2) },
                {graphic: PlayerSpriteSheet.getSprite(2, 2) },
                {graphic: PlayerSpriteSheet.getSprite(3, 2) },
                {graphic: PlayerSpriteSheet.getSprite(4, 2) },
                {graphic: PlayerSpriteSheet.getSprite(5, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-walk", rightWalk)

        //andar para cima
        const UpWalk = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(6, 2) },
                {graphic: PlayerSpriteSheet.getSprite(7, 2) },
                {graphic: PlayerSpriteSheet.getSprite(8, 2) },
                {graphic: PlayerSpriteSheet.getSprite(9, 2) },
                {graphic: PlayerSpriteSheet.getSprite(10, 2) },
                {graphic: PlayerSpriteSheet.getSprite(11, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-walk", UpWalk)


        //andar para baixo
        const DownWalk = new Animation({
            frames: [
                {graphic: PlayerSpriteSheet.getSprite(18, 2) },
                {graphic: PlayerSpriteSheet.getSprite(19, 2) },
                {graphic: PlayerSpriteSheet.getSprite(20, 2) },
                {graphic: PlayerSpriteSheet.getSprite(21, 2) },
                {graphic: PlayerSpriteSheet.getSprite(22, 2) },
                {graphic: PlayerSpriteSheet.getSprite(23, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-walk", DownWalk)
        

        //configurar player para monitorar evento "hold" -> segurar tecla
        engine.input.keyboard.on("hold", (event) => {
            //detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left :
                case Keys.A:
                    //mover para a esquerda
                    //define a velocidade x para negativa, que significa movimentar o player para a esquerda
                    this.vel.x = -this.velocidade


                    
                    //definir animação
                    this.graphics.use("left-walk")
                   
                    //guardar ultima direção
                    this.ultimaDirecao = "left"


                    break;

            

                case Keys.Right :
                case Keys.D:
                    //mover para a direita
                    //define a velocidade x para positiva, que significa movimentar o player para a direita
                    this.vel.x = this.velocidade

                     //definir animação
                     this.graphics.use("right-walk")
                    
                    //guardar ultima direção
                    this.ultimaDirecao = "right"

                    break;


                case Keys.Up :
                case Keys.W:
                     //mover para cima
                     //define a velocidade y para negativa, que significa movimentar o player para  cima
                    this.vel.y = -this.velocidade

                     //definir animação
                     this.graphics.use("up-walk")
                    
                    //guardar ultima direção
                    this.ultimaDirecao = "up"

                    break;

                case Keys.Down :
                case Keys.S:
                    //mover para baixo
                    //define a velocidade y para positiva que significa movimentar o player para baixo
                    this.vel.y = this.velocidade

                     //definir animação
                     this.graphics.use("down-walk")
                  
                    //guardar ultima direção
                    this.ultimaDirecao = "down"

                    break;    



            
                default:
                    //zera a velocidade do player, e para a movimentação
                    this.vel.x = 0
                    this.vel.y = 0

                 break;






            }
        })

    


        //configurar o player para monitorar o evento "release" -> soltar
        engine.input.keyboard.on("release", (event) => {
            //fazer o player parar ao soltar as teclas de movimentação
            //parar a movimentação lateral ao soltar as teclas de movimentção lateral
            if(
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ){
                //zerar velocidade horizontal
                this.vel.x = 0
            }

            //parar movimentação vertical ao soltar as teclas de movimentação lateral
            if(
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ){
                //para zerar a velocidade vertical
                this.vel.y = 0
            }

            //ao parar o player, definir animação idle da ultima direção
            if (this.vel.x == 0 && this.vel.y == 0) {
                this.graphics.use(this.ultimaDirecao + "-idle")
                
            }
        })
    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        //indicar que tem um objeto proximo
        this.temObjetoProximo = true

        //registrar o ultimo objeto coliddo
        this.ultimoColisor =  other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        //detectar se o player está distante do último objeto colidido
    if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 42) {
        //marcar que o objet nçao está próximo
        this.temObjetoProximo = false
        console.log("está longe")
    }
    }
}