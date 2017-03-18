
declare var process;

const TABLE_NAME = process.env.TABLE_NAME;

export function setValue(value: any, key: string, userId: string) {
  // TODO
  console.log('Set value', value, key, userId)
}
