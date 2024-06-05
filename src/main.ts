import { Engine, FadeInOut } from "excalibur";
import { welcomeScene } from "./scenes/welcomeScene";
import { loader } from "./resources";
import { historyScene } from "./scenes/historyScene";
import { gamificationScene } from "./scenes/gamification.Scene";

const game = new Engine({
  width: 1200,
  height: 800,
  canvasElementId: "jogo"
})

//tem q apertar enter para importar a mrda da cena
game.addScene("bemvindo", new welcomeScene())
game.addScene("historia", new historyScene())
game.addScene("gamificacao", new gamificationScene())

game.start(loader).then(() => {
  game.goToScene("historia", {
    // Adiciona transição lenta ao ir para a welcomeScene
    sourceOut: new FadeInOut({ duration: 1000 })
  })
})