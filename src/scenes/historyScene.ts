import { Actor, Color, Engine, FadeInOut, Keys, Resource, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
    //declaração do elemento texto
    elementoTexto?: HTMLElement


    //metodo para esmaecer um elemento HTML
    fadeOutElement(elemento: HTMLElement) {
        //pegar opacidade do elemento HTML
        let opacidade = parseFloat(elemento.style.opacity)

        //repititir diminuçao da opacidade
        setInterval(() => {
            //se o elemento ainda está visivel
            if (opacidade > 0) {
                //diminuir opacidade
                opacidade = opacidade - 0.03

                //atualizar a opacidade do elemento 
                elemento.style.opacity = opacidade.toString()
            }
        }, 20)




    }


    // Ao entrar ou sair da cena, utiliza o feito de transição lenta
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")

        //criar elemnento com a descrição da empresa
        this.elementoTexto = document.createElement("div") as HTMLElement

        //definir opacidade do elemento para 1 = visível
        this.elementoTexto.style.opacity = "1"

        //inserir elementoTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        //adicionar classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")

        //adicionar títuo e parágrafo dentro do conteudo da div
        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAi</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.`




        //adicionar imagem vertical
        //configurando imagem vertical

        let actorLogoVertical = new Actor({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight)
        })


        //carregando a imagem do logo
        let imagemLogoVertical = Resources.logoVertical.toSprite()
        imagemLogoVertical.scale = vec(0.7, 0.7)

        //adicionar imagem no actor
        actorLogoVertical.graphics.add(imagemLogoVertical)

        //renderizar o actor na cena
        this.add(actorLogoVertical)

        //configurar a cena para monitorar o evento da tecla pressionada
        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                //criar transição suave do elemento texto
                this.fadeOutElement(this.elementoTexto!)

                //direcionar para a proxima cena
                engine.goToScene("gamificacao")
            }
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        //remover elemento texto da tela
        this.elementoTexto?.remove()
    }
}