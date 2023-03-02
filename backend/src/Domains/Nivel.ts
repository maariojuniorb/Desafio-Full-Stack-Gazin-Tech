import Ilevel from '../interfaces/ILevel';

export default class Level {
  private id: number | undefined;
  private nivel: string;

  constructor(level: Ilevel) {
    this.id = level.id;
    this.nivel = level.nivel;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number | undefined {
    return this.id;
  }

  public setNivel(nivel: string): void {
    this.nivel = nivel;
  }

  public getNivel(): string {
    return this.nivel;
  }
}
