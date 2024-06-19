import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logoVertical from "./images/logo-vertical.png";
import gamificacao from "./images/gamificacao.png";
import NpcFalandoImg1 from "./images/npc1.png";
import NpcFalandoImg2 from "./images/npc2.png";
import NpcFalandoImg3 from "./images/npc3.png";

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from"./maps/tileset_generic.tsx?url"
import tsxEstoquePath from"./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from"./maps/tileset_biblioteca.tsx?url"

import tmxMapaPath from "./maps/sem título.tmx?url"
import { TiledResource } from "@excaliburjs/plugin-tiled";

import playerSpritePath from "./sprites/personagem_1.png"

import ritmada from "./sounds/ritmada_zelda.mp3"


export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  logoVertical: new ImageSource(logoVertical),
  PlayerSpriteSheet: new ImageSource(playerSpritePath, { filtering: ImageFiltering.Pixel}),
  gamificacao: new ImageSource(gamificacao),
  NpcFalandoImg1: new ImageSource(NpcFalandoImg1),
  NpcFalandoImg2: new ImageSource(NpcFalandoImg2),
  NpcFalandoImg3: new ImageSource(NpcFalandoImg3),

  
  ritmadaBGM: new Sound (ritmada),
  Mapa: new TiledResource(tmxMapaPath, {
    pathMap:[
      {path: "sem título.txt,", output: tmxMapaPath},
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_paredes.tsx", output: tsxParedesPath},
      {path: "tileset_generic.tsx", output: tsxGenericPath},
      {path: "tileset_estoque.tsx", output: tsxEstoquePath},
      {path: "tileset_biblioteca.tsx", output: tsxBibliotecaPath}
    ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
