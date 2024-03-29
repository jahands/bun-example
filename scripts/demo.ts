#!bun

import { $ } from "bun"
import pQueue from 'p-queue'

const res = await fetch('https://uuid.rocks/plain')
console.log(res.status)
console.log(await res.text())

await $`ls -l .`

const queue = new pQueue({ concurrency: 2 })
queue.add(() => $`sleep 1 && echo 1`)
queue.add(() => $`sleep 1 && echo 2`)
await queue.onIdle()

for await (const line of $`date && sleep 1 && date && sleep 1`.lines()) {
	console.log(line)
}
console.log(await $`date && sleep 1 && date && sleep 1`.text())
