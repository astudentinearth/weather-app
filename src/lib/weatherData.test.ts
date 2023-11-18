import { degToDirection } from "."

it("check if degrees are converted to a direction correctly",()=>{
    expect(degToDirection(-30), "-30 is north-west").toBe("NW");
    expect(degToDirection(-5), "-5 is north").toBe("N");
    expect(degToDirection(5), "5 is north").toBe("N");
    expect(degToDirection(40), "40 is north-east").toBe("NE");
    expect(degToDirection(48), "48 is north-east").toBe("NE");
    expect(degToDirection(80), "80 is east").toBe("E");
    expect(degToDirection(100), "100 is east").toBe("E");
    expect(degToDirection(130), "130 is south-east").toBe("SE");
    expect(degToDirection(150), "150 is south-east").toBe("SE");
    expect(degToDirection(170), "170 is south").toBe("S");
    expect(degToDirection(190), "190 is south").toBe("S");
    expect(degToDirection(220), "220 is south-west").toBe("SW");
    expect(degToDirection(240), "240 is south-west").toBe("SW");
    expect(degToDirection(265), "265 is west").toBe("W");
    expect(degToDirection(275), "275 is west").toBe("W");
    expect(degToDirection(310), "310 is north-west").toBe("NW");
    expect(degToDirection(320), "320 is north-west").toBe("NW");
    expect(degToDirection(345), "345 is north").toBe("N");
})