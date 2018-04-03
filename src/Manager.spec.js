import Manager from "./Manager";
import ExtensionJoint from "./ExtensionJoint";
import Extension from "./Extension";
import asyncListCompose from "./compose/asyncList";
import asyncMapCompose from "./compose/asyncMap";
import syncListCompose from "./compose/syncList";
import syncMapCompose from "./compose/syncMap";
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

        it("should return empty extension joint list", () => {
            expect(manager.getExtensionJoints().length).to.be.equal(0);
        });

        it("should add extension", () => {
            const extension = new Extension();
            manager.registerExtension("SOME_NAME", extension);
            expect(manager._extensionJoints["SOME_NAME"]).to.be.an.instanceof(ExtensionJoint);
        });

        it("should add extension as an empty object", () => {
            manager.registerExtension("SOME_NAME", {});
            expect(manager._extensionJoints["SOME_NAME"]).to.be.an.instanceof(ExtensionJoint);
        });

        it("should add extension as an object with properties", () => {
            manager.registerExtension("SOME_NAME", {
                properties: {
                    someKey: "someValue"
                }
            });
            expect(manager._extensionJoints["SOME_NAME"]).to.be.instanceof(ExtensionJoint);
            expect(
                manager._extensionJoints["SOME_NAME"]._extension._properties["someKey"]
            ).to.be.equal("someValue");
        });

        it("should add extension as an object with events", () => {
            let someHandler = sinon.stub();
            manager.registerExtension("SOME_NAME", {
                events: {
                    someKey: someHandler
                }
            });
            expect(manager._extensionJoints["SOME_NAME"]).to.be.instanceof(ExtensionJoint);
            expect(manager._extensionJoints["SOME_NAME"]._extension._events["someKey"]).to.be.equal(
                someHandler
            );
        });

        describe("when registered extension", () => {
            let extension;
            beforeEach(() => {
                extension = new Extension();
                manager.registerExtension("SOME_NAME", extension);
            });

            it("should return extension list", () => {
                expect(manager.getExtensionJoints().length).to.be.equal(1);
                expect(manager.getExtensionJoints()[0].getExtension()).to.be.equal(extension);
            });

            it("should return extension by name", () => {
                expect(manager.getExtensionJoint("SOME_NAME").getExtension()).to.be.equal(
                    extension
                );
            });

            it("should return null if extension with name doesn't exist", () => {
                expect(manager.getExtensionJoint("NON_EXISTING_NAME")).to.be.equal(null);
            });

            it("should return true for enabled extension", () => {
                expect(manager.isExtensionJointEnabled("SOME_NAME")).to.be.true();
            });

            it("should return true if extension is registered", () => {
                expect(manager.hasExtensionJoint("SOME_NAME")).to.be.true();
            });

            it("should disable extension", () => {
                expect(manager.disableExtensionJoint("SOME_NAME")).to.be.true();
                expect(manager._extensionJoints["SOME_NAME"]._enabled).to.be.false();
            });

            it("should return false when disable non existing extension", () => {
                expect(manager.disableExtensionJoint("NON_EXISTING_NAME")).to.be.false();
            });

            describe("when extension is disabled", () => {
                beforeEach(() => {
                    manager.disableExtensionJoint("SOME_NAME");
                });

                it("should return false when extension is disabled", () => {
                    expect(manager.isExtensionJointEnabled("SOME_NAME")).to.be.false();
                });

                it("should enable extension", () => {
                    expect(manager.enableExtensionJoint("SOME_NAME")).to.be.true();
                    expect(manager._extensionJoints["SOME_NAME"]._enabled).to.be.true();
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
                const extensionJoints = manager.getExtensionJointsWithProperty("PROPERTY_1");
                expect(extensionJoints.length).to.be.equal(2);
                expect(extensionJoints[0]._extension).to.include(extensionA);
                expect(extensionJoints[1]._extension).to.include(extensionB);
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
                    const event = manager.createEvent("SOME_EVENT", asyncListCompose);
                    return event("SOME_VALUE").then(response => {
                        expect(eventHandler.calledOnce).to.be.true();
                        expect(response.length).to.be.equal(1);
                        expect(response[0]).to.be.equal("SOME_VALUE");
                    });
                });
            });

            describe("when compose function is async map", () => {
                it("should call event handler on event call", () => {
                    const event = manager.createEvent("SOME_EVENT", asyncMapCompose);
                    return event("SOME_VALUE").then(response => {
                        expect(eventHandler.calledOnce).to.be.true();
                        expect(response).to.be.shallowDeepEqual({
                            SOME_NAME: "SOME_VALUE"
                        });
                    });
                });
            });

            describe("when compose function is sync list", () => {
                it("should call event handler on event call", () => {
                    const event = manager.createEvent("SOME_EVENT", syncListCompose);
                    const response = event("SOME_VALUE");
                    expect(eventHandler.calledOnce).be.true();
                    expect(response.length).to.be.equal(1);
                    expect(response[0]).to.be.equal("SOME_VALUE");
                });
            });

            describe("when compose function is sync map", () => {
                it("should call event handler on event call", () => {
                    const event = manager.createEvent("SOME_EVENT", syncMapCompose);
                    const response = event("SOME_VALUE");
                    expect(eventHandler.calledOnce).be.true();
                    expect(response).to.be.shallowDeepEqual({
                        SOME_NAME: "SOME_VALUE"
                    });
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
                const extensionJoints = manager.getExtensionJointsWithEventListener("EVENT_1");
                expect(extensionJoints.length).to.be.equal(2);
                expect(extensionJoints[0]._extension).to.be.equal(extensionA);
                expect(extensionJoints[1]._extension).to.be.equal(extensionB);
            });
        });
    });
});
