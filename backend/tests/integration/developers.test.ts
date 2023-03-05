import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import allMocksGetAndPostAndPut from './mocks/developers.mocks';
import Developers from '../../src/Config/database/Models/DevelopersModel';
import Levels from '../../src/Config/database/Models/LevelsModels';
import allMocksLevel from './mocks/levels.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe(' GET /developers', function () {
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

  afterEach(sinon.restore);

});

describe('POST /developers', function () {
  it('com body completo, deve retornar sucesso.', async () => {
    sinon.stub(Levels, 'findByPk')
    .resolves(allMocksLevel.mockLevelWithId as Levels)

    sinon
    .stub(Developers, 'create')
    .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    const { body, status } = await chai.
      request(app)
      .post('/developers')
      .send(allMocksGetAndPostAndPut.fields.bodySucess);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(allMocksGetAndPostAndPut.fields.responseBodySucess)
  });

  it('sem o campo nível, deve retornar um erro.', async () => {

    const { body, status } = await chai
      .request(app).post('/developers')
      .send(allMocksGetAndPostAndPut.fields.bodyWithoutNivel);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nivel é obrigatório' })
  });

  it('sem o campo nome, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app)
      .post('/developers')
      .send(allMocksGetAndPostAndPut.fields.bodyWithoutNome);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nome é obrigatório' })
  });

  it('sem o campo sexo, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWithoutSexo);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo sexo é obrigatório' })
  });

  it('sem o campo dataNascimento, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWithoutDataNascimento);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo dataNascimento é obrigatório' })
  });

  it('sem o campo idade, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWhitoutIdade);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo idade é obrigatório' })
  });

  it('sem o campo hobby, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodyWhitoutHobby);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo hobby é obrigatório' });
  });

  it('com nivel inexistente, deve retornar um erro.', async () => {
    sinon.stub(Levels, 'findByPk')
    .resolves(null);

    const { body, status } = await chai.request(app).post('/developers').send(allMocksGetAndPostAndPut.fields.bodySucess);

    expect(status).to.be.equal(400);
    expect(body).to.deep.equal({ error: 'Nível inválido' });

  });

  it('com dados incorretos, deve retornar um erro.', async () => {
    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Developers, 'create')
      .rejects(new Error);

      const { status, body } = await chai
      .request(app)
      .post('/developers').send(allMocksGetAndPostAndPut.fields.bodyFail);

      expect(status).to.be.equal(400);
      expect(body).to.deep.equal({ error: 'Não foi possível cadastrar o desenvolvedor' });

  });

  afterEach(sinon.restore);

});

describe(' PUT /developers', function () {
  it('com body completo, deve retornar sucesso.', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .onFirstCall()
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers)
      .onSecondCall()
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as Levels);

    sinon
      .stub(Developers, 'update')
      .resolves();

    const { body, status } = await chai
      .request(app)
      .put('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodySucess);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMocksGetAndPostAndPut.fields.responseBodySucess)
  });

  it('sem o campo nível, deve retornar um erro.', async () => {

    const { body, status } = await chai
      .request(app).put('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodyWithoutNivel);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nivel é obrigatório' })
  });

  it('sem o campo nome, deve retornar um erro.', async () => {

    const { body, status } = await chai.request(app)
      .put('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodyWithoutNome);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nome é obrigatório' })
  });

  it('sem o campo sexo, deve retornar um erro.', async () => {

    const { body, status } = await chai
      .request(app)
      .put('/developers/5').send(allMocksGetAndPostAndPut.fields.bodyWithoutSexo);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo sexo é obrigatório' })
  });

  it('sem o campo dataNascimento, deve retornar um erro.', async () => {

    const { body, status } = await chai
      .request(app)
      .put('/developers/5').send(allMocksGetAndPostAndPut.fields.bodyWithoutDataNascimento);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo dataNascimento é obrigatório' })
  });

  it('sem o campo idade, deve retornar um erro.', async () => {

    const { body, status } = await chai
      .request(app)
      .put('/developers/5').send(allMocksGetAndPostAndPut.fields.bodyWhitoutIdade);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo idade é obrigatório' })
  });

  it('sem o campo hobby, deve retornar um erro.', async () => {

    const { body, status } = await chai
      .request(app)
      .put('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodyWhitoutHobby);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo hobby é obrigatório' });
  });

  it('com ID inexistente, deve retornar um erro.', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(null);

    const { body, status } = await chai
      .request(app)
      .put('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodySucess);

    expect(status).to.be.equal(400);
    expect(body).to.deep.equal({ error: 'ID inexistente' });

  });

  it('com nivel inexistente, deve retornar um erro.', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Levels, 'findByPk')
      .resolves(null);

    const { body, status } = await chai
      .request(app)
      .put('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodySucess);

    expect(status).to.be.equal(400);
    expect(body).to.deep.equal({ error: 'Nível inválido' });

  });

  it('com dados incorretos, deve retornar um erro.', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as Levels);

    sinon
      .stub(Developers, 'update')
      .rejects(new Error);

    const { status, body } = await chai
      .request(app)
      .put('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodyFail);

      expect(status).to.be.equal(400);
      expect(body).to.deep.equal({ error: 'Não foi possível atualizar o desenvolvedor' });

  });

  afterEach(sinon.restore);

});

describe(' PATCH /developers', function () {
  it('com body completo, deve retornar sucesso.', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .onFirstCall()
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers)
      .onSecondCall()
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as Levels);

    sinon
      .stub(Developers, 'update')
      .resolves();

    const { body, status } = await chai
      .request(app)
      .patch('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodyWithoutNivel);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMocksGetAndPostAndPut.fields.responseBodySucess)
  });

  it('com ID inexistente, deve retornar um erro.', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(null);

    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as Levels);

    const { body, status } = await chai
      .request(app)
      .patch('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodyWhitoutIdade);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'ID inexistente' });
  });

  it('com nível inexistente, deve retornar um erro.', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Levels, 'findByPk')
      .resolves(null);

    const { body, status } = await chai
      .request(app)
      .patch('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodyWhitoutIdade);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'Nível inválido' });
  });

  it('com dados incorretos, deve retornar um erro.', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as Levels);

    sinon
      .stub(Developers, 'update')
      .rejects(new Error);

    const { body, status } = await chai
      .request(app)
      .patch('/developers/5')
      .send(allMocksGetAndPostAndPut.fields.bodyWhitoutIdade);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'Não foi possível atualizar o desenvolvedor' });
  });

  afterEach(sinon.restore);

});

describe(' DELETE /developers', function () {
  it('deleta um desenvolvedor com sucesso', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Developers, 'destroy')
      .resolves();

    const { status, body } = await chai
      .request(app)
      .delete('/developers/5');

    expect(status).to.equal(204);
  });

  it('retorna erro quando o id é inexistente', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(null);

    const { status, body } = await chai
      .request(app)
      .delete('/developers/5');

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'ID inexistente' });
  });

  it('retorna erro quando não é possível deletar um desenvolvedor', async () => {
    sinon
      .stub(Developers, 'findByPk')
      .resolves(allMocksGetAndPostAndPut.fields.responseBodySucess as unknown as Developers);

    sinon
      .stub(Developers, 'destroy')
      .rejects(new Error);

    const { status, body } = await chai
      .request(app)
      .delete('/developers/5');

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'Não foi possível deletar o desenvoledor' });
  });

  afterEach(sinon.restore);

});


