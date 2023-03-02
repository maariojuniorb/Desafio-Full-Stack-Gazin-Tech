import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../../src/app';
import Developers from '../../src/database/Models/DevelopersModel';
import ErrorHandler from '../../src/errors/errorHandler';
import DeveloperService from '../../src/Services/developersService';
import allMocksGetAndPostAndPut from '../integration/mocks/developers.mocks';
import { error } from 'console';

chai.use(chaiHttp);

const { expect } = chai;


describe('testando a camada Service', function() {
  const service = new DeveloperService();
  it('testando a rota get "/developers"', async function() {
    sinon.stub(Developers, 'create').resolves();

    const result = service.registerDeveloper(allMocksGetAndPostAndPut.fields.bodySucess)
  });
});
