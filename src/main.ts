import { fs } from '../deps.ts'

function sortObject(obj: Record<string, any>): Record<string, any> {
	const subObjSortedKeys = Object.keys(obj).sort()

	const newObj: Record<string, any> = {}
	for (const key of subObjSortedKeys) {
		const value = obj[key]

		if (Array.isArray(value)) {
			newObj[key] = sortArray(value)
		} else if (typeof value === 'object' && value !== null) {
			newObj[key] = sortObject(value)
		}  else {
			newObj[key] = value
		}
	}

	return newObj
}

function sortArray(arr: any[]): any[] {
	const subArray: string[] = arr
	const subArraySorted = subArray.sort()

	return subArraySorted
}

export function sortJson(obj: Record<string, any> | any[]) {
	if (Array.isArray(obj)) return sortArray(obj)

	return sortObject(obj)
}

export async function sortJsonPath(jsonPath: string): Promise<void> {
	const json = await fs.readJson(jsonPath) as Record<string, any>
	const sortedJson = sortJson(json)
	await fs.writeJson(jsonPath, sortedJson, {
		spaces: 2
	})
}
