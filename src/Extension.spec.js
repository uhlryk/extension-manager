import Extension from "./Extension";

describe("Extension", () => {
    it("should create extension instance", () => {
        const extension = new Extension();
        expect(extension).to.be.an.instanceof(Extension);
    });

    it("should create extension instance with empty object arg", () => {
        const extension = new Extension({});
        expect(extension).to.be.an.instanceof(Extension);
    });

    it("should create extension instance with object with properties", () => {
        const extension = new Extension({
            properties: {
                someKey: "someValue"
            }
        });
        expect(extension).to.be.an.instanceof(Extension);
        expect(extension._properties["someKey"]).to.be.equal("someValue");
    });

    it("should create extension instance with object with events", () => {
        const eventHandler = sinon.stub();
        const extension = new Extension({
            events: {
                someKey: eventHandler
            }
        });
        expect(extension).to.be.an.instanceof(Extension);
        expect(extension._events["someKey"]).to.be.equal(eventHandler);
    });

    it("should create extension instance with object with events and properties", () => {
        const eventHandler = sinon.stub();
        const extension = new Extension({
            events: {
                someKey1: "someValue",
                someKey2: eventHandler
            }
        });
        expect(extension).to.be.an.instanceof(Extension);
        expect(extension._events["someKey1"]).to.be.equal("someValue");
        expect(extension._events["someKey2"]).to.be.equal(eventHandler);
    });

    describe("when extension instance exist", () => {
        let extension;

        beforeEach(() => {
            extension = new Extension();
        });

        it("should add property", () => {
            extension.setProperty("SOME_PROPERTY", "SOME_PROPERTY_VALUE");
            expect(extension._properties["SOME_PROPERTY"]).to.be.equal("SOME_PROPERTY_VALUE");
        });

        describe("when some property is set", () => {
            beforeEach(() => {
                extension.setProperty("SOME_PROPERTY", "SOME_PROPERTY_VALUE");
            });

            it("should return property by name", () => {
                expect(extension.getProperty("SOME_PROPERTY")).to.be.equal("SOME_PROPERTY_VALUE");
            });

            it("should return true when property exist", () => {
                expect(extension.hasProperty("SOME_PROPERTY")).to.be.true();
            });

            it("should return false when property doesn't exist", () => {
                expect(extension.hasProperty("WRONG_PROPERTY")).to.be.false();
            });
        });

        it("should add event listener", () => {
            const eventHandler = sinon.stub();
            extension.setEventListener("SOME_EVENT", eventHandler);
            expect(extension._events["SOME_EVENT"]).to.be.equal(eventHandler);
        });

        describe("when some event listener is set", () => {
            let eventHandler;
            beforeEach(() => {
                eventHandler = sinon.stub();
                extension.setEventListener("SOME_EVENT", eventHandler);
            });

            it("should return event by name", () => {
                expect(extension.getEventListener("SOME_EVENT")).to.be.equal(eventHandler);
            });

            it("should return true when event listener exist", () => {
                expect(extension.hasEventListener("SOME_EVENT")).to.be.true();
            });

            it("should return false when event listener doesn't exist", () => {
                expect(extension.hasEventListener("WRONG_EVENT")).to.be.false();
            });
        });
    });
});
