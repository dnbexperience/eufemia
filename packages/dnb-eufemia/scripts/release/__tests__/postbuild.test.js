/**
 * Test postbuild stage
 * check if important files do exists
 *
 */

import fs from 'fs-extra'
import path from 'path'

const buildStages = ['es', 'esm', 'cjs']

describe('type definitions', () => {
  it.each(buildStages)('has d.ts index file on stage %s', (stage) => {
    const file = path.resolve(`./build/${stage}/index.d.ts`)
    const exists = fs.existsSync(file)
    expect(exists).toBe(true)
  })

  it.each(buildStages)(
    'has correct Modal type definitions on stage %s',
    (stage) => {
      expect(
        fs.existsSync(
          path.resolve(`./build/${stage}/components/Modal.d.ts`)
        )
      ).toBe(true)

      // To ensure babel did not compile the d.ts file
      expect(
        fs.readFileSync(
          path.resolve(`./build/${stage}/components/modal/Modal.d.ts`),
          'utf-8'
        )
      ).toMatch(/export interface/g)
    }
  )
})

describe('babel build', () => {
  it.each(buildStages)('has correctly compiled on stage %s', (stage) => {
    expect(
      fs.existsSync(path.resolve(`./build/${stage}/components/Modal.js`))
    ).toBe(true)

    switch (stage) {
      case 'cjs':
        {
          {
            const content = fs.readFileSync(
              path.resolve(`./build/${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain(
              'Object.defineProperty(exports, "__esModule", {'
            )
            expect(content).toContain(`var _default = {};`)

            // Has extra cjs package
            expect(
              fs.existsSync(path.resolve(`./build/${stage}/package.json`))
            ).toBe(true)
          }

          {
            const content = fs.readFileSync(
              path.resolve(`./build/${stage}/components/modal/Modal.js`),
              'utf-8'
            )
            expect(content).toContain('var Modal = function')
            expect(content).toMatch(/^"use strict";/g)
          }
        }
        break

      case 'esm':
        {
          {
            const content = fs.readFileSync(
              path.resolve(`./build/${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain('export default {};')
          }

          const content = fs.readFileSync(
            path.resolve(`./build/${stage}/components/modal/Modal.js`),
            'utf-8'
          )
          expect(content).toContain('export { Modal as default };')
          expect(content).toContain('core-js/modules/es')
          expect(content).toContain(
            'import _extends from "@babel/runtime/helpers/esm/extends";'
          )
        }
        break

      case 'es':
        {
          {
            const content = fs.readFileSync(
              path.resolve(`./build/${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain('export default {};')
          }

          const content = fs.readFileSync(
            path.resolve(`./build/${stage}/components/modal/Modal.js`),
            'utf-8'
          )
          expect(content).toMatch(/export default class Modal extends/g)
          expect(content).not.toContain('core-js/modules/es')
          expect(content).toContain(
            'import _extends from "@babel/runtime/helpers/esm/extends";'
          )
        }
        break
    }
  })
})
