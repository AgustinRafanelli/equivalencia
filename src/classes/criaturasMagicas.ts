import { Rol, Domador, Hechicero, Guardian, Mascota } from "./rols";

export abstract class Criatura {
  protected _poderMagico: number;
  protected _astucia: number;
  protected _rol: Rol;

  constructor(poderMagico: number, astucia: number, rol: Rol) {
    this._poderMagico = poderMagico;
    this._astucia = astucia;
    this._rol = rol;
  }

  get rol(): Rol {
    return this._rol;
  }

  setRol(rol: Rol){
    this._rol = rol
  }

  getPoderOfensivo(): number {
    return this._poderMagico * 10 + this._rol.getBonus();
  }

  isFormidable(): boolean {
    return this._rol.isExtraordinario(this._poderMagico);
  }

  ritualDeCambioDeRol(): void {
    this.rol.cambiarRol(this);
  }
}

export class Hada extends Criatura {
  private distanciaVuelo: number;

  constructor(
    poderMagico: number,
    astucia: number,
    rol: Rol,
    distanciaVuelo: number
  ) {
    super(poderMagico, astucia, rol);
    this.setDistanciaVuelo(distanciaVuelo);
  }

  setDistanciaVuelo(distanciaVuelo: number): void {
    if (distanciaVuelo < 2 || distanciaVuelo > 25) {
      throw new Error("La distancia de vuelo debe estar entre 2 y 25.");
    }
    this.distanciaVuelo = distanciaVuelo;
  }

  isFormidable(): boolean {
    return (
      this._astucia > 50 ||
      (this.distanciaVuelo > 10 && this._rol.isExtraordinario(this._poderMagico))
    );
  }
}

export class Duende extends Criatura {
  getPoderOfensivo(): number {
    return (this._poderMagico * 10 + this._rol.getBonus()) * 1.1;
  }
}


