import Manager from "./Manager";
import Extension from "./Extension";

describe("Manager", () => {
    it("should create manager instance", () => {
        const manager = new Manager();
        expect(manager).to.be.an.instanceof(Manager);
    });

    describe("when manager instance exist", () => {
        let manager;

        beforeEach(() => {
            manager = new Manager();
        });

        it("should return empty extension list", () => {
            expect(manager.getExtensions().length).to.be.equal(0);
        });

        it("should add extension", () => {
            const extension = new Extension();
            manager.registerExtension("SOME_NAME", extension);
            expect(manager._extensions["SOME_NAME"]).be.equal(extension);
        });

        describe("when registered extension", () => {
            let extension;
            beforeEach(() => {
                extension = new Extension();
                manager.registerExtension("SOME_NAME", extension);
            });

            it("should return extension list", () => {
                expect(manager.getExtensions().length).to.be.equal(1);
                expect(manager.getExtensions()[0]).to.be.equal(extension);
            });

            it("should return extension by name", () => {
                expect(manager.getExtensionByName("SOME_NAME")).to.be.equal(extension);
            });

            it("should return null if extension with name doesn't exist", () => {
                expect(manager.getExtensionByName("NON_EXISTING_NAME")).to.be.equal(undefined);
            });
        });

        describe("when registered extension has events listeners", () => {
            let extension;
            let eventHandler;
            beforeEach(() => {
                extension = new Extension();
                eventHandler = sinon.stub().callsFake(value => value);
                extension.setEventListener("SOME_EVENT", eventHandler);
                manager.registerExtension("SOME_NAME", extension);
            });

            it("should call event handler on event call", () => {
                const response = manager.callEvent("SOME_EVENT", "SOME_VALUE");
                expect(eventHandler.calledOnce).be.true();
                expect(response.length).to.be.equal(1);
                expect(response[0]).to.be.equal("SOME_VALUE");
            });
        });
    });
});
