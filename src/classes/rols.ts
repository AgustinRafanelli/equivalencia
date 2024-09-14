import { Criatura } from "./criaturasMagicas";

export class Mascota {
  private _edad: number;
  private _cuernos: boolean;

  constructor(edad: number, cuernos: boolean) {
    this._edad = edad;
    this._cuernos = cuernos;
  }

  get edad(): number {
    return this._edad;
  }
  get cuernos(): boolean {
    return this._cuernos;
  }
}

export abstract class Rol {
  constructor() {}

  abstract getBonus(): number;

  abstract isExtraordinario(poderMagico: number): boolean;

  abstract cambiarRol(criatura: Criatura): void;
}

export class Guardian extends Rol {
  getBonus() {
    return 150;
  }

  isExtraordinario(poderMagico) {
    return poderMagico > 50 ? true : false;
  }

  cambiarRol(criatura: Criatura): void {
    const mascotaNueva = new Mascota(1, false);
    criatura.setRol(new Domador([mascotaNueva]));
  }
}

export class Hechicero extends Rol {
  private static _instance: Hechicero | null = null;

  private constructor() {
    super();
  }

  public static getInstance(): Hechicero {
    if (this._instance === null) {
      this._instance = new Hechicero();
    }
    return this._instance;
  }

  getBonus() {
    return 0;
  }

  isExtraordinario(poderMagico: number) {
    return true;
  }

  cambiarRol(criatura: Criatura): void {
    criatura.setRol(new Guardian());
  }
}

export class Domador extends Rol {
  private _mascotas: Mascota[];

  constructor(mascotas: Mascota[]) {
    super();
    this._mascotas = mascotas || [];
  }

  get mascotas(): Mascota[] {
    return this._mascotas;
  }

  getBonus() {
    return this._mascotas.reduce((totalBono, mascota) => {
      return mascota.cuernos ? totalBono + 150 : totalBono;
    }, 0);
  }

  isExtraordinario(poderMagico) {
    return (
      poderMagico >= 15 && this._mascotas.every((mascota) => mascota.edad >= 10)
    );
  }

  cambiarRol(criatura: Criatura): void {
    const mascotaMagicaConCuernos = this._mascotas.find(
      (mascota) => mascota.cuernos
    );
    if (!mascotaMagicaConCuernos) {
      throw new Error(
        "Para cambiar de Domador a Hechicero, necesitas al menos una mascota mágica con cuernos."
      );
    }
    criatura.setRol(Hechicero.getInstance());
  }
}
