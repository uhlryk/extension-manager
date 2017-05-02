import chai from "chai";
var expect = chai.expect;
import sinon from "sinon";

import Manager from "../src/Manager";

describe("Manager", ()=>{
  var manager;

  it("should create manager instance", () => {
    manager = new Manager();
    expect(manager).to.be.an.instanceof(Manager);
  })
;
  it("should return empty extension list when no extensions registered", () => {
    expect(manager.getExtensions().length).to.be.equal(0);
  });

  it("should register and init extension", () => {
    const extensionStub = {
      init: sinon.stub(),
      getName: sinon.stub().returns("SOME_NAME")
    };
    manager.registerExtension(extensionStub);
    expect(extensionStub.getName.called).be.false;
    expect(extensionStub.init.called).be.true;
  })

});


