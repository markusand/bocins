export type KeyOfAttribute<T, U> = {
  [K in keyof T]: (T[K] extends U ? K : never)
}[keyof T];

export type MaybeReadonly<T> = T | Readonly<T>;
