import chai from "chai";
const expect = chai.expect;
import sinon from "sinon";

import Manager from "../src/Manager";

describe("Manager", ()=>{


  it("should create manager instance", () => {
    const manager = new Manager();
    expect(manager).to.be.an.instanceof(Manager);
  })

  describe("when manager instance exist", () => {
    var manager;

    beforeEach(() => {
      manager = new Manager();
    });

    it("should return empty extension list", () => {
      expect(manager.getExtensions().length).to.be.equal(0);
    });

    it("should register and init extension", () => {
      const extensionStub = createExtensionStub("SOME_NAME");
      manager.registerExtension(extensionStub);
      expect(extensionStub.getName.called).be.false;
      expect(extensionStub.init.called).be.true;
      expect(manager._extensions[0]).be.equal(extensionStub);
    });

    describe("when registered extension", () => {
      var extensionStub;
      beforeEach(() => {
        extensionStub = createExtensionStub("SOME_NAME");
        manager.registerExtension(extensionStub);
      });

      it("should return extension list", () => {
        expect(manager.getExtensions().length).to.be.equal(1);
        expect(manager.getExtensions()[0]).to.be.equal(extensionStub);
      });
    });

    it("should register event listener", () => {
      const callbackStub = sinon.stub();
      manager.registerEventListener("SOME_NAME", callbackStub);
      expect(manager._events[0]._callbacks[0]).be.equal(callbackStub);
    });

    describe("when registered event listener", () => {
      var callbackStub;
      beforeEach(() => {
        callbackStub = sinon.stub();
        manager.registerEventListener("SOME_NAME", callbackStub);
      });

      it("should call callback on event call", () => {
        manager.callEvent("SOME_NAME", "SOME_VALUE");
        expect(callbackStub.called).be.true;
      })
    });
  });
});

function createExtensionStub(extensionName, init = sinon.stub()) {
  return {
    init,
    getName: sinon.stub().returns(extensionName)
  };
}
