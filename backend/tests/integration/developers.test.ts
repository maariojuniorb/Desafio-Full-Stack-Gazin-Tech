import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import allMocksGetAndPostAndPut from './mocks/developers.mocks';
import Developers from '../../src/database/Models/DevelopersModel';
import DevelopersService from '../../src/Services/developersService';
import ErrorHandler from '../../src/errors/errorHandler';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('/Developers', function () {
  it('/GET, busca todos os desenvolvedores', async () => {
    sinon
      .stub(Developers, 'findAll')
      .resolves(allMocksGetAndPostAndPut.allFiles as unknown as Developers[]);

    const { status, body } = await chai
      .request(app)
      .get('/developers');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMocksGetAndPostAndPut.allFiles);
  });

  it('/POST, com body completo, deve retornar sucesso.', async () => {
    sinon
    .stub(DevelopersService.getInstance(), 'registerDeveloper')
    .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    const { body, status } = await chai.
      request(app)
      .post('/developers')
      .send(allMocksGetAndPostAndPut.fields.bodySucess);

    expect(status).to.equal(201);
    expect(body).to.deep.equal({ message: 'Usuário cadastrado com sucesso' })
  });

  it('/POST, sem o campo nível, deve retornar um erro.', async () => {

    const { body, status } = await chai
      .request(app).post('/developers')
      .send(allMocksGetAndPostAndPut.fields.bodyWithoutNivel);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nivel é obrigatório' })
  });

  it('/POST, sem o campo nome, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWithoutNome);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nome é obrigatório' })
  });

  it('/POST, sem o campo sexo, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWithoutSexo);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo sexo é obrigatório' })
  });

  it('/POST, sem o campo dataNascimento, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWithoutDataNascimento);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo dataNascimento é obrigatório' })
  });

  it('/POST, sem o campo idade, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWhitoutIdade);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo idade é obrigatório' })
  });

  it('/POST, sem o campo hobby, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWhitoutHobby);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo hobby é obrigatório' })
  });

  // it('/POST, com dados incorretos, deve retornar um erro.', async () => {
  //   sinon
  //     .stub(Developers, 'create').rejects(Error());

  //   try {
  //     await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyFail);
  //   } catch (error) {
  //     expect((error as ErrorHandler).status).to.equal(400);
  //     expect((error as ErrorHandler).message).to.deep.equal({ error: 'Não foi possível cadastrar o desenvolvedor' });
  //   }

  // });

  // it('/PUT, deve editar um desenvolvedor com sucesso', async () => {

  //   const { body, status } = await chai.request(app)
  //     .put('/developers/2')
  //     .send(allMocksGetAndPostAndPut.fields.bodySucess);

  //   expect(status).to.equal(200);
  //   expect(body).to.deep.equal({ error: 'O campo hobby é obrigatório' })
  // });

  afterEach(sinon.restore);

});
