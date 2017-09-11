const { expect } = require('chai')
const rewire = require('rewire')
const jwt = require('jsonwebtoken');
const signin = rewire('./signin')
const createUserToken = signin.__get__('createUserToken')

describe ('signin.js', () => {
  describe ('createUserToken()', () => {
    let success, msg, user = null;
    const res = {
      send: res => { success = res.success; msg = res.msg; },
      json: res => { success = res.success; user = res.user; }
    } 

    it ('Doesn`t work on error', () => {
      
      createUserToken( true, null, null, res );

      expect (success).to.equal(false);
    });
  })
})
