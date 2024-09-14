import {
  Guardian,
  Hechicero,
  Domador,
  Mascota,
  Rol,
} from "../src/classes/rols";
import { Claro, Castillo, Colonia } from "../src/classes/colonias";
import { Criatura, Duende, Hada } from "../src/classes/criaturasMagicas";

describe("Integral", () => {
  let colonia1: Colonia;
  let colonia2: Colonia;
  beforeEach(() => {
    const combinaciones1: Criatura[] = [];
    const combinaciones2: Criatura[] = [];

    const roles: Rol[] = [
      new Guardian(),
      Hechicero.getInstance(),
      new Domador([new Mascota(3, true)]), // Domador con mascota mágica con cuernos
      new Domador([new Mascota(2, false)]), // Domador sin mascota mágica
    ];

    combinaciones1.push(new Hada(60, 40, roles[0], 12)); // Hada con Guardian
    combinaciones1.push(new Hada(70, 55, roles[1], 11)); // Hada con Hechicero
    combinaciones1.push(new Hada(30, 20, roles[2], 15)); // Hada con Domador (con cuernos)
    combinaciones1.push(new Hada(40, 60, roles[3], 5)); // Hada con Domador (sin cuernos)

    combinaciones2.push(new Hada(40, 40, roles[0], 12)); // Hada con Guardian
    combinaciones2.push(new Hada(10, 55, roles[1], 8)); // Hada con Hechicero
    combinaciones2.push(new Hada(45, 30, roles[3], 5)); // Hada con Domador (sin cuernos)

    combinaciones1.push(new Duende(60, 40, roles[0])); // Duende con Guardian
    combinaciones1.push(new Duende(70, 55, roles[1])); // Duende con Hechicero
    combinaciones1.push(new Duende(30, 20, roles[2])); // Duende con Domador (con cuernos)
    combinaciones1.push(new Duende(40, 30, roles[3])); // Duende con Domador (sin cuernos)

    combinaciones1.push(new Duende(50, 40, roles[0])); // Duende con Guardian
    combinaciones1.push(new Duende(70, 55, roles[1])); // Duende con Hechicero
    combinaciones1.push(new Duende(30, 20, roles[2])); // Duende con Domador (con cuernos)
    combinaciones1.push(new Duende(40, 30, roles[3])); // Duende con Domador (sin cuernos)

    colonia1 = new Colonia(combinaciones1);
    colonia2 = new Colonia(combinaciones2);
  });

  it("Debería conquistar el claro si el poder defensivo es menor", () => {
    const claro = new Claro(colonia2);
    claro.conquista(colonia1);
    expect(claro["_colonia"]).toBe(colonia1);
  });

  it("Debería no conquistar el claro si el poder defensivo es mayor", () => {
    const claro = new Claro(colonia1);
    claro.conquista(colonia2);
    expect(claro["_colonia"]).toBe(colonia1);
    expect(colonia2.poderOfensivo).toBe(935);
  });

  it("Debería conquistar el castillo si el poder defensivo es menor", () => {
    const castillo = new Castillo(colonia1)
    castillo.conquista(colonia2);
    expect(castillo["_colonia"]).toBe(colonia1);
  });

  it("Debería no conquistar el castillo si el poder defensivo es mayor", () => {
    const castillo = new Castillo(colonia1);
    const coloniaInvasora = new Colonia([new Hada(35, 40, new Guardian(), 10)]);
    castillo.conquista(coloniaInvasora);
    expect(castillo["_colonia"]).toBe(colonia1);
    expect(coloniaInvasora.poderOfensivo).toBe(425);
  });
});
