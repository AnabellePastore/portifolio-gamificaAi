import { Actor, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor{
    //propriedades do player
    private velocidade: number = 180




    //configuraçao do player
    constructor(){
        super({
            pos: vec(650, 650),
            width: 32,
            height: 32,
            name:"Jogador",
            color: Color.Red,
        })
    }

    onInitialize(engine: Engine<any>): void {
        //configurar player para monitorar evento "hold" -> segurar tecla
        engine.input.keyboard.on("hold", (event) => {
            //detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left :
                case Keys.A:
                    //mover para a esquerda
                    //define a velocidade x para negativa, que significa movimentar o player para a esqueda
                    this.vel.x = -this.velocidade
                    break;
            

                case Keys.Right :
                case Keys.D:
                    //mover para a direita
                    //define a velocidade x para positiva, que significa movimentar o player para a direita
                    this.vel.x = this.velocidade
                    break;


                case Keys.Up :
                case Keys.W:
                     //mover para cima
                     //define a velocidade y para negativa, que significa movimentar o player para  cima
                    this.vel.y = -this.velocidade
                    break;

                case Keys.Down :
                case Keys.S:
                    //mover para baixo
                    //define a velocidade y para positiva que significa movimentar o player para baixo
                    this.vel.y = this.velocidade
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
        })
    }
}