// Gets an Animation and returns it wrapped in a promise.
// Because Chrome didn't implement Animation.finished yet.
export const promiseAnimation = (animation: Animation): Promise<void> =>
  new Promise((res, rej) => {
    animation.onfinish = () => res()
    animation.oncancel = rej
  })

let lastUid = 0
export const uuid = (prefix: string = ''): string => `${prefix}${++lastUid}`

export type jsonObj = { [key: string]: any }
