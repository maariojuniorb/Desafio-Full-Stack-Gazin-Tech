import * as chai from 'chai';
import { expect } from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';

chai.use(chaiHttp);

describe('Deveria testar se a aplicação está no ar', function () {
  it('deve retornar um status 200 com uma mensagem de "ok"', async function() {
    const httpResponse = await chai
      .request(app)
      .get('/test')

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal({ message: 'ok' });
  });
});
