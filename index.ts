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
