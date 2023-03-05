import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import allMocksLevel from './mocks/levels.mocks';
import allMocksDevelopers from './mocks/developers.mocks';
import Levels from '../../src/Config/database/Models/LevelsModels';
import Developers from '../../src/Config/database/Models/DevelopersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe(' GET /levels', function () {
  it('É possível buscar todos os níveis com sucesso', async () => {
    sinon
      .stub(Levels, 'findAll')
      .resolves(allMocksLevel.allLevels as unknown as Levels[]);

    const { status, body } = await chai
      .request(app)
      .get('/levels');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMocksLevel.allLevels);
  });

  afterEach(sinon.restore);

});

describe(' POST /levels', function () {
  it('É possível cadastrar um nível com sucesso', async () => {
    sinon
      .stub(Levels, 'create')
      .resolves(allMocksLevel.id as Levels);

    const { status, body } = await chai
      .request(app)
      .post('/levels')
      .send(allMocksLevel.mockLevelWhithoutId);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(allMocksLevel.mockLevelWithId);
  });

  it('Retorna um erro ao cadastrar nível vazio', async () => {
    const { status, body } = await chai
      .request(app)
      .post('/levels')
      .send(allMocksLevel.emptyParameter);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nível é obritaório' });
  });

  it('Retorna um erro ao não informar o campo nível', async () => {
    const { status, body } = await chai
      .request(app)
      .post('/levels')
      .send(undefined);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nível é obritaório' });
  });

  it('Retorna um erro ao informar o campo nível diferente de string', async () => {
    const { status, body } = await chai
      .request(app)
      .post('/levels')
      .send(allMocksLevel.nivelNumber as unknown as Levels);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nível deve ser uma string' });
  });

  it('Retorna um erro ao não ser possível cadastrar um nível', async () => {
    sinon
      .stub(Levels, 'create')
      .rejects(new Error);

    const { status, body } = await chai
      .request(app)
      .post('/levels')
      .send(allMocksLevel.mockLevelWhithoutId);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: "Não foi possível cadastrar o nível" });
  });

  afterEach(sinon.restore);

});

describe(' PUT /levels', function () {
  it('É possível editar um nível com sucesso', async () => {
    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as Levels);

    sinon
      .stub(Levels, 'update')
      .resolves();

    const { status, body } = await chai
      .request(app)
      .put('/levels/2')
      .send(allMocksLevel.mockLevelWhithoutId);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMocksLevel.mockLevelWithId);
  });

  it('Retorna erro ao tentar cadastrar nível vazio', async () => {
    const { status, body } = await chai
      .request(app)
      .put('/levels/2')
      .send(allMocksLevel.emptyParameter);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nível é obritaório' });
  });

  it('Retorna erro ao não informar o campo nível', async () => {
    const { status, body } = await chai
      .request(app)
      .put('/levels/2')
      .send(undefined);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nível é obritaório' });
  });

  it('Retorna erro ao informar campo nível diferente de string', async () => {
    const { status, body } = await chai
      .request(app)
      .put('/levels/2')
      .send(allMocksLevel.nivelNumber as unknown as Levels);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'O campo nível deve ser uma string' });
  });

  it('Retorna erro ao informar um id inexistente', async () => {
    sinon
      .stub(Levels, 'findByPk')
      .resolves(null);

    const { status, body } = await chai
      .request(app)
      .put('/levels/2')
      .send(allMocksLevel.mockLevelWhithoutId);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: "ID inexistente" });
  });

  it('retorna erro ao não ser possível cadastrar um nível', async () => {
    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as Levels);

    sinon
      .stub(Levels, 'update')
      .rejects(new Error);

    const { status, body } = await chai
      .request(app)
      .put('/levels/2')
      .send(allMocksLevel.mockLevelWhithoutId);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: "Não foi possível atualizar o nível" });
  });

  afterEach(sinon.restore);

});

describe(' DELETE /levels', function () {
  it('É possível deletar um nível com sucesso', async () => {
    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as unknown as Levels);

    sinon
      .stub(Developers, 'findAll')
      .resolves([] as unknown as Developers[]);

    sinon
      .stub(Levels, 'destroy')
      .resolves();

    const { status } = await chai
      .request(app)
      .delete('/levels/2');

    expect(status).to.equal(204);
  });

  it('Retorna erro quando ID é inexistente', async () => {
    sinon
      .stub(Levels, 'findByPk')
      .resolves(null);

    const { status, body } = await chai
      .request(app)
      .delete('/levels/2');

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'ID inexistente'});
  });

  it('Retorna erro quando um nível está associado a um desenvolvedor', async () => {
    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as unknown as Levels);

    sinon
      .stub(Developers, 'findAll')
      .resolves(allMocksDevelopers.allFiles as unknown as Developers[]);

    const { status, body } = await chai
      .request(app)
      .delete('/levels/2');

    expect(status).to.equal(501);
    expect(body).to.deep.equal({ error: 'O nivel está associado a um desenvolvedor'});
  });

  it('Retorna erro quando não é possível deletar um nível', async () => {
    sinon
      .stub(Levels, 'findByPk')
      .resolves(allMocksLevel.mockLevelWithId as unknown as Levels);

    sinon
      .stub(Developers, 'findAll')
      .resolves([] as unknown as Developers[]);

    sinon
      .stub(Levels, 'destroy')
      .rejects(new Error);

    const { status, body } = await chai
      .request(app)
      .delete('/levels/2');

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ error: 'Não foi possível deletar o nível'});
  });

  afterEach(sinon.restore);

});
