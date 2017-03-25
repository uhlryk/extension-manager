import Extension from "./Extension";
export default class Manager {
  private _extensions: Extension[];
  constructor () {
    this._extensions = [];
  }

  registerExtension(newExtension: Extension): Manager {
    if (this._extensions.some(extension => extension.getName() === newExtension.getName()) === false) {
      this._extensions.push(newExtension);
      newExtension.init(this);
    }
    return this;
  }


}
