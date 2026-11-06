export class CriarTransacaoDto {
  readonly descricao: string;
  readonly valor: number;
  readonly tipo: 'receita' | 'despesa';
  readonly categoria: string;
  readonly consumoConsciente: boolean;
}