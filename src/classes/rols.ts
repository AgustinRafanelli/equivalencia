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
}

export class Guardian extends Rol {
  getBonus() {
    return 150;
  }

  isExtraordinario(poderMagico) {
    return poderMagico > 50 ? true : false;
  }
}

export class Hechicero extends Rol {
  getBonus() {
    return 0;
  }

  isExtraordinario() {
    return true;
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
      poderMagico >= 15 &&
      this._mascotas.every((mascota) => mascota.edad >= 10)
    );
  }
}