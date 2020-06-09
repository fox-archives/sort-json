import { assertEquals } from "https://deno.land/std@0.53.0/testing/asserts.ts"
import { sortJson } from '../src/main.ts'


const { test } = Deno

test('sorts root keys', () => {
	const json = {
		z: 'zebra',
		a: 'alfa'
	}

	assertEquals(sortJson(json), {
		a: 'alfa',
		z: 'zebra'
	})
});

test('sorts nested object', () => {
	const json = {
		z: 'zebra',
		c: {
			f: 'foxtrot',
			i: 'india'
		},
		a: 'alfa'
	}

	assertEquals(sortJson(json), {
		a: 'alfa',
		c: {
			i: 'india',
			f: 'foxtrot'
		},
		z: 'zebra'
	})
})

test('sorts array', () => {
	const json = {
		z: 'zebra',
		c: ['zebra', 'foxtrot'],
		a: 'alfa'
	}

	assertEquals(sortJson(json), {
		a: 'alfa',
		c: ['foxtrot', 'zebra'],
		z: 'zebra'
	})
})
