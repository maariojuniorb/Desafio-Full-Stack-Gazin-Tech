import Ideveloper from '../interfaces/IDeveloper';

export default class Developers {
  private id: number | undefined;
  private nivel: number;
  private nome: string;
  private dataNascimento: Date;
  private idade: number;
  private hobby: string;

  constructor(developer: Ideveloper) {
    this.id = developer.id;
    this.nivel = developer.nivel;
    this.nome = developer.nome;
    this.dataNascimento = developer.dataNascimento;
    this.idade = developer.idade;
    this.hobby = developer.hobby;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number | undefined {
    return this.id;
  }

  public setNivel(nivel: number): void {
    this.nivel = nivel;
  }

  public getNivel(): number {
    return this.nivel;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getNome(): string {
    return this.nome;
  }

  public setDataNascimento(dataNascimento: Date): void {
    this.dataNascimento = dataNascimento;
  }

  public getDataNascimento(): Date {
    return this.dataNascimento;
  }

  public setIdade(idade: number): void {
    this.idade = idade;
  }

  public getIdade(): number {
    return this.idade;
  }

  public setHobby(hobby: string): void {
    this.hobby = hobby;
  }

  public getHobby(): string {
    return this.hobby;
  }
}
