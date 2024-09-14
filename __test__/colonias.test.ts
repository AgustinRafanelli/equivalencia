import { Castillo, Claro, Colonia } from "../src/classes/colonias";
import { Criatura } from "../src/classes/criaturasMagicas";
import { Rol } from "../src/classes/rols";

class MockCriatura extends Criatura {
  constructor(poderMagico: number, astucia: number, rol: Rol) {
    super(poderMagico, astucia, rol);
  }

  getPoderOfensivo(): number {
    return this._poderMagico * 10 + this.rol.getBonus();
  }

  isFormidable(): boolean {
    return this._poderMagico > 50;
  }
}

class MockRol extends Rol {
  getBonus(): number {
    return 100;
  }

  isExtraordinario(poderMagico: number): boolean {
    return poderMagico > 50;
  }

  cambiarRol(criatura: Criatura): void {
    
  }
}

describe("Colonia", () => {
  let colonia: Colonia;
  let criaturas: MockCriatura[];

  beforeEach(() => {
    criaturas = [
      new MockCriatura(60, 40, new MockRol()),
      new MockCriatura(30, 20, new MockRol()),
    ];
    colonia = new Colonia(criaturas);
  });

  it("Debería inicializar correctamente el número de colonos formidables", () => {
    expect(colonia.colonosFormidables).toBe(1);
  });

  it("Debería inicializar correctamente el poder ofensivo de la colonia", () => {
    expect(colonia.poderOfensivo).toBe(1100);
  });

  it("Debería actualizar el poder ofensivo al pasar un modificador", () => {
    colonia.modificarPoderOfensivo(2);
    expect(colonia.poderOfensivo).toBe(2200);
  });
});

describe("Claro", () => {
  let colonia: Colonia;
  let claro: Claro;

  beforeEach(() => {
    colonia = new Colonia([
      new MockCriatura(60, 40, new MockRol()),
      new MockCriatura(60, 40, new MockRol()),
    ]);
    claro = new Claro(colonia);
  });

  it("Debería establecer el poder defensivo correctamente", () => {
    claro.setPoderDefensivo(colonia);
    expect(claro["_poderDefensivo"]).toBe(1500);
  });

  it("Debería conquistar una colonia si el poder defensivo es menor", () => {
    const coloniaInvasora = new Colonia([
      new MockCriatura(60, 30, new MockRol()),
      new MockCriatura(60, 30, new MockRol()),
      new MockCriatura(60, 30, new MockRol()),
    ]);
    claro.conquista(coloniaInvasora);
    expect(claro["_colonia"]).toBe(coloniaInvasora);
  });

  it("Debería no conquistar una colonia si el poder defensivo es mayor", () => {
    const coloniaInvasora = new Colonia([
      new MockCriatura(60, 30, new MockRol()),
    ]);
    claro.conquista(coloniaInvasora);
    expect(claro["_colonia"]).toBe(colonia);
    expect(coloniaInvasora.poderOfensivo).toBe(595);
  });

  it("Debería no conquistar una colonia si el poder defensivo es igual", () => {
    const coloniaInvasora = new Colonia([
      new MockCriatura(60, 30, new MockRol()),
      new MockCriatura(70, 30, new MockRol()),
    ]);
    claro.conquista(coloniaInvasora);
    expect(claro["_colonia"]).toBe(colonia);
    expect(coloniaInvasora.poderOfensivo).toBe(1275);
  });
});

describe("Castillo", () => {
  let colonia: Colonia;
  let castillo: Castillo;

  beforeEach(() => {
    colonia = new Colonia([
      new MockCriatura(60, 40, new MockRol()),
      new MockCriatura(60, 40, new MockRol()),
    ]);
    castillo = new Castillo(colonia);
  });

  it("Debería establecer el poder defensivo correctamente", () => {
    castillo.setPoderDefensivo(colonia);
    expect(castillo["_poderDefensivo"]).toBe(400);
  });

  it("Debería conquistar una colonia si el poder defensivo es menor", () => {
    const coloniaInvasora = new Colonia([
      new MockCriatura(50, 50, new MockRol()),
    ]);
    castillo.conquista(coloniaInvasora);
    expect(castillo["_colonia"]).toBe(coloniaInvasora);
  });

  it("Debería no conquistar una colonia si el poder defensivo es mayor", () => {
    const coloniaInvasora = new Colonia([
      new MockCriatura(20, 30, new MockRol()),
    ]);
    castillo.conquista(coloniaInvasora);
    expect(castillo["_colonia"]).toBe(colonia);
    expect(coloniaInvasora.poderOfensivo).toBe(255);
  });

  it("Debería no conquistar una colonia si el poder defensivo es igual", () => {
    const coloniaInvasora = new Colonia([
      new MockCriatura(30, 30, new MockRol()),
    ]);
    castillo.conquista(coloniaInvasora);
    expect(castillo["_colonia"]).toBe(colonia);
    expect(coloniaInvasora.poderOfensivo).toBe(340);
  });
});
