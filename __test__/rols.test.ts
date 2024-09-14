import { Guardian, Domador, Hechicero, Mascota } from "../src/classes/rols";

describe("Guardian", () => {
  let guardian: Guardian;

  beforeEach(() => {
    guardian = new Guardian();
  });

  it("Debería devolver 150 como bonus", () => {
    expect(guardian.getBonus()).toBe(150);
  });

  it("Debería devolver true si el poder mágico es mayor que 50", () => {
    expect(guardian.isExtraordinario(60)).toBe(true);
  });

  it("Debería devolver false si el poder mágico es 50 o menor", () => {
    expect(guardian.isExtraordinario(50)).toBe(false);
  });
});

describe("Hechicero", () => {
  let hechicero: Hechicero;

  beforeEach(() => {
    hechicero = Hechicero.getInstance();
  });

  it("Debería devolver 0 como bonus", () => {
    expect(hechicero.getBonus()).toBe(0);
  });

  it("Debería devolver true siempre en isExtraordinario", () => {
    expect(hechicero.isExtraordinario()).toBe(true);
  });
});

describe("Domador", () => {
  let domador: Domador;
  let mascotaConCuernos: Mascota;
  let mascotaSinCuernos: Mascota;

  beforeEach(() => {
    mascotaConCuernos = new Mascota(10, true);
    mascotaSinCuernos = new Mascota(10, false);
    domador = new Domador([mascotaConCuernos, mascotaSinCuernos]);
  });

  it("Debería devolver 150 como bonus si tiene una mascota con cuernos", () => {
    expect(domador.getBonus()).toBe(150);
  });

  it("Debería devolver 0 como bonus si no tiene mascotas con cuernos", () => {
    const domadorSinCuernos = new Domador([mascotaSinCuernos]);
    expect(domadorSinCuernos.getBonus()).toBe(0);
  });

  it("Debería devolver true en isExtraordinario si el poder mágico es mayor o igual a 15 y todas las mascotas tienen al menos 10 años", () => {
    expect(domador.isExtraordinario(15)).toBe(true);
  });

  it("Debería devolver false en isExtraordinario si el poder mágico es menor a 15", () => {
    expect(domador.isExtraordinario(14)).toBe(false);
  });

  it("Debería devolver false en isExtraordinario si alguna mascota tiene menos de 10 años", () => {
    const jovenMascota = new Mascota(5, false);
    const domadorConMascotaJoven = new Domador([
      jovenMascota,
      mascotaConCuernos,
    ]);
    expect(domadorConMascotaJoven.isExtraordinario(15)).toBe(false);
  });
});
