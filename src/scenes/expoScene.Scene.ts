import { Color, Engine, FadeInOut, Scene, Transition, hasOnInitialize } from "excalibur";
import { Resources } from "../resources";

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

    //adcionar o mapa na cena
    tileMap.addToScene(this)
}

}



