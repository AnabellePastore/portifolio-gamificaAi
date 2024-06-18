import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, hasOnInitialize, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { TiledMap } from "@excaliburjs/plugin-tiled";
import { Npc } from "../actors/npc";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

onInitialize(engine: Engine<any>): void {
    //ativar o modo de debug
    // engine.toggleDebug()

    //carregar musica de fundo BGM(background music)
    let musicafundo =  Resources.ritmadaBGM
    //configurar a musica e executar
    musicafundo.loop = true
    musicafundo.play(0.5)


    //carregar mapa
    let tileMap = Resources.Mapa

    //definir offsert para renderização do mapa
    let offsetX = 138
    let offsetY = 100
    //adcionar o mapa na cena
    tileMap.addToScene(this, {
        pos: vec(offsetX, offsetY),
    })

    //definir zoom da camera para aumentar um pouco a visualização
    this.camera.zoom= 1.4

    //carregar o spawpoint do player
    let spawnPoint =  tileMap.getObjectsByName("player_spawn") [0]

    //criação e configuração do player
    let Jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

    //fazer o jogador andar por cima 
    Jogador.z = 1

    //adicionar o player
    this.add(Jogador)

    //pegar spaw point dos npc
    let NpcSpawnPointA =  tileMap.getObjectsByName("npc_a")[0]
    let NpcSpawnPointB =  tileMap.getObjectsByName("npc_b")[0]
    let NpcSpawnPointC =  tileMap.getObjectsByName("npc_c")[0]

    //configurar os npc:
    let npcA = new Npc(
        vec(NpcSpawnPointA.x + offsetX,  NpcSpawnPointA.y + offsetY),
        Color.Blue,
        "npcA"
    )
    

    let npcB = new Npc(
        vec(NpcSpawnPointB.x + offsetX,  NpcSpawnPointB.y + offsetY),
        Color.Violet,
        "npcB"
    )

    let npcC = new Npc(
        vec(NpcSpawnPointC.x + offsetX,  NpcSpawnPointC.y + offsetY),
        Color.Yellow,
        "npcC"
    )

    //adcionar os npc
    this.add(npcA)
    this.add(npcB)
    this.add(npcC)

    //focar a camera no player
    this.camera.strategy.lockToActor(Jogador)

    //adicionar colisão com cada objeto
    //pegar a camada de objetos colisores
    let camadaObjetosColisores = tileMap.getObjectLayers("ObjetosColisores") [0]
    console.log (camadaObjetosColisores)

    //percorrer obejetos com foreach e para cada objeto, renderizar um actor
    camadaObjetosColisores.objects.forEach(objeto  => {
        const objetoAtual = new Actor({
            name: objeto.name,
            x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
            y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
            width: objeto.tiledObject.width,
            height: objeto.tiledObject.height,
            collisionType: CollisionType.Fixed
        })

        //adicionar o colisor do objeto na cena
        this.add(objetoAtual)
    })
}

}



