import { Color, Engine, FadeInOut, Scene, Transition, hasOnInitialize, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

onInitialize(engine: Engine<any>): void {
    //carregar mapa
    let tileMap = Resources.Mapa

    //definir offsert para renderização do mapa
    let offsetX = 138
    let offsetY = 100
    //adcionar o mapa na cena
    tileMap.addToScene(this, {
        pos: vec(offsetX, offsetY),
    })

    //deinirzoom da camera para aumentar um pouco a visualização
    this.camera.zoom= 1.2

    //criação e configuração do player
    let Jogador = new Player()

    //fazer o jogador andar por cima 
    Jogador.z = 1

    //adicionar o player
    this.add(Jogador)
}

}



