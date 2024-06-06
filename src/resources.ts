import { ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logoVertical from "./images/logo-vertical.png";
import gamificacao from "./images/gamificacao-segunda tela.png"



export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  logoVertical: new ImageSource(logoVertical),
  gamificacao: new ImageSource(gamificacao)
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
