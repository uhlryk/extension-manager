import chai from "chai";
const expect = chai.expect;
import sinon from "sinon";

import Manager from "../src/Manager";

describe("Manager", ()=>{


  it("should create manager instance", () => {
    const manager = new Manager();
    expect(manager).to.be.an.instanceof(Manager);
  })

  describe("for existing manager instance", () => {
    var manager;

    beforeEach(() => {
      manager = new Manager();
    });

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
});


