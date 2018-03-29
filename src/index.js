import Manager from "./Manager";
import Extension from "./Extension";
import syncList from "./compose/syncList";
import asyncList from "./compose/asyncList";

export default {
    Manager,
    Extension,
    syncListCompose: syncList,
    asyncListCompose: asyncList
};
