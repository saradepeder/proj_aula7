import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(criarTransacaoDto: CriarTransacaoDto): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(criarTransacaoDto);
    return await novaTransacao.save();
  }

  async buscarTodasComMetricas() {
    const historico = await this.transacaoModel.find().exec();

    let totalReceitas = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    historico.forEach((t) => {
      if (t.tipo === 'receita') {
        totalReceitas += t.valor;
      } else if (t.tipo === 'despesa') {
        totalDespesas += t.valor;

        if (t.consumoConsciente === false) {
          totalGastoImpulso += t.valor;
        }
      }
    });

    const saldoTotal = totalReceitas - totalDespesas;

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}