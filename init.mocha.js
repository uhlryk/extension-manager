import chai from "chai";
import chaiShallowDeepEqual from "chai-shallow-deep-equal";
const expect = chai.expect;
global.expect = expect;
import dirtyChai from "dirty-chai";
chai.use(dirtyChai);
chai.use(chaiShallowDeepEqual);
import request from "supertest";
global.request = request;
import sinon from "sinon";
global.sinon = sinon;
