import { Criatura } from "./criaturasMagicas";

export class Colonia {
  private _colonos: Criatura[];
  private _colonosFormidables: number;
  private _poderOfensivo: number;

  constructor(colonos: Criatura[]) {
    this._colonos = colonos;
    this.setColonosFormidables(colonos);
    this.setPoderOfensivo(colonos);
  }

  get colonosFormidables(): number {
    return this._colonosFormidables;
  }

  private setColonosFormidables(colonos: Criatura[]) {
    this._colonosFormidables = colonos.reduce((totalFormidables, colono) => {
      return colono.isFormidable() ? totalFormidables + 1 : totalFormidables;
    }, 0);
  }

  get poderOfensivo(): number {
    return this._poderOfensivo;
  }

  private setPoderOfensivo(colonos: Criatura[]): void {
    this._poderOfensivo = colonos.reduce((totalPoder, colono) => {
      return colono.getPoderOfensivo()
        ? totalPoder + colono.getPoderOfensivo()
        : totalPoder;
    }, 0);
  }

  modificarPoderOfensivo(modificador: number): void {
    this._poderOfensivo = this._poderOfensivo * modificador;
  }
}

export abstract class Area {
  protected _colonia: Colonia;
  protected _poderDefensivo: number;

  constructor(colonia: Colonia) {
    this._colonia = colonia;
    this.setPoderDefensivo(colonia);
  }

  abstract setPoderDefensivo(colonia: Colonia): void;

  conquista(coloniaInvasora: Colonia): void {
    if (this._poderDefensivo < coloniaInvasora.poderOfensivo) {
      this._colonia = coloniaInvasora;
    } else {
      coloniaInvasora.modificarPoderOfensivo(0.85);
    }
  }
}

export class Claro extends Area {
  constructor(colonia: Colonia) {
    super(colonia);
  }

  setPoderDefensivo(colonia: Colonia): void {
    this._poderDefensivo = colonia.poderOfensivo + 100;
  }
}

export class Castillo extends Area {
  constructor(colonia: Colonia) {
    super(colonia);
  }

  setPoderDefensivo(colonia: Colonia): void {
    this._poderDefensivo = colonia.colonosFormidables * 200;
  }
}
