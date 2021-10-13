import styleParser from 'style-to-object'
import camelcase from 'camelcase'

export default function toReactStyle(declaration?: string) : Record<string, string> {
  const result: { [index: string] : string } = {}

  if (declaration) {
    try {
      styleParser(declaration,
        function(key, value) {
          result[camelcase(key)] = value
        },
      )
    } catch(error) {
      console.warn(error)
    }
  }

  return result
}
