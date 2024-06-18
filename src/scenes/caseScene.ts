import { Actor, Color, Engine, FadeInOut, Resource, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Npc } from "../actors/npc";
import { Resources } from "../resources";

export class caseScene extends Scene {
    elementoTexto?: HTMLElement
    npcImagem?: Actor

    private objetoInteracao: any


    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        this.elementoTexto = document.createElement("div") as HTMLElement

        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        //adicionar classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-case1")

        
        
    }


    onActivate(context: SceneActivationContext<unknown>): void {
        //pegar dados vindos da cena passada
        this.objetoInteracao = context.data




        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            //carregando a imagem
            let NpcFalandoImg = Resources.NpcFalandoImg.toSprite()
            NpcFalandoImg.scale = vec(0.7, 0.7)

            //criacao do actoe para a imagem
            let actorNpcFalandoImg = new Actor({
                pos: vec(300, engine.halfCanvasHeight)

            })
            NpcFalandoImg.graphics.add(NpcFalandoImg)

            this.add(actorNpcFalandoImg)



            this.elementoTexto.innerHTML = `<h2>disperdício zero!</h2>
            <p>Nossa empresa criou uma alternativa para o disperdício alimentício de uma escola no interior 
            de São Paulo de forma divertida e interativa com as crianças. O projeto foi a implementação de um sistema de recompensas 
            conforme a proporção de comida que essas crianças pegavam comparado com o quanto comiam:
            Quanto maior a sequência de dias que essa criança passava sem levar nenhuma comida ao lixo, mais pontos a mesma ganhava,
            criando assim, um rankin de sucesso  de maneira saudável e consciente ente os alunos.`


        }
    }



}