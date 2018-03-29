import Manager from "./Manager";
import Extension from "./Extension";
import asyncList from "./compose/asyncList";
import syncList from "./compose/syncList";

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
            expect(manager._extensions["SOME_NAME"]).to.shallowDeepEqual({
                extension: extension,
                enabled: true
            });
        });

        it("should add extension as an empty object", () => {
            manager.registerExtension("SOME_NAME", {});
            expect(manager._extensions["SOME_NAME"]).to.have.property("extension");
            expect(manager._extensions["SOME_NAME"]).to.have.property("enabled", true);
            expect(manager._extensions["SOME_NAME"].extension).to.be.instanceOf(Extension);
        });

        it("should add extension as an object with properties", () => {
            manager.registerExtension("SOME_NAME", {
                properties: {
                    someKey: "someValue"
                }
            });
            expect(manager._extensions["SOME_NAME"]).to.have.property("extension");
            expect(manager._extensions["SOME_NAME"]).to.have.property("enabled", true);
            expect(manager._extensions["SOME_NAME"].extension).to.be.instanceOf(Extension);
            expect(manager._extensions["SOME_NAME"].extension._properties["someKey"]).to.be.equal("someValue");
        });

        it("should add extension as an object with events", () => {
            let someHandler = sinon.stub();
            manager.registerExtension("SOME_NAME", {
                events: {
                    someKey: someHandler
                }
            });
            expect(manager._extensions["SOME_NAME"]).to.have.property("extension");
            expect(manager._extensions["SOME_NAME"]).to.have.property("enabled", true);
            expect(manager._extensions["SOME_NAME"].extension).to.be.instanceOf(Extension);
            expect(manager._extensions["SOME_NAME"].extension._events["someKey"]).to.be.equal(someHandler);
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
                expect(manager.getExtension("SOME_NAME")).to.be.equal(extension);
                expect(manager._extensions["SOME_NAME"]).to.shallowDeepEqual({
                    extension: extension,
                    enabled: true
                });
            });

            it("should return null if extension with name doesn't exist", () => {
                expect(manager.getExtension("NON_EXISTING_NAME")).to.be.equal(null);
            });

            it("should return true for enabled extension", () => {
                expect(manager.isExtensionActive("SOME_NAME")).to.be.true();
            });

            it("should return true if extension is registered", () => {
                expect(manager.hasExtension("SOME_NAME")).to.be.true();
            });

            it("should disable extension", () => {
                expect(manager.disableExtension("SOME_NAME")).to.be.true();
                expect(manager._extensions["SOME_NAME"]).to.shallowDeepEqual({
                    extension: extension,
                    enabled: false
                });
            });

            it("should return false when disable non existing extension", () => {
                expect(manager.disableExtension("NON_EXISTING_NAME")).to.be.false();
            });

            describe("when extension is disabled", () => {
                beforeEach(() => {
                    manager.disableExtension("SOME_NAME");
                });

                it("should return false when extension is disabled", () => {
                    expect(manager.isExtensionActive("SOME_NAME")).to.be.false();
                });

                it("should enable extension", () => {
                    expect(manager.enableExtension("SOME_NAME")).to.be.true();
                    expect(manager._extensions["SOME_NAME"]).to.shallowDeepEqual({
                        extension: extension,
                        enabled: true
                    });
                });
            });
        });

        describe("when registered extensions with different properties", () => {
            let extensionA;
            let extensionB;
            let extensionC;
            beforeEach(() => {
                extensionA = new Extension();
                extensionA.setProperty("PROPERTY_1", "VALUE_1");
                extensionB = new Extension();
                extensionB.setProperty("PROPERTY_1", "VALUE_2");
                extensionB.setProperty("PROPERTY_2", "VALUE_3");
                extensionC = new Extension();
                extensionC.setProperty("PROPERTY_2", "VALUE_4");
                manager.registerExtension("SOME_NAME_A", extensionA);
                manager.registerExtension("SOME_NAME_B", extensionB);
                manager.registerExtension("SOME_NAME_C", extensionC);
            });

            it("Should return extensions with specific property", () => {
                const extensions = manager.getExtensionsWithProperty("PROPERTY_1");
                expect(extensions.length).to.be.equal(2);
                expect(extensions).to.include(extensionA);
                expect(extensions).to.include(extensionB);
                expect(extensions).to.not.include(extensionC);
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

            describe("when compose function is default", () => {
                it("should call event handler on event call", () => {
                    const event = manager.createEvent("SOME_EVENT");
                    const response = event("SOME_VALUE");
                    expect(eventHandler.calledOnce).be.true();
                    expect(response.length).to.be.equal(1);
                    expect(response[0]).to.be.equal("SOME_VALUE");
                });
            });

            describe("when compose function is async list", () => {
                it("should call event handler on event call", () => {
                    const event = manager.createEvent("SOME_EVENT", asyncList);
                    return event("SOME_VALUE").then(response => {
                        expect(eventHandler.calledOnce).to.be.true();
                        expect(response.length).to.be.equal(1);
                        expect(response[0]).to.be.equal("SOME_VALUE");
                    });
                });
            });

            describe("when compose function is sync list", () => {
                it("should call event handler on event call", () => {
                    const event = manager.createEvent("SOME_EVENT", syncList);
                    const response = event("SOME_VALUE");
                    expect(eventHandler.calledOnce).be.true();
                    expect(response.length).to.be.equal(1);
                    expect(response[0]).to.be.equal("SOME_VALUE");
                });
            });
        });

        describe("when registered extensions with different event listeners", () => {
            let extensionA;
            let extensionB;
            let extensionC;
            beforeEach(() => {
                extensionA = new Extension();
                extensionA.setEventListener("EVENT_1", () => {});
                extensionB = new Extension();
                extensionB.setEventListener("EVENT_1", () => {});
                extensionB.setEventListener("EVENT_2", () => {});
                extensionC = new Extension();
                extensionC.setEventListener("EVENT_2", () => {});
                manager.registerExtension("SOME_NAME_A", extensionA);
                manager.registerExtension("SOME_NAME_B", extensionB);
                manager.registerExtension("SOME_NAME_C", extensionC);
            });

            it("Should return extensions with specific event listener", () => {
                const extensions = manager.getExtensionsWithEventListener("EVENT_1");
                expect(extensions.length).to.be.equal(2);
                expect(extensions).to.include(extensionA);
                expect(extensions).to.include(extensionB);
                expect(extensions).to.not.include(extensionC);
            });
        });
    });
});
