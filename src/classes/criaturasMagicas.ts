import { Rol, Domador, Hechicero, Guardian, Mascota } from "./rols";

export abstract class Criatura {
  protected poderMagico: number;
  protected astucia: number;
  protected rol: Rol;

  constructor(poderMagico: number, astucia: number, rol: Rol) {
    this.poderMagico = poderMagico;
    this.astucia = astucia;
    this.rol = rol;
  }

  getPoderOfensivo(): number {
    return this.poderMagico * 10 + this.rol.getBonus();
  }

  isFormidable(): boolean {
    return this.rol.isExtraordinario(this.poderMagico);
  }

  ritualDeCambioDeRol(): void {
    if (this.rol instanceof Guardian) {
      const mascotaNueva = new Mascota(1, false);
      this.rol = new Domador([mascotaNueva]);
    } else if (this.rol instanceof Hechicero) {
      this.rol = new Guardian();
    } else if (this.rol instanceof Domador) {
      const mascotaMagicaConCuernos = this.rol.mascotas.find(
        (mascota) => mascota.cuernos
      );
      if (!mascotaMagicaConCuernos) {
        throw new Error(
          "Para cambiar de Domador a Hechicero, necesitas al menos una mascota mágica con cuernos."
        );
      }
      this.rol = new Hechicero();
    }
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
      this.astucia > 50 ||
      (this.distanciaVuelo > 10 && this.rol.isExtraordinario(this.poderMagico))
    );
  }
}

export class Duende extends Criatura {
  getPoderOfensivo(): number {
    return (this.poderMagico * 10 + this.rol.getBonus()) * 1.1;
  }
}


