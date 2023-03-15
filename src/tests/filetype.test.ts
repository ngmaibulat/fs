import assert from 'node:assert'
import test from 'node:test'
import { getFileType } from '../fileType.js'

test('detect json file', async () => {
    const res = getFileType('package.json')
    assert.equal(res, 'JSON data')
})
