import * as fetch from 'node-fetch';

export default class {
  constructor() {}

  async http(url, opt?){
    return new Promise((resolve, reject) => {
      if(opt != undefined) {
        // fetch(url, opt).then()
      }
    })
    // return await fetch(url, opt)
  }
}
