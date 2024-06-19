import {  Actor, Color, Engine, FadeInOut, Keys,  Scene, SceneActivationContext, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";


export class caseScene extends Scene {
      
    private objetoInteracao: any
    private elementoTexto?: HTMLElement
    private actorimgnpc?: Actor

    private listaImagens?: Sprite[]



    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        //criar elemento com descrição do case
        this.elementoTexto = document.createElement("div") as HTMLElement
        this.elementoTexto.classList.add("texto-case")
       
        //adcionar elemento ao container game
        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementoTexto)

        //ao pressionar esc volta paraa exposição
        this.input.keyboard.on("press", (event) =>{
            if (event.key == Keys.Esc)  {
                engine.goToScene("exposicao")
                
            }
        })


        //criar actorpara receber a imagem
        this.actorimgnpc = new Actor({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight - 50)
        })

        //carregar imagens dos npc
        let imagemNpc1 = Resources.NpcFalandoImg1.toSprite()
        let imagemNpc2 = Resources.NpcFalandoImg2.toSprite()
        let imagemNpc3 = Resources.NpcFalandoImg3.toSprite()

        this.listaImagens = [imagemNpc1,imagemNpc2, imagemNpc3 ]
    }


    onActivate(context: SceneActivationContext<unknown>): void {
        //faz a caixa de texto aparecer ao chegar na cena
        this.elementoTexto!.style.opacity = "1"
        
        
        //pegar dados vindos da cena passada
        this.objetoInteracao = context.data

        if (this.objetoInteracao.nomeDoActor ==  "mesa_stand_a"){
            //mesa a detectada
            this.elementoTexto!.innerHTML = `<h2>disperdício zero!</h2>
                 <p>Nossa empresa criou uma alternativa para o disperdício alimentício de uma escola no interior 
                 de São Paulo de forma divertida e interativa com as crianças. O projeto foi a implementação de um sistema de recompensas 
                 conforme a proporção de comida que essas crianças pegavam comparado com o quanto comiam:
                 Quanto maior a sequência de dias que essa criança passava sem levar nenhuma comida ao lixo, mais pontos a mesma ganhava,
                 criando assim, um rankin de sucesso  de maneira saudável e consciente ente os alunos.`


                 // Inserir o sprite no actor da mesa A
            this.actorimgnpc?.graphics.add(this.listaImagens![0])

             // Mudar o zoom da imagem
             this.actorimgnpc!.graphics.current!.scale = vec(0.2, 0.2)

        }
        if (this.objetoInteracao.nomeDoActor ==  "mesa_stand_b"){
            //mesa b detectada
            this.elementoTexto!.innerHTML = `<h2>Empresa Tech Nova</h2>
                //     <p>Aumentar a produtividade e o engajamento dos funcionários através de um sistema de pontos e recompensas.
                Mecânica:
                Pontos por completar tarefas, participar de reuniões, propor ideias e ajudar colegas.
                Níveis e badges baseados na pontuação acumulada.
                Desafios semanais para promover colaboração e inovação.
                Recompensas como descontos, cartões-presente, dias de folga e viagens.
                Exemplo de Ideia Promocional:
                "Participe do Desafio de Produtividade TechNova: ganhe pontos por suas contribuições diárias e troque-os por incríveis recompensas, como dias de folga extra e viagens de fim de semana!".`

                // Inserir o sprite no actor da mesa B
                this.actorimgnpc?.graphics.add(this.listaImagens![1])

             // Mudar o zoom da imagem
             this.actorimgnpc!.graphics.current!.scale = vec(0.2, 0.2)
        }
        if (this.objetoInteracao.nomeDoActor ==  "mesa_stand_c"){
            //mesa c detectada
            this.elementoTexto!.innerHTML = `<h2>Um novo sistema de fidelidade</h2>
                 <p>Aumentar a fidelidade dos clientes e incentivar compras recorrentes com um sistema de pontos e recompensas.

                 Mecânica:
                 Ganhe pontos por cada real gasto, participação em eventos, indicações e avaliações de produtos.
                 Suba de nível (Bronze, Prata, Ouro, Platina) conforme acumula pontos.
                 Desafios semanais para ganhar pontos extras.
                 Troque pontos por descontos, cartões-presente, cestas gourmet e experiências VIP.
                 Ideia Promocional:
                 "Participe do Desafio de Fidelidade FreshMart: acumule pontos em cada compra e troque por descontos, cestas gourmet e experiências VIP. Torne suas compras ainda mais gratificantes!"
                 .`



                  // Inserir o sprite no actor da mesa C
                this.actorimgnpc?.graphics.add(this.listaImagens![2])

                // Mudar o zoom da imagem
                this.actorimgnpc!.graphics.current!.scale = vec(0.2, 0.2)
        }

        // Adiciona o actor da imagem na tela
        this.add(this.actorimgnpc!)





      
      
      
        // if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
        //     //carregando a imagem
        //     let NpcFalandoImg = Resources.NpcFalandoImg.toSprite()
        //     NpcFalandoImg.scale = vec(0.7, 0.7)

        //     //criacao do actoe para a imagem
        //     let actorNpcFalandoImg = new Actor({
        //         pos: vec(300, engine.halfCanvasHeight)

        //     })
        //     NpcFalandoImg.graphics.add(NpcFalandoImg)

        //     this.add(actorNpcFalandoImg)



        //     this.elementoTexto.innerHTML = `<h2>disperdício zero!</h2>
        //     <p>Nossa empresa criou uma alternativa para o disperdício alimentício de uma escola no interior 
        //     de São Paulo de forma divertida e interativa com as crianças. O projeto foi a implementação de um sistema de recompensas 
        //     conforme a proporção de comida que essas crianças pegavam comparado com o quanto comiam:
        //     Quanto maior a sequência de dias que essa criança passava sem levar nenhuma comida ao lixo, mais pontos a mesma ganhava,
        //     criando assim, um rankin de sucesso  de maneira saudável e consciente ente os alunos.`


        }

        onDeactivate(context: SceneActivationContext<undefined>): void {
            //faz a caixa de texto deseparecer
            this.elementoTexto!.style.opacity = "0"
            
        }
    }





