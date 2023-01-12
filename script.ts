const getUrlParams = (path: string, pattern: string): Record<string, string | number> => {
    const a = pattern.split('/')
    const b = path.split('/')

    let result = {}

    for (let i = 0; i < a.length; ++i) {
        if (!b[i]) continue;

        if (i < 1 && b[i] === a[i]) {
            result = { ...result, [a[i]]: b[1] }
        }

        if (b[2] === a[2]) {
            result = { ...result, [b[2]]: a[2] }
        }
    }

    return result;
}

type Data = { id: string, name?: string, count: number }

const objectDiff = (source: Data, target: Data): Record<string, object> => {
    let o = {}

    for (const k of Object.keys(target)) {
        const key = k as keyof Data;

        if (source?.[key] !== target[key]) {
            o = { ...o, [k as keyof Data]: { old: source[key], new: target[key] } }
        }
    }

    return o;
}

const pattern = 'staticOne/:paramOne/staticTwo/staticThree/:paramTwo';

const params = [
    'staticZero/one',
    'staticOne/one',
    'staticOne/one/staticThree/three',
    'staticOne/one/staticTwo/staticThree/two'
];

console.log('-------------- getUrlParams --------------')
for (const param of params) {
    console.log(getUrlParams(param, pattern));
}
console.log('-------------- ### --------------')

const before: Data = { id: '1', count: 0 }
const after: Data = { id: '1', name: 'khan', count: 1 }

console.log()
console.log()
console.log()

console.log('-------------- objectDiff --------------')
console.log(objectDiff(before, after))
console.log('-------------- ### --------------')