import { Rol, Guardian, Hechicero, Domador, Mascota } from "../src/classes/rols";
import { Criatura, Hada, Duende } from "../src/classes/criaturasMagicas";

// Mocking Rol classes
class MockRol extends Rol {
  getBonus(): number {
    return 100;
  }

  isExtraordinario(poderMagico: number): boolean {
    return poderMagico > 50;
  }
}

describe("Criatura", () => {
  let duende: Duende;

  it("Debería cambiar el rol de Hechicero a Guardian", () => {
    duende = new Duende(60, 40, new Hechicero());
    duende.ritualDeCambioDeRol();
    expect(duende["rol"]).toBeInstanceOf(Guardian);
  });

  it("Debería cambiar el rol de Guardian a Domador", () => {
    duende = new Duende(60, 40, new Guardian());
    duende.ritualDeCambioDeRol();
    expect(duende["rol"]).toBeInstanceOf(Domador);
  });

  it("Debería lanzar error al intentar cambiar de Domador a Hechicero sin mascota mágica con cuernos", () => {
    duende = new Duende(60, 40, new Domador([]));
    expect(() => duende.ritualDeCambioDeRol()).toThrow(
      "Para cambiar de Domador a Hechicero, necesitas al menos una mascota mágica con cuernos."
    );
  });

  it("Debería cambiar el rol de Domador a Hechicero con mascota mágica con cuernos", () => {
    const mascotaConCuernos = new Mascota(5, true);
    duende = new Duende(60, 40, new Domador([mascotaConCuernos]));
    duende.ritualDeCambioDeRol();
    expect(duende["rol"]).toBeInstanceOf(Hechicero);
  });
});

describe("Hada", () => {
  let hada: Hada;

  beforeEach(() => {
    hada = new Hada(60, 60, new MockRol(), 15);
  });

  it("Debería calcular el poder ofensivo correctamente", () => {
    expect(hada.getPoderOfensivo()).toBe(700);
  });

  it("Debería establecer la distancia de vuelo correctamente", () => {
    expect(hada["distanciaVuelo"]).toBe(15);
  });

  it("Debería lanzar error si la distancia de vuelo está fuera del rango permitido", () => {
    expect(() => new Hada(60, 60, new MockRol(), 1)).toThrow(
      "La distancia de vuelo debe estar entre 2 y 25."
    );
    expect(() => new Hada(60, 60, new MockRol(), 26)).toThrow(
      "La distancia de vuelo debe estar entre 2 y 25."
    );
  });

  it("Debería determinar si el hada es formidable correctamente", () => {
    expect(hada.isFormidable()).toBe(true);
  });

  it("Debería devolver true si la hada es formidable por ser astuta", () => {
    hada = new Hada(20, 60, new MockRol(), 5);
    expect(hada.isFormidable()).toBe(true);
  });

  it("Debería devolver false si la distancia de vuelo es menor o igual a 10", () => {
    hada = new Hada(60, 40, new MockRol(), 5);
    expect(hada.isFormidable()).toBe(false);
  });
});

describe("Duende", () => {
  let duende: Duende;

  beforeEach(() => {
    duende = new Duende(60, 40, new MockRol());
  });

  it("Debería calcular el poder ofensivo correctamente con un multiplicador", () => {
    expect(duende.getPoderOfensivo()).toBeCloseTo(770);
  });

  it("Debería determinar si la criatura es formidable", () => {
    expect(duende.isFormidable()).toBe(true);
  });
});
